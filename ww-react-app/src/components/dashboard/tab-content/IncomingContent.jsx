import React, { useState, useEffect } from "react";
import BasicWebcam from "../../camera/BasicWebcam";
import {
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  Alert,
} from "@mui/material";
import SubmitFormButton from "../../basicUI/SubmitFormButton";
import CheckButton from "../../basicUI/CheckButton";
import getOrdersCompatibleByTruckType from "../../../functions/truck_functions/confirmTruck";
import confirmTruck from "../../../functions/truck_functions/confirmTruck";

// TO DO: Takes input for reg plate , on pressing the checkButton, it calls confirmTruck(reg).
// if response = true, the enter tareweight box becomes visible and also the assign job select box will too. That box will collect it's list values by passing reg through (getOrdersCompatibleByTruckType).
// if the response to confirm truck = false i will just do a window alert that says truck not on database for now.

function IncomingContent() {
  const [reg, setReg] = useState("");
  const [freshReg, setFreshReg] = useState(false);
  const [job, setJob] = useState("Loading...");
  const [product, setProduct] = useState("Loading...");
  const [showFields, setShowFields] = useState(false); //input fields only show if truck exists or else prompts user to add the truck to the database.
  const [jobOptions, setJobOptions] = useState([]);

  const handleRegChange = (event) => {
    setReg(event.target.value);
    setFreshReg(true);
    console.log("reg set to: " + reg);
  };

  const handleTareWeightChange = (event) => {
    setTareWeight(event.target.value);
  };

  const handleJobChange = (event) => {
    setJob(event.target.value);
    const selectedJob = jobOptions.find(
      (option) => option.label === event.target.value
    );
    setProduct(selectedJob.value);
  };

  const checkTruck = () => {
    setFreshReg(false);
    confirmTruck(reg)
      .then((response) => {
        //window.alert(JSON.stringify(response));
        console.log(response);
        if (JSON.stringify(response) === '{"exists":true}') {
          window.alert("yes yes yes");
        } else {
          throw error;
        }
      })
      .catch((error) => {
        console.error("Error checking truck:", error);
        window.alert("Error checking truck");
      });
  };
  return (
    <>
      <Typography variant="h3"> Weigh In </Typography>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {" "}
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
          {freshReg === true ? <CheckButton onClick={checkTruck} /> : null}
        </div>
        <div>
          {showFields && (
            <>
              <TextField
                margin="dense"
                required
                fullWidth
                id="tare"
                label="Enter Tare Weight (kg)"
                variant="outlined"
                value={tareWeight}
                onChange={handleTareWeightChange}
              />

              <FormControl fullWidth margin="normal">
                <InputLabel id="select-job">Assign Job</InputLabel>
                <Select
                  labelId="job-select-label"
                  id="job-select"
                  value={job}
                  label="Assign Job"
                  onChange={handleJobChange}
                >
                  {jobOptions.map((option, index) => (
                    <MenuItem key={index} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                margin="dense"
                fullWidth
                id="product"
                value={product}
                label="Product to be Loaded:"
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </>
          )}
          <SubmitFormButton />
        </div>
      </div>
    </>
  );
}
export default IncomingContent;
