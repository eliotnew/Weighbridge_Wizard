import { useTheme } from "@mui/material";
import { ListItemButton, ListItemText } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import CalendarContent from "../../tab-content/CalendarContent";

function OutstandingOrderButton({ addTab }) {
  const theme = useTheme();

  const handleClick = () => {
    const id = Math.floor(Math.random() * 100000);
    const newTab = {
      id: id,
      label: "Outstanding Orders",
      content: <CalendarContent />,
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
          color: theme.palette.primary.contrastText,
          paddingRight: "10px",
        }}
      />
      <ListItemText primary="Manage Outstanding Orders" />
    </ListItemButton>
  );
}
export default OutstandingOrderButton;
