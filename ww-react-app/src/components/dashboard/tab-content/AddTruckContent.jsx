import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import createTruck from "../../../functions/truck_functions/createTruck";
import SubmitFormButton from "../../basicUI/SubmitFormButton";
import Truck from "../../../classes/Truck";

function AddTruckContent() {
  const [alertType, setAlertType] = useState(0);
  const [truckType, setTruckType] = useState(0);
  const [trailerType, setTrailerType] = useState("");
  const [reg, setReg] = useState("");
  const [driverName, setDriverName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleRegChange = (event) => {
    setReg(event.target.value);
  };

  const handleTruckTypeChange = (event) => {
    setTruckType(event.target.value);
  };
  const handleTrailerTypeChange = (event) => {
    setTrailerType(event.target.value);
  };

  const handleDriverNameChange = (event) => {
    setDriverName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  function clearForm() {
    setAlertType(201);
    setTruckType("");
    setTrailerType("");
    setReg("");
    setDriverName("");
    setPhoneNumber("");
    setEmail("");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newTruck = new Truck(
      driverName,
      email,
      reg,
      trailerType,
      phoneNumber,
      truckType
    );
    const truckJson = newTruck.toJSON();
    console.log("Truck obj is: ", truckJson);

    let filledIn = true;
    for (const key in truckJson) {
      console.log(key, truckJson[key]);
      const value = truckJson[key];
      if (value === "" || value === undefined) {
        filledIn = false;
        break;
      }
    }

    if (!filledIn) {
      setAlertType(3);
    } else {
      try {
        if (isNaN(parseFloat(phoneNumber))) {
          setAlertType(1);
          return;
        }
        if (isNaN(parseFloat(truckType))) {
          setAlertType(2);
          return;
        }
        const response = await newTruck.addTruck();
        console.log(response);
        if (response.message === "Truck Saved Successfully") {
          clearForm();
          setAlertType(201);
        }
      } catch (error) {
        setAlertType(4);
        console.error("Failed to create truck:", error);
      }
    }
  };

  return (
    <>
      <Typography variant="h3"> Add Truck </Typography>
      <Typography variant="h6">
        {" "}
        Ask the driver for details and enter them below:{" "}
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Typography variant="h6" sx={{ marginTop: "10px" }}>
          Vehicle Details
        </Typography>

        <FormControl fullWidth margin="normal">
          <TextField
            id="reg"
            label="Reg"
            variant="outlined"
            value={reg}
            onChange={handleRegChange}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="select-truck">Truck Type</InputLabel>
          <Select
            labelId="truck-select-label"
            id="truck-select"
            value={truckType}
            onChange={handleTruckTypeChange}
            label="Select Truck Type"
          >
            <MenuItem value={18000}>Rigid: 2 axle </MenuItem>
            <MenuItem value={26000}>Rigid: 3 axle</MenuItem>
            <MenuItem value={44000}>Articulated Lorry with trailer</MenuItem>
            <MenuItem value={72000}>Articulated Dump Truck</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="select-trailer">Trailer Type</InputLabel>
          <Select
            labelId="trailer-select-label"
            id="trailer-select"
            value={trailerType}
            onChange={handleTrailerTypeChange}
            label="Select Trailer Type"
          >
            <MenuItem value="dump">Tipper/Dump </MenuItem>
            <MenuItem value="hotbox">Hotbox</MenuItem>
            <MenuItem value="sidelifter">Container SideLifter</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="h6" sx={{ marginTop: "10px" }}>
          Driver Details
        </Typography>

        <FormControl fullWidth margin="normal">
          <TextField
            id="driverName"
            label="Driver Name"
            variant="outlined"
            value={driverName}
            onChange={handleDriverNameChange}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            id="phoneNumber"
            label="Phone Number"
            variant="outlined"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
          />
        </FormControl>
        <SubmitFormButton />
      </Box>
      {alertType === 1 ? (
        <Alert
          sx={{ padding: "10px" }}
          severity="error"
          onClose={() => setAlertType(0)}
        >
          Phone Field Must be a Number!
          <Button color="inherit" size="small"></Button>
        </Alert>
      ) : null}
      {alertType === 2 ? (
        <Alert
          sx={{ padding: "10px" }}
          severity="error"
          onClose={() => setAlertType(0)}
        >
          Trailer Type's max GVW wasn't a a Number!
          <Button color="inherit" size="small"></Button>
        </Alert>
      ) : null}
      {alertType === 3 ? (
        <Alert
          sx={{ padding: "10px" }}
          severity="error"
          onClose={() => setAlertType(0)}
        >
          You Have Empty Inputs that are still required!
          <Button color="inherit" size="small"></Button>
        </Alert>
      ) : null}
      {alertType === 4 ? (
        <Alert
          sx={{ padding: "10px" }}
          severity="warning"
          onClose={() => setAlertType(0)}
        >
          Something Went Wrong on the server. Please Contact the Administrator!
          <Button color="inherit" size="small"></Button>
        </Alert>
      ) : null}
      {alertType === 404 ? (
        <Alert
          sx={{ padding: "10px" }}
          severity="warning"
          onClose={() => setAlertType(0)}
        >
          Something Went Wrong on the server. Failed to Load in the products
          from the server!
          <Button color="inherit" size="small"></Button>
        </Alert>
      ) : null}
      {alertType === 201 ? (
        <Alert
          sx={{ padding: "10px" }}
          severity="success"
          onClose={() => setAlertType(0)}
        >
          Added Truck to Database!
          <Button color="inherit" size="small"></Button>
        </Alert>
      ) : null}
    </>
  );
}
export default AddTruckContent;
