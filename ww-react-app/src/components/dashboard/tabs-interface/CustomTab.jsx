import React from "react";
import { Tab, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";

function CustomTab({ label, onClose, ...other }) {
  const handleIconClick = (event) => {
    event.stopPropagation(); //stops the tab from selecting when closing it
    onClose();
  };

  return (
    <Tab
      {...other}
      label={
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {label}
          <IconButton size="small" onClick={handleIconClick}>
            <FontAwesomeIcon icon={faRectangleXmark} />
          </IconButton>
        </div>
      }
    />
  );
}

export default CustomTab;
