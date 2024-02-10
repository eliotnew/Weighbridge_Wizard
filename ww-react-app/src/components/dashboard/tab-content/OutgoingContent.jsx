import React, { useState } from "react";
import BasicWebcam from "../../camera/BasicWebcam";
import { Typography, Alert } from "@mui/material";
import TextField from "@mui/material/TextField";
import SubmitFormButton from "../../basicUI/SubmitFormButton";
import weighOut from "../../../functions/ticket_functions/weighOut";
import getTruck from "../../../functions/truck_functions/getTruck";
import getOneOnesite from "../../../functions/ticket_functions/getOneOnsite";

function OutgoingContent() {
  const [grossWeight, setGrossWeight] = useState("");
  const [maxGVW, setMaxGVW] = useState("");
  const [netWeight, setNetWeight] = useState(0);
  const [tareWeight, setTareWeight] = useState(0);
  const [reg, setReg] = useState("");
  const [showFields, setShowFields] = useState(false);

  const [alertType, setAlertType] = useState(0);

  const handleRegChange = async (event) => {
    const newReg = event.target.value;
    setReg(newReg);

    try {
      const gotTruck = await getTruck(newReg);
      const getTicket = await getOneOnesite(newReg);

      if (!gotTruck) {
        console.log("Didn't find truck for reg:", newReg);
      } else {
        setShowFields(true);
        setMaxGVW(gotTruck.maxGVW);
        const numTare = Number(getTicket.tareWeight);
        setTareWeight(numTare); //This fails because its trying to get the tare from a truck when it needs to get it from the ticket!!!
      }
      if (gotTruck.maxGVW === undefined) {
        setAlertType(404);
        return;
      }
      setAlertType(0);
    } catch (error) {
      setAlertType(500);
      setShowFields(false);
    }
  };

  const handleSubmit = async () => {
    // Called with submit button, must pass several checks before going off to server.

    console.log("gross weight " + grossWeight);
    if (isNaN(grossWeight)) {
      //--------------------------------------------------------GVW must be a number
      setAlertType(2);
      return;
    }

    if (grossWeight > maxGVW) {
      //--------------------------------------------------------Must be Lighter than the maximum
      setAlertType(1);
      return;
    }

    if (grossWeight < tareWeight) {
      //--------------------------------------------------------must be heavier than tare to be loaded.
      setAlertType(4);
      return;
    }

    const jsonObj = {
      reg: reg,
      outWeight: grossWeight,
    };
    console.log("Obj going out: " + jsonObj);
    console.log(grossWeight);
    console.log(reg);

    const save = await weighOut(jsonObj);
    if (save.message === "Success") {
      // Assuming 'save.ok' is set correctly inside 'weighOut' if the response status code is 200
      setAlertType(200);
      showFields(false);
    } else {
      setAlertType(3);
    }
    console.log("Response from weighOut:", save);
    console.log("Message from server:", save.message);
  };

  const handleGrossChange = (event) => {
    const newGrossWeightValue = event.target.value;
    const newGrossWeight = Number(newGrossWeightValue); //Takes the input and change to number
    setGrossWeight(newGrossWeight);

    if (!isNaN(newGrossWeight) && !isNaN(tareWeight)) {
      // Ensure both are numbers
      const newNetWeight = newGrossWeight - tareWeight;
      setNetWeight(newNetWeight);

      if (newGrossWeight > maxGVW) {
        setAlertType(1);
      } else {
        setAlertType(0);
      }
    } else {
      console.log("Invalid weight inputs", { newGrossWeight, tareWeight });
      setAlertType(2);
      setNetWeight(0);
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
          {showFields === true && (
            <>
              <TextField
                margin="dense"
                required
                fullWidth
                id="gross"
                label="Enter Gross Weight (kg)"
                variant="outlined"
                onChange={handleGrossChange}
              />
              <Typography>TareWeight: {tareWeight} kg</Typography>
              {grossWeight !== 0 && (
                <>
                  <Typography
                    style={{ color: netWeight < 0 ? "red" : "inherit" }}
                  >
                    Net Weight: {netWeight} kg
                  </Typography>
                </>
              )}

              <SubmitFormButton onClick={handleSubmit} />
            </>
          )}

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
              severity="warning"
              onClose={() => setAlertType(0)}
            >
              Unable to find this reg onsite
            </Alert>
          ) : null}
          {alertType === 1 ? (
            <Alert
              sx={{ padding: "10px" }}
              severity="error"
              onClose={() => setAlertType(0)}
            >
              ERR: Weight Exceeds Safety Limit. Please instruct driver to return
              and tip off the excess.
            </Alert>
          ) : null}
          {alertType === 2 ? (
            <Alert
              sx={{ padding: "10px" }}
              severity="warning"
              onClose={() => setAlertType(0)}
            >
              Gross Weight must be a number.
            </Alert>
          ) : null}
          {alertType === 3 ? (
            <Alert
              sx={{ padding: "10px" }}
              severity="error"
              onClose={() => setAlertType(0)}
            >
              Didn't Successfully Weigh out!
            </Alert>
          ) : null}
          {alertType === 4 ? (
            <Alert
              sx={{ padding: "10px" }}
              severity="warning"
              onClose={() => setAlertType(0)}
            >
              Your Loaded weight should be heavier than the tare weight!
            </Alert>
          ) : null}
          {alertType === 200 ? (
            <Alert
              sx={{ padding: "10px" }}
              severity="success"
              onClose={() => setAlertType(0)}
            >
              Successfully Weighed out & Ticket Sent off!
            </Alert>
          ) : null}
        </div>
        <BasicWebcam />
      </div>
    </>
  );
}

export default OutgoingContent;
