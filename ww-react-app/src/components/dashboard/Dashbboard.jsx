import React, { useState } from "react";
import { Paper, useTheme } from "@mui/material";
import { Box, Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointLeft } from "@fortawesome/free-solid-svg-icons";
import DashboardAppBar from "./top-bar/DashboardAppBar";
import BottomAppbar from "./bottom-bar/BottomAppBar";
import SideBar from "./side-bar/SideBar";
import { Tabs, Tab } from "@mui/material";
import TabPanel from "./tabs-interface/TabPanel";
import CustomTab from "./tabs-interface/CustomTab";

/**
 * Tabs are opened via interaction with the sidebar.
 */

function Dashboard() {
  const theme = useTheme();
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const addTab = (newTab) => {
    setTabs([...tabs, newTab]);
  };

  const removeTab = (tabId) => {
    setTabs(tabs.filter((tab) => tab.id !== tabId));
  };

  // Handle changing tabs
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

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
          <SideBar addTab={addTab} />
        </Grid>

        {/* Box to the Right */}
        <Grid item xs={10}>
          <Paper
            elevation={6}
            square={false}
            p={2}
            sx={{
              backgroundColor: "white",
              margin: "35px",
              minHeight: "70vh",
              display: "flex",
              flexDirection: "column",
              alignItems: tabs.length === 0 ? "center" : "flex-start",
              justifyContent: tabs.length === 0 ? "center" : "flex-start",
            }}
          >
            {tabs.length > 0 && (
              <>
                <Tabs
                  value={activeTab}
                  onChange={handleChange}
                  variant="scrollable"
                  allowScrollButtonsMobile
                  sx={{
                    ".MuiTabs-flexContainer": {
                      position: "relative",
                      zIndex: 1,
                    },
                    ".MuiTab-root": {
                      border: "1px solid #ccc",
                      borderTopLeftRadius: "6px",
                      borderTopRightRadius: "14px",
                      marginRight: "0px",
                      minWidth: "120px",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                      "&.Mui-selected": {
                        zIndex: 2,
                        backgroundColor: theme.palette.secondary.main,
                        borderColor: "#ccc",
                        color: theme.palette.secondary.contrastText,
                        borderBottomColor: "transparent",
                      },
                      ".MuiTabs-indicator": {
                        display: "none",
                      },
                    },
                  }}
                >
                  {tabs.map((tab, index) => (
                    <CustomTab
                      key={tab.id}
                      label={tab.label}
                      onClose={() => removeTab(tab.id)}
                      {...(activeTab === index ? { id: `tab-${index}` } : {})}
                    />
                  ))}
                </Tabs>
                {tabs.map((tab, index) => (
                  <TabPanel key={tab.id} value={activeTab} index={index}>
                    {tab.content}
                  </TabPanel>
                ))}
              </>
            )}

            {tabs.length === 0 && (
              <Box sx={{ textAlign: "center" }}>
                <h2>
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
            )}
          </Paper>
        </Grid>
      </Grid>

      <BottomAppbar />
    </div>
  );
}
export default Dashboard;
