import React from "react";
import { useTheme } from "@mui/material";
import { ListItemButton, ListItemText } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckArrowRight } from "@fortawesome/free-solid-svg-icons";
import OutgoingContent from "../../tab-content/OutgoingContent";

function OutButton({ addTab }) {
  const theme = useTheme();

  const handleClick = () => {
    const id = Math.floor(Math.random() * 100000);
    const newTab = {
      id: id,
      label: "Weigh-Out",
      content: <OutgoingContent />,
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
        icon={faTruckArrowRight}
        size="lg"
        flip="horizontal"
        style={{
          color: theme.palette.accent.sideIcon,
          paddingLeft: "10px",
        }}
      />
      <ListItemText primary="Weigh-Out" />
    </ListItemButton>
  );
}
export default OutButton;
