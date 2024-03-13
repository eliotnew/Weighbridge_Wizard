// test-utils.js
import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ThemeProvider, ThemeContext } from "../src/themes/ThemeContext";
import { LoggedInContextProvider } from "../src/loggedInContext";

function render(ui, { route = "/", ...renderOptions } = {}) {
  window.history.pushState({}, "Test page", route);

  const Wrapper = ({ children }) => (
    <BrowserRouter>
      <LoggedInContextProvider>
        <ThemeProvider>
          {(theme) => (
            <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
          )}
        </ThemeProvider>
      </LoggedInContextProvider>
    </BrowserRouter>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";
export { render }; //over-rides render method
