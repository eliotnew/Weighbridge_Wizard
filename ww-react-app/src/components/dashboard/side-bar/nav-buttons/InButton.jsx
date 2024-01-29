import { useTheme } from "@mui/material";
import { ListItemButton, ListItemText } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckArrowRight } from "@fortawesome/free-solid-svg-icons";
import IncomingContent from "../../tab-content/IncomingContent";

function InButton({ addTab }) {
  const theme = useTheme();

  const handleClick = () => {
    const id = Math.floor(Math.random() * 100000);
    const newTab = {
      id: id,
      label: "Incoming",
      content: <IncomingContent />,
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
        style={{
          color: theme.palette.primary.contrastText,
          paddingRight: "10px",
        }}
      />
      <ListItemText primary="Incoming" />
    </ListItemButton>
  );
}
export default InButton;
