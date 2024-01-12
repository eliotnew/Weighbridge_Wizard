import React, { useContext } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ThemeProvider, ThemeContext } from "./themes/ThemeContext";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing-page/LandingPage";
import "./App.css";

function App() {
  const { currentTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <button onClick={toggleTheme} style={{ backgroundColor: "grey" }}>
        Toggle Theme
      </button>

      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default () => (
  <ThemeProvider>
    {(theme) => (
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    )}
  </ThemeProvider>
);
