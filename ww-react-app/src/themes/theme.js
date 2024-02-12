import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#8ABFEA",
      //main: "#95DCE9",
      contrastText: "#202A56",
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
      main: "#684587",
      contrastText: "#FCF7E8",
    },
    paper: {
      main: "#FFFFFF",
    },
    inputBorder: {
      selected: "#8ABFEA",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      contrastText: "#95DCE9",
      main: "#202A56",
    },
    secondary: {
      main: "#162C16",
      contrastText: "#A9B3DF",
    },
    text: {
      primary: "#a1aef7",
    },
    background: {
      default: "#595959",
    },
    accent: {
      main: "#9B78BA",
      contrastText: "#020202",
    },
    paper: {
      main: "#020202",
      contrastText: "#FFFFFF",
    },
    inputBorder: {
      selected: "#95DCE9",
    },
  },
});
