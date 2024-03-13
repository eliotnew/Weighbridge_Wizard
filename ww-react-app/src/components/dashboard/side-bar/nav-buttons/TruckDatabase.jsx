import React from "react";
import { useTheme } from "@mui/material";
import { ListItemButton, ListItemText } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFront } from "@fortawesome/free-solid-svg-icons";
import TruckDatabaseContent from "../../tab-content/TruckDatabaseContent";
function TruckDatabaseButton({ addTab }) {
  const theme = useTheme();
  const handleClick = () => {
    const id = Math.floor(Math.random() * 100000);
    const newTab = {
      id: id,
      label: "Truck Database",
      content: <TruckDatabaseContent />,
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
        icon={faTruckFront}
        size="lg"
        style={{
          color: theme.palette.accent.sideIcon,
          paddingRight: "10px",
        }}
      />
      <ListItemText primary="Truck Database" />
    </ListItemButton>
  );
}
export default TruckDatabaseButton;
