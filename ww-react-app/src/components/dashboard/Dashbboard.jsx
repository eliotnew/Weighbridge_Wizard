import React, { useState } from "react";
import { Paper, useTheme } from "@mui/material";
import { Box, Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHatWizard } from "@fortawesome/free-solid-svg-icons";
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
    const newTabs = [...tabs, newTab];
    setTabs([...tabs, newTab]);
    setActiveTab(newTabs.length - 1);
  };

  const removeTab = (tabId) => {
    //setTabs(tabs.filter((tab) => tab.id !== tabId));

    const indexToRemove = tabs.findIndex((tab) => tab.id === tabId);
    const isLastTab = indexToRemove === tabs.length - 1; //if the deleted tab is last one, set the previous one as the active tab
    const newTabs = tabs.filter((tab) => tab.id !== tabId);
    setTabs(newTabs);

    if (indexToRemove === activeTab) {
      if (newTabs.length === 0) {
        setActiveTab(0); //no more tabs left
      } else if (isLastTab) {
        setActiveTab(indexToRemove - 1); // If its the last tab, set the previous tab as active
      } else {
        setActiveTab(indexToRemove); // normal behaviour is to set the next tab as active
      }
    } else if (indexToRemove < activeTab) {
      setActiveTab(activeTab - 1);
    }
  };

  // Handle changing tabs
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div
      data-testid="background"
      style={{
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <DashboardAppBar addTab={addTab} />

      <Grid container>
        <Grid item xs={2}>
          <SideBar addTab={addTab} />
        </Grid>

        {/* Box to the Right */}
        <Grid item xs={10}>
          <Paper
            data-testid="background-paper-content"
            elevation={6}
            square={false}
            p={2}
            sx={{
              backgroundColor: theme.palette.paper.main,
              color: theme.palette.paper.contrastText,
              margin: "35px", //put me back to 35
              minHeight: "82vh",
              width: "78.75vw",
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
                <FontAwesomeIcon
                  icon={faHatWizard}
                  size="8x"
                  bounce
                  style={{
                    color: "lightgray",
                    animationDuration: "3s",
                  }}
                />
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
