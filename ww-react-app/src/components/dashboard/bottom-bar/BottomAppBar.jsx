import Clock from "./Clock";
import { AppBar } from "@mui/material";
import { useTheme } from "@mui/material";

function BottomAppBar() {
  const theme = useTheme();
  return (
    <AppBar
      position="static"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.primary.main,
        position: "fixed",
        bottom: 0,
        height: "5.47vh",
        width: "100%",
        "&": {
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
        },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Clock />
    </AppBar>
  );
}
export default BottomAppBar;
