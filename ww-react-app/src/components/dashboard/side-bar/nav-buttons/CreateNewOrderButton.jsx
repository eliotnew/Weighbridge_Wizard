import { useTheme } from "@mui/material";
import { useColorTheme } from "../../../themes/use-color-theme";
import { ListItemButton, ListItemText } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";

function CreateNewOrderButton() {
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
        icon={faFolderPlus}
        size="lg"
        style={{
          color: theme.palette.primary.contrastText,
          paddingRight: "10px",
        }}
      />
      <ListItemText primary="Create New Order" />
    </ListItemButton>
  );
}
export default CreateNewOrderButton;
