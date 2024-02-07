import { useTheme } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import { Divider, Typography } from "@mui/material";
import CalendarButton from "./nav-buttons/CalendarButton";
import ClosedOrdersButton from "./nav-buttons/ClosedOrdersButton";
import CreateNewOrderButton from "./nav-buttons/CreateNewOrderButton";
import InButton from "./nav-buttons/InButton";
import MapButton from "./nav-buttons/MapButton";
import OnSiteButton from "./nav-buttons/OnSiteButton";
import OutButton from "./nav-buttons/OutButton";
import OutstandingOrderButton from "./nav-buttons/OutstandingOrderButton";
import TrainingButton from "./nav-buttons/TrainingButton";
import ViewTicketsButton from "./nav-buttons/ViewTicketsButton";
import TruckDatabaseButton from "./nav-buttons/TruckDatabase";

function SideBar({ addTab }) {
  const theme = useTheme();
  const drawerWidth = 300; //275

  return (
    <Drawer
      variant="permanent"
      open
      sx={{
        width: drawerWidth,
        height: "90vh",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "15vw",
          position: "relative",
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,

          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
          marginLeft: "3px",
        },
      }}
    >
      <div style={{ overflowY: "auto", height: "100%", overflowX: "hidden" }}>
        <Toolbar>
          <h2 style={{}}>Actions</h2>
        </Toolbar>

        <List>
          <Typography
            variant="h6"
            sx={{ textAlign: "left", fontWeight: "bold" }}
          >
            WeighBridge Operations
          </Typography>
          <Divider />

          <InButton addTab={addTab} />
          <OutButton addTab={addTab} />
          <OnSiteButton addTab={addTab} />

          <Typography
            variant="h6"
            sx={{ textAlign: "left", fontWeight: "bold" }}
          >
            Manage Orders
          </Typography>
          <Divider />

          <CreateNewOrderButton addTab={addTab} />
          <OutstandingOrderButton addTab={addTab} />
          <ClosedOrdersButton addTab={addTab} />

          <Typography
            variant="h6"
            sx={{ textAlign: "left", fontWeight: "bold" }}
          >
            Manage Trucks
          </Typography>
          <Divider />
          <TruckDatabaseButton addTab={addTab} />
          <ViewTicketsButton addTab={addTab} />

          <Typography
            variant="h6"
            sx={{ textAlign: "left", fontWeight: "bold" }}
          >
            Utilities
          </Typography>
          <Divider />

          <CalendarButton addTab={addTab} />
          <MapButton addTab={addTab} />

          <Typography
            variant="h6"
            sx={{ textAlign: "left", fontWeight: "bold" }}
          >
            Help
          </Typography>
          <Divider />

          <TrainingButton addTab={addTab} />
        </List>
      </div>
    </Drawer>
  );
}
export default SideBar;
