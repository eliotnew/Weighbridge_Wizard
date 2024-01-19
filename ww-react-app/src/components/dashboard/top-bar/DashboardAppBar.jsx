import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, useTheme } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHatWizard } from "@fortawesome/free-solid-svg-icons";
import SettingsButton from "./SettingsButton";
import { LogoutButton } from "./LogoutButton";

function DashboardAppBar() {
  const theme = useTheme();
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.primary.main,
        height: "7.98vh",
        "&": {
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Toolbar>
        <FontAwesomeIcon
          icon={faHatWizard}
          size="2xl"
          flip="horizontal"
          style={{ color: theme.palette.primary.contrastText }}
        />
        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{
            paddingLeft: "10px",
            display: { xs: "none", sm: "block" },
            color: theme.palette.primary.contrastText,
            fontWeight: 800,
          }}
        >
          Dashboard
        </Typography>
        <Typography
          variant="h4"
          component="div"
          sx={{ flexGrow: 1, paddingLeft: "12px" }}
        />

        <SettingsButton />

        <Typography
          variant="h6"
          component="span"
          style={{
            margin: "0 8px",
            marginBottom: "5px",
            color: theme.palette.primary.contrastText,
            fontWeight: 1000,
          }}
        >
          |
        </Typography>

        <LogoutButton />
      </Toolbar>
    </AppBar>
  );
}
export default DashboardAppBar;
