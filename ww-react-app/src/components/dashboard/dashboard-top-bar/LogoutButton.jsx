import React, { useState } from "react";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@mui/material";

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
        color: theme.palette.primary.contrastText,
        fontWeight: 1000,
        "&:hover": {
          backgroundColor: theme.palette.primary.contrastText,
          color: theme.palette.primary.main,
          transform: "scale(1.1)",
          transition: "transform 0.35s",
        },
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
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
