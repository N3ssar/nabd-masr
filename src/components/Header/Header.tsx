import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Navbar() {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "primary.main" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: "bold", letterSpacing: 1 }}
        >
          Nabd Masr
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, mr: 2 }}>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Business</Button>
          <Button color="inherit">Sports</Button>
          <Button color="inherit">Technology</Button>
        </Box>

        <IconButton color="inherit" aria-label="search">
          <SearchIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
