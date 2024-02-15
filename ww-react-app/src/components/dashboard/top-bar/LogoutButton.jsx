import React, { useState } from "react";
import { Button, useTheme } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

/**
 *  A button for the top app bar that will log the user out, returning to the main page.
 *  Additionally, it should have an interactive UI when hovering over.
 */
function LogoutButton() {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  const theme = useTheme();
  const handleLogOut = () => {
    console.log("hello from handle logout!");
    const isConfirmed = window.confirm("Are you sure you want to Log Out ?");

    if (isConfirmed) {
      try {
        //delete ls things
        localStorage.removeItem("location");
        localStorage.removeItem("email");
        localStorage.removeItem("test");
        localStorage.removeItem("lastName");
        localStorage.removeItem("firstName");
        localStorage.removeItem("id");
        navigate("/");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    } else {
      return;
    }
  };

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
      onClick={handleLogOut}
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
