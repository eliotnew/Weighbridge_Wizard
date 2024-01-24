import { useTheme } from "@mui/material";
import { ListItemButton, ListItemText } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHelmetSafety } from "@fortawesome/free-solid-svg-icons";
import Calendar from "../../tab-content/calendar";

function OnSiteButton({ addTab }) {
  const theme = useTheme();

  const handleClick = () => {
    const newTab = {
      id: "unique-id-1",
      label: "Onsite",
      content: <Calendar />,
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
        icon={faHelmetSafety}
        size="lg"
        style={{
          color: theme.palette.primary.contrastText,
          paddingRight: "10px",
        }}
      />
      <ListItemText primary="View Onsite" />
    </ListItemButton>
  );
}
export default OnSiteButton;
