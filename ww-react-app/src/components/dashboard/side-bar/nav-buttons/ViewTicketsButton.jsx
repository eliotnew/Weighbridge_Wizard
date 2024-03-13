import React from "react";
import { useTheme } from "@mui/material";
import { ListItemButton, ListItemText } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import TicketsContent from "../../tab-content/TicketsContent";
//import TicketsContent from "../../tab-content/ticketsContent";

function ViewTicketsButton({ addTab }) {
  const theme = useTheme();
  const handleClick = () => {
    const id = Math.floor(Math.random() * 100000);
    const newTab = {
      id: id,
      label: "View Tickets",
      content: <TicketsContent />,
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
        icon={faTicket}
        size="lg"
        style={{
          color: theme.palette.accent.sideIcon,
          paddingRight: "10px",
        }}
      />
      <ListItemText primary="View Tickets" />
    </ListItemButton>
  );
}
export default ViewTicketsButton;
