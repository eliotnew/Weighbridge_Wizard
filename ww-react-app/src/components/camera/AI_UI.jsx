import React, { useState, useEffect, useRef } from "react";
import RegPlate from "../basicUI/RegPlate";
import AIWebcam from "./AIWebcam";
import {
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  Box,
  Alert,
} from "@mui/material";
/**
 *
 * This component contains both the UI for the reg and the camera. Should pass the reg to its parent components.
 */
function AI_UI() {
  const [reg, setReg] = useState("Searching...");

  // Use useEffect to log the updated state
  useEffect(() => {
    console.log("reg from UI component is: " + reg);
  }, [reg]);
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
          <AIWebcam setParentReg={setReg} />
        </Box>
        <Box sx={{ width: "100%", maxWidth: 320, mt: 2 }}>
          <RegPlate reg={reg} />
        </Box>
      </Box>
    </>
  );
}
export default AI_UI;
