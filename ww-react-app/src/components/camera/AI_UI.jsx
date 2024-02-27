import React, { useState, useEffect, useRef } from "react";
import RegPlate from "../basicUI/RegPlate";
import AIWebcam from "./AIWebcam";
import { Box } from "@mui/material";
/**
 *
 * This component contains both the UI for the reg and the camera. Should pass the reg to its parent components.
 */
function AI_UI({ setReg }) {
  const [childReg, setChildReg] = useState("Searching...");

  const handleClick = () => {
    setReg(childReg);
  };

  // Use useEffect to log the updated state
  useEffect(() => {
    console.log("child reg: " + childReg);
  }, [childReg]);

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
          <AIWebcam setChildReg={setChildReg} />
        </Box>
        <Box sx={{ width: "100%", maxWidth: 320, mt: 2 }}>
          <RegPlate onClick={handleClick} childReg={childReg} />
        </Box>
      </Box>
    </>
  );
}
export default AI_UI;
