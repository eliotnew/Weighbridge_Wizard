import React, { useState, useEffect } from "react";
import { Typography, Alert } from "@mui/material";
import TextField from "@mui/material/TextField";
import SubmitFormButton from "../../basicUI/SubmitFormButton";
import OutTicket from "../../../classes/OutTicket";
import getTruck from "../../../functions/truck_functions/getTruck";
import getOneOnesite from "../../../functions/ticket_functions/getOneOnsite";
import { useTheme } from "@mui/material";
import AI_UI from "../../camera/AI_UI";

function OutgoingContent() {
  const [grossWeight, setGrossWeight] = useState("");
  const [maxGVW, setMaxGVW] = useState("");
  const [netWeight, setNetWeight] = useState(0);
  const [tareWeight, setTareWeight] = useState(0);
  const [reg, setReg] = useState("");

  const [showFields, setShowFields] = useState(false);

  const [alertType, setAlertType] = useState(0);

  const handleRegChange = async (event) => {
    const responseString = event.target.value;
    const formattedResponseString = responseString
      .replace(/\s+/g, "")
      .toUpperCase();
    setReg(formattedResponseString);

    try {
      const gotTruck = await getTruck(formattedResponseString);
      const getTicket = await getOneOnesite(formattedResponseString);

      if (!gotTruck) {
        console.log("Didn't find truck for reg:", formattedResponseString);
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

    const newOutTicket = new OutTicket(reg, grossWeight);

    const save = await newOutTicket.updateTicket();
    if (save.message === "Success") {
      setAlertType(200);
      showFields(false);
    } else {
      setAlertType(3);
    }
    console.log("Response from weighOut:", save);
    console.log("Message from server:", save.message);
  };

  // This function will be passed to AI_UI to update the reg state in this parent component
  const handleAIReg = (newReg) => {
    const responseString = newReg;
    const formattedResponseString = responseString
      .replace(/\s+/g, "")
      .toUpperCase();
    setReg(formattedResponseString);
    console.log("Updated reg in parent: ", newReg);
  };

  // Use useEffect to apply the selected reg to the input
  useEffect(() => {
    if (reg == "") {
      setAlertType(0);
      return;
    }
    // Function to handle the change in reg state
    const handleRegChangeExternal = async () => {
      try {
        const gotTruck = await getTruck(reg);
        const getTicket = await getOneOnesite(reg);

        if (!gotTruck) {
          console.log("Didn't find truck for reg:", reg);
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

    // Call the function to handle reg change
    handleRegChangeExternal();
  }, [reg]);

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

  const theme = useTheme();
  const inputFieldStyles = {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.inputBorder.selected,
        color: theme.palette.inputBorder.selected,
      },
    },
    "& .MuiInputLabel-root": {
      "&.Mui-focused": {
        color: theme.palette.inputBorder.selected,
      },
    },
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
            value={reg}
            name="registration"
            label="Enter Reg:"
            variant="outlined"
            id="registration"
            autoComplete=""
            onChange={handleRegChange}
            sx={inputFieldStyles}
            InputLabelProps={{
              shrink: true,
            }}
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
                sx={inputFieldStyles}
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
        <AI_UI setReg={handleAIReg} />
      </div>
    </>
  );
}

export default OutgoingContent;
