import React, { useContext } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ThemeProvider, ThemeContext } from "./themes/ThemeContext";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing-page/LandingPage";
import Dashboard from "./components/dashboard/Dashbboard";
import "./App.css";
import SignInPage from "./components/sign-in-up/SignInPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/signin" element={<SignInPage/>} />
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
