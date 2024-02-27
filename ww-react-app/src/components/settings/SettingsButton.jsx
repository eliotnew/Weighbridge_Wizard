import React, { useState, useContext } from "react";
import {
  Button,
  Menu,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
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
  const theme = useTheme();
  const { currentThemeMode, setTheme } = useContext(ThemeContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsHover(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsHover(false);
  };

  const handleRadioSelect = (event) => {
    setTheme(Number(event.target.value));
  };

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
        onMouseLeave={() => {
          // Only set isHover to false if the menu isn't open
          if (!anchorEl) {
            setIsHover(false);
          }
        }}
      >
        Settings
        {isHover ? (
          <FontAwesomeIcon
            icon={faGear}
            beatFade
            style={{ marginLeft: "6px", animationDuration: "2s" }}
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
        <FormControl component="fieldset" sx={{ padding: "20px" }}>
          <RadioGroup
            aria-label="theme"
            name="theme"
            value={currentThemeMode.toString()}
            onChange={handleRadioSelect}
          >
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="Light Theme"
            />
            <FormControlLabel
              value="2"
              control={<Radio />}
              label="Dark Theme"
              color=""
            />
            <FormControlLabel
              value="3"
              control={<Radio />}
              label="Mono-Chromatic"
            />
            <FormControlLabel
              value="4"
              control={<Radio />}
              label="Hi-Contrast Dark Theme"
            />
          </RadioGroup>
        </FormControl>
      </Menu>
    </>
  );
}
export default SettingsButton;
