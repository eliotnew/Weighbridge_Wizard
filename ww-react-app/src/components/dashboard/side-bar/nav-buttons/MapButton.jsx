import { useTheme } from "@mui/material";

function MapButton() {
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
        icon={faMapLocationDot}
        size="lg"
        style={{
          color: theme.palette.primary.contrastText,
          paddingRight: "10px",
        }}
      />
      <ListItemText primary="Map" />
    </ListItemButton>
  );
}
export default MapButton;
