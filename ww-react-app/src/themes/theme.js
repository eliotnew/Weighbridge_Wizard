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
      scary: "#660000",
      scaryContrastText: "#ffffff",
    },
    paper: {
      main: "#FFFFFF",
    },
    inputBorder: {
      selected: "#8ABFEA",
    },
  },
});
export const highContrastLightTheme = createTheme({
  ...lightTheme,
  palette: {
    mode: "light",
    primary: {
      main: "#FFFFFF",
      contrastText: "#000000",
    },
    secondary: {
      main: "#FFFFFF",
      contrastText: "#000000",
    },
    text: {
      primary: "#000000",
    },
    background: {
      default: "#FFFFFF",
    },
    accent: {
      main: "#fff700",
      contrastText: "#22ff00",
      scary: "#000000",
      scaryContrastText: "#ffffff",
    },
    paper: {
      main: "#FFFFFF",
    },
    inputBorder: {
      selected: "#000000",
    },
    success: {
      main: "#00cc22",
    },
    error: {
      main: "#ff0000",
    },
    warning: {
      main: "#fff700",
    },
    info: {
      main: "#00ccff",
    },
  },
  typography: {
    allVariants: {
      color: "#000000",
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
      scary: "#610c0c",
      scaryContrastText: "#ffffff",
    },
    paper: {
      main: "#020202",
      contrastText: "#FFFFFF",
    },
    inputBorder: {
      selected: "#95DCE9",
    },
    success: {
      main: "#00cc22",
    },
    error: {
      main: "#ff0000",
    },
    warning: {
      main: "#fff700",
    },
    info: {
      main: "#00ccff",
    },
  },
});

export const highContrastDarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      contrastText: "#00ff11",
      main: "#000000",
    },
    secondary: {
      main: "#000000",
      contrastText: "#ffff00",
    },
    text: {
      primary: "#00ff11",
    },
    background: {
      default: "#595959",
    },
    accent: {
      main: "#ff03ff",
      contrastText: "#000000",
      scary: "#000000",
      scaryContrastText: "#ff0000",
    },
    paper: {
      main: "#000000",
      contrastText: "#FFFFFF",
    },
    inputBorder: {
      selected: "#00ff11",
    },
  },
  typography: {
    allVariants: {
      color: "#ffff00",
    },
  },
});
