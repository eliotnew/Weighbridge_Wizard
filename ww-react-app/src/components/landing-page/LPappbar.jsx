import React from "react";
import { AppBar, Toolbar, Typography, Button, useTheme } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHatWizard } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

function LPappbar() {
  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
        backgroundColor: "blue",
      }}
    >
      hello
    </AppBar>
  );
}
export default LPappbar;
