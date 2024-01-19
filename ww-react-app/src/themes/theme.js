import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#8abfea",
      contrastText: "#1f2954",
    },
    secondary: {
      main: "#d3e9d3",
      contrastText: "#1f2954",
    },
    text: {
      primary: "#1f2954",
    },
    background: {
      default: "#fcf7e8",
    },
    accent: {
      main: "#6371cf",
      contrastText: "#fcf7e8",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#8ec7f6",
      contrastText: "#171203",
    },
    secondary: {
      main: "#aea7e2",
      contrastText: "#171203",
    },
    text: {
      primary: "#a1aef7",
    },
    background: {
      default: "#313131",
    },
    accent: {
      main: "#16192c",
      contrastText: "#a1aef7",
    },
  },
});
