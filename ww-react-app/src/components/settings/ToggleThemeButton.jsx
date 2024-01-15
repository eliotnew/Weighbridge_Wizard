import React, { useContext } from "react";
import { ThemeContext } from "../../themes/ThemeContext";

function ToggleThemeButton() {
  const { currentTheme, toggleTheme } = useContext(ThemeContext);
  return (
    <button onClick={toggleTheme} style={{ backgroundColor: "grey" }}>
      Toggle Theme
    </button>
  );
}

export default ToggleThemeButton;
