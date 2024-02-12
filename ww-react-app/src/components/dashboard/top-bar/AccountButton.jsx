import React, { useState } from "react";
import {
  Button,
  MenuItem,
  Menu,
  Switch,
  FormControl,
  FormControlLabel,
  useTheme,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import LogOutButton from "./LogoutButton";

/**
 *  A button for the top app bar that will log the user out, returning to the main page.
 *  Additionally, it should have an interactive UI when hovering over.
 */
function AccountButton() {
  const [isHover, setIsHover] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
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
        onClick={handleClick}
      >
        Account
        {isHover ? (
          <FontAwesomeIcon
            icon={faCircleUser}
            flip
            style={{ marginLeft: "6px" }}
          />
        ) : (
          <FontAwesomeIcon icon={faCircleUser} style={{ marginLeft: "6px" }} />
        )}
      </Button>
      <Menu
        id="settings-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>Change Password</MenuItem>
        <MenuItem>Change Details</MenuItem>
        <MenuItem>
          <LogOutButton></LogOutButton>
        </MenuItem>
      </Menu>
    </>
  );
}
export default AccountButton;
