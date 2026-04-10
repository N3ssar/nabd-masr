import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  InputBase,
  Box,
  Select,
  MenuItem,
  FormControl,
  type SelectChangeEvent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import type { HeaderProps } from "../../types";

const CATEGORIES = [
  { value: "general", label: "أهم الأخبار" },
  { value: "business", label: "اقتصاد" },
  { value: "sports", label: "رياضة" },
  { value: "technology", label: "تكنولوجيا" },
  { value: "health", label: "صحة" },
];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "auto",
  marginLeft: theme.spacing(1),
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: 0,
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 2),
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "10ch",
    "&:focus": {
      width: "14ch",
    },
    [theme.breakpoints.up("sm")]: {
      width: "15ch",
      "&:focus": {
        width: "25ch",
      },
    },
  },
}));

function Header({ onSearchChange }: HeaderProps) {
  const [category, setCategory] = useState("general");
  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "primary.main", marginBottom: 3 }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: "bold",
              fontFamily: "'Cairo', sans-serif",
              letterSpacing: 0,
            }}
          >
            نَبْضُ مِصْر
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              value={category}
              onChange={handleCategoryChange}
              displayEmpty
              inputProps={{ "aria-label": "Select News Category" }}
              sx={{
                color: "white",
                fontFamily: "'Cairo', sans-serif",
                boxShadow: "none",
                ".MuiOutlinedInput-notchedOutline": { border: 0 },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: 0 },
                "&:hover .MuiOutlinedInput-notchedOutline": { border: 0 },
                ".MuiSvgIcon-root": { color: "white" },
                backgroundColor: alpha("#fff", 0.15),
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: alpha("#fff", 0.25),
                },

                ".MuiSelect-select": {
                  "&:focus-visible": {
                    outline: "2px solid white",
                    borderRadius: "4px",
                    backgroundColor: alpha("#fff", 0.1),
                  },
                },
              }}
            >
              {CATEGORIES.map((cat) => (
                <MenuItem
                  key={cat.value}
                  value={cat.value}
                  sx={{ fontFamily: "'Cairo', sans-serif" }}
                >
                  {cat.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="ابحث…"
              inputProps={{ "aria-label": "search" }}
              sx={{ fontFamily: "'Cairo', sans-serif" }}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </Search>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
