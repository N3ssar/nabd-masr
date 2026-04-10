import { Card, CardContent, Box, Skeleton, styled } from "@mui/material";

const StyledSkeletonCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  boxShadow: theme.shadows[1],
  position: "relative",
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

export default function ArticleSkeleton() {
  return (
    <StyledSkeletonCard>
      <Skeleton variant="rectangular" height={200} animation="wave" />

      <CardContent sx={{ flexGrow: 1, width: "100%" }}>
        <Skeleton variant="text" height={32} width="90%" animation="wave" />
        <Skeleton
          variant="text"
          height={32}
          width="60%"
          animation="wave"
          sx={{ mb: 2 }}
        />

        <Skeleton variant="text" height={20} width="100%" animation="wave" />
        <Skeleton variant="text" height={20} width="95%" animation="wave" />
        <Skeleton variant="text" height={20} width="80%" animation="wave" />
      </CardContent>

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
        <Box sx={{ width: "50%" }}>
          <Skeleton variant="text" height={20} width="80%" animation="wave" />
          <Skeleton variant="text" height={15} width="50%" animation="wave" />
        </Box>
        <Skeleton
          variant="rectangular"
          height={24}
          width={60}
          sx={{ borderRadius: 1 }}
          animation="wave"
        />
      </Box>
    </StyledSkeletonCard>
  );
}
