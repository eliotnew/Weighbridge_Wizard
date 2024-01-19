import React, { useContext } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ThemeProvider, ThemeContext } from "./themes/ThemeContext";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing-page/LandingPage";
import Dashboard from "./components/dashboard/Dashbboard";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard/>} />
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
