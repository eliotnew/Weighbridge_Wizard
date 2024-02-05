import React from "react";
import { AppBar, Toolbar, Typography, Button, useTheme } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHatWizard } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function LPappbar() {
  const theme = useTheme();
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.primary.main,
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Toolbar>
        <Link to="/" style={{ cursor: "pointer" }}>
          <FontAwesomeIcon
            icon={faHatWizard}
            size="2xl"
            flip="horizontal"
            style={{ color: theme.palette.text.primary }}
          />
        </Link>
        <Link to="/" style={{ cursor: "pointer" }}>
          <Typography
            className="WizardFont"
            variant="h4"
            noWrap
            component="div"
            sx={{
              fontFamily: "sans-serif",
              paddingLeft: "10px",
              display: { xs: "none", sm: "block" },
            }}
            style={{
              fontFamily: "Bona Nova",
              color: theme.palette.primary.contrastText,
              fontWeight: 1000,
            }}
          >
            WeighBridge Wizard
          </Typography>
        </Link>

        <Typography
          variant="h4"
          component="div"
          sx={{ flexGrow: 1, paddingLeft: "12px" }}
        ></Typography>
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
          color="inherit"
        >
          About
        </Button>
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
        <Link to="/signin">
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
            color="inherit"
          >
            Sign In{" "}
            <FontAwesomeIcon
              icon={faRightToBracket}
              style={{ marginLeft: "6px" }}
            />
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
export default LPappbar;
