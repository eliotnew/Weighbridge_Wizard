import React, { useState, useContext } from "react";
import {
  Button,
  MenuItem,
  Menu,
  Switch,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@mui/material";
import { ThemeContext } from "../../themes/ThemeContext";

/**
 *  Button that opens menus that use the theme global context to change UI
 *  Additionally, it should have an interactive UI when hovering over.
 */
function SettingsButton() {
  const [isHover, setIsHover] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [switchDark, setSwitchDark] = useState(false);
  const [switchContrast, setSwitchContrast] = useState(false);
  const theme = useTheme();
  const { currentTheme, toggleTheme } = useContext(ThemeContext);
  //const { toggleContrast } = useContext(ThemeContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDarkModeSwitch = (event) => {
    setSwitchDark(event.target.checked);
    toggleTheme();
  };
  const handleContrastSwitch = (event) => {
    setSwitchContrast(event.target.checked);
    // toggleContrast();
  };

  const switchLabel = (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {switchDark ? (
        <FontAwesomeIcon icon={faMoon} />
      ) : (
        <FontAwesomeIcon icon={faSun} />
      )}
      {switchDark ? "Dark Mode" : "Light Mode"}
    </div>
  );

  return (
    <>
      <Button
        onClick={handleClick}
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
        Settings
        {isHover ? (
          <FontAwesomeIcon
            icon={faGear}
            beatFade
            style={{ marginLeft: "6px" }}
            size="lg"
            spin
          />
        ) : (
          <FontAwesomeIcon
            icon={faGear}
            style={{ marginLeft: "6px" }}
            size="lg"
          />
        )}
      </Button>

      <Menu
        id="settings-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <FormControlLabel
            sx={{ color: theme.palette.primary.contrastText }}
            control={
              <Switch
                checked={switchDark}
                onChange={handleDarkModeSwitch}
                color="default"
              />
            }
            label={switchLabel}
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            sx={{ color: theme.palette.primary.contrastText }}
            control={
              <Switch
                checked={switchContrast}
                onChange={handleContrastSwitch}
                color="default"
              />
            }
            label={switchContrast ? "High-Contrast ON" : "High-Contrast OFF"}
          />
        </MenuItem>
      </Menu>
    </>
  );
}
export default SettingsButton;
