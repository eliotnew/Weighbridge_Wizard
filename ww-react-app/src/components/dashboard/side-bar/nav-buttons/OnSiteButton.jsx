import { useTheme } from "@mui/material";

function OnSiteButton() {
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
