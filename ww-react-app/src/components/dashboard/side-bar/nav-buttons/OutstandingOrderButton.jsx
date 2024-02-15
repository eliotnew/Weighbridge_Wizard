import { useTheme } from "@mui/material";
import { ListItemButton, ListItemText } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import ManageOutstandingOrderContent from "../../tab-content/ManageOutstandingOrderContent";

function OutstandingOrderButton({ addTab }) {
  const theme = useTheme();

  const handleClick = () => {
    const id = Math.floor(Math.random() * 100000);
    const newTab = {
      id: id,
      label: "Outstanding Orders",
      content: <ManageOutstandingOrderContent />,
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
        icon={faFolderOpen}
        size="lg"
        style={{
          color: theme.palette.accent.sideIcon,
          paddingRight: "10px",
        }}
      />
      <ListItemText primary="Manage Outstanding Orders" />
    </ListItemButton>
  );
}
export default OutstandingOrderButton;
