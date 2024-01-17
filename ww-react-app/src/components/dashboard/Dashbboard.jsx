import React from "react";
import { useTheme } from "@mui/material";
import { Box, Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointLeft } from "@fortawesome/free-solid-svg-icons";
import DashboardAppBar from "./top-bar/DashboardAppBar";
import BottomAppbar from "./bottom-bar/BottomAppBar";
import SideBar from "./side-bar/SideBar";

function Dashboard() {
  const theme = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <DashboardAppBar />

      <Grid container>
        <Grid item xs={2}>
          <SideBar />
        </Grid>

        {/* Box to the Right */}
        <Grid item xs={10}>
          <Box
            p={2}
            sx={{
              borderStyle: "dashed",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              margin: "35px",
              minHeight: "77.5vh",
              textAlign: "center",
            }}
          >
            <h2>
              {" "}
              <FontAwesomeIcon
                icon={faHandPointLeft}
                beatFade
                style={{
                  color: theme.palette.primary.contrastText,
                  paddingRight: "20px",
                }}
              />
              Begin work by selecting an action from the 'Actions Menu'
            </h2>
          </Box>
        </Grid>
      </Grid>

      <BottomAppbar />
    </div>
  );
}
export default Dashboard;
