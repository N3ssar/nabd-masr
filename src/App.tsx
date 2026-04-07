import { CssBaseline, Box, Typography, CircularProgress } from "@mui/material";
import Layout from "./components/common/Layout";
import ArticlesList from "./components/ArticlesList";
import { type ApiArticle } from "./types";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import { getAllArticles } from "./services/api";

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

function App() {
  const [articles, setArticles] = useState<ApiArticle[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleSearchInput = (newText: string) => {
    setIsLoading(true);
    setQuery(newText);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const cleanQuery = query.trim();

      const searchQuery = cleanQuery ? `مصر ${cleanQuery}` : "مصر";
      const encodedQuery = encodeURIComponent(searchQuery);

      getAllArticles(
        `https://newsapi.org/v2/everything?q=${encodedQuery}&language=ar&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`,
      )
        .then((data) => {
          if (data && data.articles) {
            setArticles(data.articles);
          } else {
            setArticles([]);
          }
        })
        .catch((error) => {
          console.error("Fetch Error:", error);
          setArticles([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const isQueryEmpty = query.trim() === "";
  console.log("App rendered");
  return (
    <>
      <CssBaseline />
      <Header onSearchChange={handleSearchInput} />
      <Layout>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 40 }}>
            <CircularProgress size={60} thickness={4} />
          </Box>
        ) : articles.length > 0 ? (
          <ArticlesList articles={articles} />
        ) : (
          <Box sx={{ textAlign: "center", mt: 10 }}>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ fontFamily: "'Cairo', sans-serif", fontWeight: "bold" }}
            >
              {isQueryEmpty
                ? "عذراً، لا توجد أخبار متاحة في الوقت الحالي."
                : `عذراً، لم نجد أي أخبار مطابقة لبحثك عن "${query}"`}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontFamily: "'Cairo', sans-serif", mt: 2 }}
            >
              {isQueryEmpty
                ? "يرجى المحاولة مرة أخرى لاحقاً."
                : "جرب استخدام كلمات بحث مختلفة أو أعم."}
            </Typography>
          </Box>
        )}
      </Layout>
    </>
  );
}

export default App;
