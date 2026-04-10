import Card from "@mui/material/Card";
import { CardMedia, IconButton } from "@mui/material";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { styled } from "@mui/material";
import { type ApiArticle } from "../../types";

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  boxShadow: theme.shadows[1],
  position: "relative",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "box-shadow 0.3s ease-in-out",
  "&:hover": {
    boxShadow: theme.shadows[4],
    "& .MuiCardMedia-root": {
      transform: "scale(1.05)",
    },
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

  const formattedDate = new Date(publishedAt).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
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
          sx={{
            transition: "transform 0.4s ease-in-out",
          }}
        />
        <CardContent sx={{ flexGrow: 1, width: "100%" }}>
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            sx={{
              fontWeight: "bold",
              lineHeight: 1.4,
              fontFamily: "'Cairo', sans-serif",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontFamily: "'Cairo', sans-serif",
              lineHeight: 1.6,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description || content}
          </Typography>
        </CardContent>
      </CardActionArea>

      <IconButton
        onClick={handleBookmark}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          bgcolor: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(4px)",
          "&:hover": { bgcolor: "#fff" },
        }}
      >
        <BookmarkBorderIcon sx={{ color: "text.primary" }} />
      </IconButton>

      <Box
        p={2}
        sx={{
          mt: "auto",
          borderTop: "1px solid #f0f0f0",
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
              color="text.primary"
              sx={{ fontFamily: "'Cairo', sans-serif", fontWeight: "bold" }}
            >
              {author.substring(0, 25)}
            </Typography>
          )}
          <Typography
            variant="caption"
            display="block"
            color="text.secondary"
            sx={{ fontFamily: "'Cairo', sans-serif" }}
          >
            {formattedDate}
          </Typography>
        </Box>
        <Typography
          variant="caption"
          sx={{
            bgcolor: "#f5f5f5",
            color: "text.secondary",
            fontWeight: "bold",
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            fontFamily: "'Cairo', sans-serif",
          }}
        >
          {source.name}
        </Typography>
      </Box>
    </StyledCard>
  );
}
