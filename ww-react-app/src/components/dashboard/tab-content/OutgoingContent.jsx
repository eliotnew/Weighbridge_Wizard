import React, { useState } from "react";
import BasicWebcam from "../../camera/BasicWebcam";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import SubmitFormButton from "../../basicUI/SubmitFormButton";

function OutgoingContent() {
  return (
    <>
      <Typography variant="h3"> Weigh Out </Typography>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <BasicWebcam />
        <div>
          <TextField
            margin="normal"
            required
            fullWidth
            name="registration"
            label="Enter Reg:"
            variant="outlined"
            id="registration"
            autoComplete=""
          />
          <TextField
            margin="normal"
            fullWidth
            id="tare"
            label="Tare"
            variant="outlined"
            disabled="true"
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="gross"
            label="Enter Gross Weight (kg)"
            variant="outlined"
          />

          <TextField
            margin="normal"
            fullWidth
            id="net"
            label="Net Weight"
            variant="outlined"
            disabled="true"
          />

          <SubmitFormButton />
        </div>
      </div>
    </>
  );
}
export default OutgoingContent;
