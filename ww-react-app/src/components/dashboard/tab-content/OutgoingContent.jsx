import React, { useState } from "react";
import BasicWebcam from "../../camera/BasicWebcam";
import { Typography, Alert } from "@mui/material";
import TextField from "@mui/material/TextField";
import SubmitFormButton from "../../basicUI/SubmitFormButton";
import weighOut from "../../../functions/ticket_functions/weighOut";
import getTruck from "../../../functions/truck_functions/getTruck";

function OutgoingContent() {
  const [grossWeight, setGrossWeight] = useState("");
  const [maxGVW, setMaxGVW] = useState("");
  const [netWeight, setNetWeight] = useState("");
  const [tareWeight, setTareWeight] = useState(0);
  const [reg, setReg] = useState("");

  const [alertType, setAlertType] = useState(0);

  const handleRegChange = async (event) => {
    const newReg = event.target.value;
    setReg(newReg);
    console.log("The reg inputted is: " + newReg);

    try {
      const gotTruck = await getTruck(newReg);

      if (!gotTruck) {
        console.log("Didn't find truck for reg:", newReg);
      } else {
        setMaxGVW(gotTruck.maxGVW);
        setTareWeight(gotTruck.tareWeight); //This fails because its trying to get the tare from a truck when it needs to get it from the ticket!!!
        console.log("The max GVW for", newReg, "is", gotTruck.maxGVW);
      }
      if (gotTruck.maxGVW === undefined) {
        setAlertType(404);
        console.log("Correctly spots no match");
        return;
      }
      setAlertType(0);
    } catch (error) {
      console.error("Error fetching truck info:", error);
      window.alert("Error fetching truck info. Please try again.");
      setAlertType(500);
    }
  };

  const handleSubmit = async () => {
    if (grossWeight > maxGVW) {
      setAlertType(1);
      return;
    }

    const jsonObj = {
      reg: reg,
      outWeight: grossWeight,
    };

    setShowFields(false);
    console.log(jsonObj);

    const save = await weighIn(jsonObj);
    if (save.message === "Weigh in Successfull") {
      setAlertType(201);
    } else {
      setAlertType(500);
    }
    console.log(save);
  };

  const handleGrossChange = (event) => {
    const newGrossWeight = event.target.value;
    setGrossWeight(newGrossWeight);

    const newNetWeight = newGrossWeight - tareWeight;
    setNetWeight(newNetWeight);

    if (grossWeight >= maxGVW) {
      setAlertType(1);
      console.log("too heavy.");
    } else {
      setAlertType(0);
    }
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
            onChange={handleRegChange}
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
          {grossWeight !== "" && (
            <TextField
              margin="dense"
              fullWidth
              id="net"
              label="Net Weight (Automatically Calculated):"
              variant="outlined"
              disabled="true"
              value={netWeight}
            />
          )}

          <SubmitFormButton />
          {alertType === 404 ? (
            <Alert
              sx={{ padding: "10px" }}
              severity="warning"
              onClose={() => setAlertType(0)}
            >
              No Reg matches
            </Alert>
          ) : null}
          {alertType === 500 ? (
            <Alert
              sx={{ padding: "10px" }}
              severity="error"
              onClose={() => setAlertType(0)}
            >
              Server Error
            </Alert>
          ) : null}
          {alertType === 1 ? (
            <Alert
              sx={{ padding: "10px" }}
              severity="error"
              onClose={() => setAlertType(0)}
            >
              Weight Exceeds Safety Limit. Please instruct driver to return and
              tip off the excess.
            </Alert>
          ) : null}
        </div>
        <BasicWebcam />
      </div>
    </>
  );
}

export default OutgoingContent;
