import React, { useContext } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ThemeProvider, ThemeContext } from "./themes/ThemeContext";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing-page/LandingPage";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </>
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
