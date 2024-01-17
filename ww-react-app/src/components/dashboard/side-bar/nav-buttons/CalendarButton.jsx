import { useTheme } from "@mui/material";
import { ListItemButton, ListItemText } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

function CalendarButton() {
  const theme = useTheme();
  return (
    <ListItemButton
      sx={{
        "&:hover": {
          color: theme.palette.secondary.contrastText,
          transform: "scale(1.1)",
          transition: "transform 0.35s",
        },
      }}
      onClick={() => {
        // Handle button click
      }}
    >
      {" "}
      <FontAwesomeIcon
        icon={faCalendarDays}
        size="lg"
        style={{
          color: theme.palette.primary.contrastText,
          paddingRight: "10px",
        }}
      />
      <ListItemText primary="Calendar" />
    </ListItemButton>
  );
}
export default CalendarButton;
