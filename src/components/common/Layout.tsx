import { Container, Box } from "@mui/material";
import type { LayoutProps } from "../../types";

export default function Layout({ children }: LayoutProps) {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4, minHeight: "100vh" }}>{children}</Box>
    </Container>
  );
}
