import React, { useState, useEffect } from "react";
import RegPlate from "../basicUI/RegPlate";
import AIWebcam from "./AIWebcam";
import { Box } from "@mui/material";
/**
 *
 * This component contains both the UI for the reg and the camera. Should pass the reg to its parent components.
 */
function AI_UI({ setChildReg }) {
  const [AI_DisplayReg, setAI_DisplayReg] = useState("Searching..."); // This is the string value that is displayed by the regplate component. Clicking on that component from either Incoming or outgoing content will set this string as the main "reg" state in those parent components.

  const handleClick = () => {
    setChildReg(AI_DisplayReg);
  };

  // Use useEffect to log the updated state
  useEffect(() => {
    console.log("displayreg was updated in AIUI component: ", AI_DisplayReg);
  }, [AI_DisplayReg]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 640 }}>
          <AIWebcam setAI_DisplayReg={setAI_DisplayReg} />
        </Box>
        <Box sx={{ width: "100%", maxWidth: 320, mt: 2 }}>
          <RegPlate onClick={handleClick} AI_DisplayReg={AI_DisplayReg} />
        </Box>
      </Box>
    </>
  );
}
export default AI_UI;
