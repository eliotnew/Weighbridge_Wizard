import React, { useState } from "react";
import BasicWebcam from "../../camera/BasicWebcam";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import SubmitFormButton from "../../basicUI/SubmitFormButton";
import weighOut from "../../../functions/ticket_functions/weighOut";
import getTruck from "../../../functions/truck_functions/getTruck";

function OutgoingContent() {
  const [grossWeight, setGrossWeight] = useState("");
  const [maxGVW, setMaxGVW] = useState("");
  const [reg, setReg] = useState("");

  const handleRegChange = async (event) => {
    const newReg = event.target.value; // Get the value directly from the event
    setReg(newReg); // Update the state
    console.log("The reg inputted is: " + newReg); // Log the new value

    try {
      const gotTruck = await getTruck(newReg); // Use newReg directly

      if (!gotTruck) {
        console.log("Didn't find truck for reg:", newReg);
        // You might want to handle the scenario of not finding the truck here.
        // Perhaps set an error state, show an alert, or clear previous truck info.
      } else {
        setMaxGVW(gotTruck.maxGVW);
        console.log("The max GVW for", newReg, "is", gotTruck.maxGVW);
      }
    } catch (error) {
      console.error("Error fetching truck info:", error);
      window.alert("Error fetching truck info. Please try again.");
    }
  };

  const handleSubmit = async () => {
    if (grossWeight > maxGVW) {
      window.alert("too heavy!");
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
