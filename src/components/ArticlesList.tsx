import { Grid } from "@mui/material";
import Article from "./Article";
import { type ArticlesListProps } from "../types";

export default function NewsList({ articles }: ArticlesListProps) {
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
