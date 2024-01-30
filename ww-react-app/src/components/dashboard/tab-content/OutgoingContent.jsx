import React, { useState } from "react";
import BasicWebcam from "../../camera/BasicWebcam";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import SubmitFormButton from "../../basicUI/SubmitFormButton";

function OutgoingContent() {
  const [grossWeight, setGrossWeight] = useState("");
  const [netWeight, setNetWeight] = useState("");

  const handleGrossChange = (event) => {
    setGrossWeight(event);
  };
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
        <div>
          <TextField
            margin="dense"
            required
            fullWidth
            name="registration"
            label="Enter Reg:"
            variant="outlined"
            id="registration"
            autoComplete=""
          />
          <TextField
            margin="dense"
            fullWidth
            id="tare"
            label="Tare"
            variant="outlined"
            disabled="true"
          />

          <TextField
            margin="dense"
            required
            fullWidth
            id="gross"
            label="Enter Gross Weight (kg)"
            variant="outlined"
            onChange={handleGrossChange}
          />

          <TextField
            margin="dense"
            fullWidth
            id="net"
            label="Net Weight"
            variant="outlined"
            disabled="true"
          />
          {grossWeight !== "" && (
            <TextField
              margin="dense"
              fullWidth
              id="net"
              label="Net Weight"
              variant="outlined"
              disabled="true"
            />
          )}

          <SubmitFormButton />
        </div>
        <BasicWebcam />
      </div>
    </>
  );
}
export default OutgoingContent;
