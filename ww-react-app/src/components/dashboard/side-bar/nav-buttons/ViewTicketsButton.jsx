import { useTheme } from "@mui/material";
import { ListItemButton, ListItemText } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import TrainingContent from "../../tab-content/TrainingContent";

function ViewTicketsButton({ addTab }) {
  const theme = useTheme();
  const handleClick = () => {
    const id = Math.floor(Math.random() * 100000);
    const newTab = {
      id: id,
      label: "Tickets History",
      content: <TrainingContent />,
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
          color: theme.palette.primary.contrastText,
          paddingRight: "10px",
        }}
      />
      <ListItemText primary="View Tickets" />
    </ListItemButton>
  );
}
export default ViewTicketsButton;
