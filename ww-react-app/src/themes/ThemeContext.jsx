import React, { createContext, useState, useMemo } from "react";
import {
  lightTheme,
  darkTheme,
  highContrastLightTheme,
  highContrastDarkTheme,
} from "./theme";

export const ThemeContext = createContext({
  toggleTheme: () => {},
  toggleContrast: () => {},
  currentThemeMode: 1, // 1: light, 2: dark, 3: high contrast light, 4: high contrast dark
});

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(1); // Start with Default 1

  const toggleTheme = () => {
    setThemeMode((prevMode) =>
      prevMode % 2 === 0 ? prevMode - 1 : prevMode + 1
    ); // Toggle between light (1) and dark (2) modes
  };

  const toggleContrast = () => {
    setThemeMode((prevMode) => (prevMode > 2 ? prevMode - 2 : prevMode + 2)); // Toggle between normal and high-contrast modes
  };

  const muiTheme = useMemo(() => {
    switch (themeMode) {
      case 1:
        return lightTheme;
      case 2:
        return darkTheme;
      case 3:
        return highContrastLightTheme;
      case 4:
        return highContrastDarkTheme;
      default:
        return lightTheme; // Default to light theme if no match
    }
  }, [themeMode]);

  return (
    <ThemeContext.Provider
      value={{ toggleTheme, toggleContrast, currentThemeMode: themeMode }}
    >
      {children(muiTheme)}
    </ThemeContext.Provider>
  );
};
