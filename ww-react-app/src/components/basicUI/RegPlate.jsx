import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@mui/material";

function RegPlate({ onClick, AI_DisplayReg }) {
  const theme = useTheme();

  // Use useEffect to log the updated state and refresh the render
  useEffect(() => {
    console.log(
      "The string to be displayed inside reg plate is currently:",
      AI_DisplayReg
    );
  }, [AI_DisplayReg]);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }} textAlign="center">
        <Typography variant="h4" style={{ fontSize: "20px" }}>
          <FontAwesomeIcon icon={faRobot} style={{ marginRight: "8px" }} />
          Wiz-AI Detection:
        </Typography>

        <Box
          textAlign="center"
          sx={{
            marginX: "10px",
            marginY: "10px",
            bgcolor: theme.palette.accent.regPlate,
            borderRadius: "10px",
            padding: "2px",
            border: "3px solid black",
            cursor: "pointer",
            "&:hover": {
              opacity: 0.5,
              transform: "scale(1.05)",
              transition: "transform 0.1s",
            },
          }}
          onClick={onClick}
        >
          <Box sx={{ flexDirection: "Column" }}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                color: "black",
                fontSize: "40px",
                textTransform: "uppercase",
              }}
            >
              {AI_DisplayReg}
            </Typography>
            <Typography
              sx={{ fontSize: "14px", fontStyle: "italic", color: "black" }}
            >
              Click To use OR Enter Manually
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
export default RegPlate;
