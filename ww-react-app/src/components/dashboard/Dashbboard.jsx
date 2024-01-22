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

/**
 * Tabs are opened via interaction with the sidebar.   
 */

function Dashboard() {
  const theme = useTheme();
  const [tabs,setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const addTab = (newTab) => {
    setTabs([...tabs, newTab]);
  };

  const removeTab = (tabId) => {
    setTabs(tabs.filter(tab => tab.id !== tabId));
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
          <SideBar addTab={addTab}/>
        </Grid>

        {/* Box to the Right */}
        <Grid item xs={10}>
          <Paper elevation={6} square={false} p={2} sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              margin: "35px",
              minHeight: "70vh",
              textAlign: "center",}}>
          
          {tabs.length > 0 && (
              <Tabs value={activeTab} onChange={handleChange}>
                {tabs.map((tab, index) => (
                  <Tab key={tab.id} label={tab.label} />
                ))}
              </Tabs>
            )}

            {tabs.map((tab, index) => (
              <TabPanel key={tab.id} value={activeTab} index={index}>
                {tab.content}
              </TabPanel>
            ))}
            
            {tabs.length === 0 && (
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
            )}
          
          </Paper>
          
        </Grid>
      </Grid>

      <BottomAppbar />
    </div>
  );
}
export default Dashboard;
