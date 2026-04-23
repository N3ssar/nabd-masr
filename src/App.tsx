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
  const [category, setCategory] = useState("general");

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

  const handleCategoryChange = (newCategory: string) => {
    setIsLoading(true);
    setCategory(newCategory);
    setPage(1);
  };

  const totalPages = Math.ceil(totalResults / MAX_ARTICLES_PER_PAGE);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const cleanQuery = query.trim();

      const categoryKeywords: Record<string, string> = {
        general: "مصر",
        business: "اقتصاد مصر OR بورصة مصر OR أعمال مصر",
        sports: "رياضة مصر OR كرة القدم المصرية",
        technology: "تكنولوجيا مصر OR تقنية مصر",
        health: "صحة مصر OR طب مصر",
      };

      let searchQuery = categoryKeywords[category] || "مصر";
      if (cleanQuery) {
        searchQuery += ` ${cleanQuery}`;
      }

      const encodedQuery = encodeURIComponent(searchQuery);

      const targetUrl = `https://newsapi.org/v2/everything?q=${encodedQuery}&language=ar&sortBy=publishedAt&page=${page}&pageSize=${MAX_ARTICLES_PER_PAGE}&apiKey=${NEWS_API_KEY}`;

      const proxiedUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;

      getAllArticles(proxiedUrl)
        .then((data) => {
          if (data && data.articles && data.articles.length > 0) {
            setArticles(data.articles);
            setTotalResults(Math.min(data.totalResults, 99));
          } else {
            setArticles([]);
            setTotalResults(0);
          }
          setError(null);
        })
        .catch((error) => {
          if (!navigator.onLine) {
            setError({
              type: "NETWORK",
              message: "يبدو أنك غير متصل بالإنترنت.",
            });
          } else if (error.status === 429 || error.response?.status === 429) {
            setError({
              type: "RATE_LIMIT",
              message:
                "لقد تجاوزت عدد الطلبات المسموح بها، يرجى الانتظار دقيقة.",
            });
          } else if (error.status === 426 || error.response?.status === 426) {
            setError({
              type: "UPGRADE_REQUIRED",
              message:
                "عذراً، وصلنا للحد الأقصى من الأخبار المتاحة في النسخة المجانية.",
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
  }, [query, page, category]);

  return (
    <>
      <CssBaseline />
      <Header
        onSearchChange={handleSearchInput}
        category={category}
        onCategoryChange={handleCategoryChange}
      />
      <Layout>
        <ArticlesList
          articles={articles}
          isLoading={isLoading}
          query={query}
          error={error}
        />

        {!isLoading && totalPages > 1 && !error && (
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
                      <span>
                        <PaginationItem
                          {...item}
                          aria-label="الرجوع للصفحة السابقة"
                          sx={{ "& svg": { transform: "scaleX(-1)" } }}
                        />
                      </span>
                    </Tooltip>
                  );
                }

                if (item.type === "next") {
                  return (
                    <Tooltip title="التالي" placement="top" arrow>
                      <span>
                        <PaginationItem
                          {...item}
                          aria-label="الانتقال للصفحة التالية"
                          sx={{ "& svg": { transform: "scaleX(-1)" } }}
                        />
                      </span>
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
