import Card from "@mui/material/Card";
import { CardMedia, IconButton } from "@mui/material";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { styled } from "@mui/material";
import { type ApiArticle } from "../types";

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  boxShadow: theme.shadows[1],
  position: "relative",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  "&:hover": {
    boxShadow: theme.shadows[3],
  },
}));

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=400";

export default function NewsArticle({
  title,
  description,
  url,
  urlToImage,
  author,
  publishedAt,
  source,
  content,
}: ApiArticle) {
  const handleArticleClick = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleBookmark = (event: React.MouseEvent) => {
    event.stopPropagation();
    console.log(`Bookmarking URL: ${url}`);
  };

  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <StyledCard>
      <CardActionArea
        onClick={handleArticleClick}
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={urlToImage || FALLBACK_IMAGE}
          alt={title}
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMAGE;
          }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            sx={{ fontWeight: "bold", lineHeight: 1.3 }}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description || content?.substring(0, 100) + "..."}
          </Typography>
        </CardContent>
      </CardActionArea>

      <IconButton
        onClick={handleBookmark}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          bgcolor: "rgba(255,255,255,0.8)",
          "&:hover": { bgcolor: "#fff" },
        }}
      >
        <BookmarkBorderIcon />
      </IconButton>

      <Box
        p={2}
        sx={{
          mt: "auto",
          borderTop: "1px solid #eee",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          {author && (
            <Typography
              variant="caption"
              display="block"
              color="text.secondary"
              sx={{ fontWeight: "bold" }}
            >
              {author.substring(0, 20)}
            </Typography>
          )}
          <Typography variant="caption" display="block" color="text.secondary">
            {formattedDate}
          </Typography>
        </Box>
        <Typography
          variant="caption"
          sx={{
            bgcolor: "primary.main",
            color: "white",
            px: 1,
            py: 0.5,
            borderRadius: 1,
          }}
        >
          {source.name}
        </Typography>
      </Box>
    </StyledCard>
  );
}
