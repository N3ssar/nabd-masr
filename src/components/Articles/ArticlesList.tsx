import { Grid, Box, Typography } from "@mui/material";
import Article from "./Article";
import ArticleSkeleton from "./ArticleSkeleton";

import { type ArticlesListProps } from "../../types";

import WifiOffIcon from "@mui/icons-material/WifiOff";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import SearchOffIcon from "@mui/icons-material/SearchOff";

export default function NewsList({
  articles,
  isLoading,
  error,
  query,
}: ArticlesListProps) {
  if (isLoading) {
    const skeletons = Array.from(new Array(9));

    return (
      <Grid container spacing={4} alignItems="stretch">
        {skeletons.map((_, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
            <ArticleSkeleton />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (error) {
    let ErrorIcon = ErrorOutlineIcon;
    if (error.type === "NETWORK") ErrorIcon = WifiOffIcon;
    if (error.type === "RATE_LIMIT") ErrorIcon = HourglassEmptyIcon;

    return (
      <Box
        sx={{ textAlign: "center", mt: 15, mb: 25, color: "text.secondary" }}
      >
        <ErrorIcon
          sx={{ fontSize: 80, color: "error.main", mb: 2, opacity: 0.8 }}
        />
        <Typography
          variant="h5"
          sx={{ fontFamily: "'Cairo', sans-serif", fontWeight: "bold", mb: 1 }}
        >
          عذراً، واجهتنا مشكلة
        </Typography>
        <Typography variant="body1" sx={{ fontFamily: "'Cairo', sans-serif" }}>
          {error.message}
        </Typography>
      </Box>
    );
  }

  if (articles.length === 0) {
    const isQueryEmpty = query.trim() === "";
    return (
      <Box sx={{ textAlign: "center", mt: 15 }}>
        <SearchOffIcon
          sx={{ fontSize: 80, color: "text.secondary", mb: 2, opacity: 0.5 }}
        />
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ fontFamily: "'Cairo', sans-serif", fontWeight: "bold" }}
        >
          {isQueryEmpty
            ? "لا توجد أخبار متاحة في الوقت الحالي."
            : `لم نجد أي أخبار مطابقة لبحثك عن "${query}"`}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ fontFamily: "'Cairo', sans-serif", mt: 2 }}
        >
          جرب استخدام كلمات بحث مختلفة أو أعم.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={4} alignItems="stretch">
      {articles.map((article) => (
        <Grid key={article.url} size={{ xs: 12, sm: 6, md: 4 }}>
          <Article {...article} />
        </Grid>
      ))}
    </Grid>
  );
}
