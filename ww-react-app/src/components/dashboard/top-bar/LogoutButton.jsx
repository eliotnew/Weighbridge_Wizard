import React, { useState } from "react";
import { Button, useTheme } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

/**
 *  A button for the top app bar that will log the user out, returning to the main page.
 *  Additionally, it should have an interactive UI when hovering over.
 */
function LogoutButton() {
  const [isHover, setIsHover] = useState(false);
  const theme = useTheme();

  return (
    <Button
      sx={{
        color: theme.palette.secondary.contrastText,
        "&:hover": {
          backgroundColor: theme.palette.accent.scary,
          color: theme.palette.accent.scaryContrastText,
          transform: "scale(1.1)",
          transition: "transform 0.35s",
        },
      }}
      fullWidth
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      Log Out
      {isHover ? (
        <FontAwesomeIcon
          icon={faRightFromBracket}
          beatFade
          style={{ marginLeft: "6px" }}
        />
      ) : (
        <FontAwesomeIcon
          icon={faRightFromBracket}
          style={{ marginLeft: "6px" }}
        />
      )}
    </Button>
  );
}
export default LogoutButton;
