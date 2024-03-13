import React from "react";
import { useTheme } from "@mui/material";
import { ListItemButton, ListItemText } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import Map from "../../tab-content/Map";

function MapButton({ addTab }) {
  const theme = useTheme();

  const handleClick = () => {
    const id = Math.floor(Math.random() * 100000);
    const newTab = {
      id: id,
      label: "Map",
      content: <Map />,
    };
    addTab(newTab);
  };

  return (
    <ListItemButton
      sx={{
        "&:hover": {
          color: theme.palette.secondary.contrastText,
          transform: "scale(1.1)",
          transition: "transform 0.35s",
        },
      }}
      onClick={handleClick}
    >
      <FontAwesomeIcon
        icon={faMapLocationDot}
        size="lg"
        style={{
          color: theme.palette.accent.sideIcon,
          paddingRight: "10px",
        }}
      />
      <ListItemText primary="Map" />
    </ListItemButton>
  );
}
export default MapButton;
