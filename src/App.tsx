import {
  CssBaseline,
  Pagination,
  Box,
  Tooltip,
  PaginationItem,
} from "@mui/material";
import Layout from "./components/common/Layout";
import ArticlesList from "./components/Articles/ArticlesList";
import { type ApiArticle } from "./types";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import { getAllArticles } from "./services/api";

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const MAX_ARTICLES_PER_PAGE = 9;

function App() {
  const [articles, setArticles] = useState<ApiArticle[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState<{ type: string; message: string } | null>(
    null,
  );

  const handleSearchInput = (newText: string) => {
    setIsLoading(true);
    setQuery(newText);
    setPage(1);
  };
  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setIsLoading(true);
    setPage(newPage);
    if (navigator.onLine) {
      setError(null);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = Math.ceil(totalResults / MAX_ARTICLES_PER_PAGE);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const cleanQuery = query.trim();

      const searchQuery = cleanQuery ? `مصر ${cleanQuery}` : "مصر";
      const encodedQuery = encodeURIComponent(searchQuery);

      getAllArticles(
        `https://newsapi.org/v2/everything?q=${encodedQuery}&language=ar&sortBy=publishedAt&page=${page}&pageSize=${MAX_ARTICLES_PER_PAGE}&apiKey=${NEWS_API_KEY}`,
      )
        .then((data) => {
          if (data && data.articles && data.articles.length > 0) {
            setArticles(data.articles);
            setTotalResults(Math.min(data.totalResults, 100));
          } else {
            setArticles([]);
            setTotalResults(0);
          }
        })
        .catch((error) => {
          if (!navigator.onLine) {
            setError({
              type: "NETWORK",
              message: "يبدو أنك غير متصل بالإنترنت.",
            });
          } else if (error.response?.status === 429) {
            setError({
              type: "RATE_LIMIT",
              message:
                "لقد تجاوزت عدد الطلبات المسموح بها، يرجى الانتظار دقيقة.",
            });
          } else {
            setError({
              type: "SERVER",
              message: "حدث خطأ في الاتصال بالسيرفر، حاول مرة أخرى.",
            });
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query, page]);

  return (
    <>
      <CssBaseline />
      <Header onSearchChange={handleSearchInput} />
      <Layout>
        <ArticlesList
          articles={articles}
          isLoading={isLoading}
          query={query}
          error={error}
        />

        {!isLoading && totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 6, mb: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
              size="large"
              renderItem={(item) => {
                if (item.type === "previous") {
                  return (
                    <Tooltip title="السابق" placement="top" arrow>
                      <PaginationItem
                        {...item}
                        aria-label="الرجوع للصفحة السابقة"
                        sx={{ "& svg": { transform: "scaleX(-1)" } }}
                      />
                    </Tooltip>
                  );
                }

                if (item.type === "next") {
                  return (
                    <Tooltip title="التالي" placement="top" arrow>
                      <PaginationItem
                        {...item}
                        aria-label="الانتقال للصفحة التالية"
                        sx={{ "& svg": { transform: "scaleX(-1)" } }}
                      />
                    </Tooltip>
                  );
                }

                return (
                  <PaginationItem
                    {...item}
                    aria-label={`الذهاب إلى صفحة رقم ${item.page}`}
                  />
                );
              }}
              sx={{
                "& .MuiPaginationItem-root": {
                  fontFamily: "'Cairo', sans-serif",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: "rgba(25, 118, 210, 0.08)",
                    transform: "translateY(-3px)",
                  },
                },
                "& .Mui-selected": {
                  boxShadow: "0px 4px 12px rgba(25, 118, 210, 0.4)",
                  transform: "scale(1.05)",
                  "&:hover": {
                    backgroundColor: "primary.main",
                    transform: "scale(1.05)",
                  },
                },
                "& .MuiPaginationItem-previousNext": {
                  transform: "none",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                },
              }}
            />
          </Box>
        )}
      </Layout>
    </>
  );
}

export default App;
