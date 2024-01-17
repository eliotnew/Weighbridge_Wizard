import { useTheme } from "@mui/material";
import { ListItemButton, ListItemText } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckArrowRight } from "@fortawesome/free-solid-svg-icons";

function InButton() {
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
