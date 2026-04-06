import { CssBaseline } from "@mui/material";
import Layout from "./components/common/Layout";
import ArticlesList from "./components/ArticlesList";
import { type ApiArticle } from "./types";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import { getAllArticles } from "./services/api";
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
function App() {
  const [articles, setArticles] = useState<ApiArticle[]>([]);
  useEffect(() => {
    getAllArticles(
      `https://newsapi.org/v2/everything?q=egypt&apiKey=${NEWS_API_KEY}`,
    )
      .then((data) => {
        if (data && data.articles) {
          setArticles(data.articles);
        }
      })
      .catch((error) => console.error("Fetch Error:", error));
  }, []);
  return (
    <>
      <CssBaseline />
      <Header />
      <Layout>
        <ArticlesList articles={articles} />
      </Layout>
    </>
  );
}

export default App;
