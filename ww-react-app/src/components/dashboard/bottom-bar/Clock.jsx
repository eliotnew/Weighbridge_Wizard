import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import { Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

function Clock() {
  const [time, setTime] = useState(new Date());
  const theme = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000); // Update the time every 1000 milliseconds (1 second)

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Typography
      style={{ padding: "10px", color: theme.palette.primary.contrastText }}
    >
      <FontAwesomeIcon icon={faClock} style={{ marginRight: "6px" }} />
      {time.toLocaleTimeString()}
    </Typography>
  );
}

export default Clock;
