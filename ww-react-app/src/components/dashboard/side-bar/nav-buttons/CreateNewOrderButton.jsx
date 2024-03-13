import React from "react";
import { useTheme } from "@mui/material";
import { ListItemButton, ListItemText } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import CreateNewOrderContent from "../../tab-content/CreateNewOrderContent";

function CreateNewOrderButton({ addTab }) {
  const theme = useTheme();

  const handleClick = () => {
    const id = Math.floor(Math.random() * 100000);
    const newTab = {
      id: id,
      label: "Create New Order",
      content: <CreateNewOrderContent />,
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
        icon={faFolderPlus}
        size="lg"
        style={{
          color: theme.palette.accent.sideIcon,
          paddingRight: "10px",
        }}
      />
      <ListItemText primary="Create New Order" />
    </ListItemButton>
  );
}
export default CreateNewOrderButton;
