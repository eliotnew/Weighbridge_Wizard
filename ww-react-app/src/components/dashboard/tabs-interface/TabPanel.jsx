import { Box } from "@mui/material";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{
        overflowY: "auto",
        maxHeight: "70vh",
      }}
    >
      {value === index && <Box p={6}>{children}</Box>}
    </div>
  );
}
export default TabPanel;
{
  /* maxHeight: '500px', 
        padding: '16px', */
}
