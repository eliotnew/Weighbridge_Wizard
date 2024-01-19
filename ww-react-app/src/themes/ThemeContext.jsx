import React, { createContext, useState, useMemo } from "react";
import { lightTheme, darkTheme } from "./theme";

//uses reacts context API to manage theme state across the entire application.

export const ThemeContext = createContext({
  toggleTheme: () => {},
  currentTheme: "light",
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const muiTheme = useMemo(() => {
    return theme === "light" ? lightTheme : darkTheme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, currentTheme: theme }}>
      {children(muiTheme)}
    </ThemeContext.Provider>
  );
};
