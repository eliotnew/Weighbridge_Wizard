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
import getOrdersCompatibleByTruckType from "../../../functions/order_functions/getOrdersCompatibleByTruckType";
import confirmTruck from "../../../functions/truck_functions/confirmTruck";

// TO DO: Takes input for reg plate , on pressing the checkButton, it calls confirmTruck(reg).
// if response = true, the enter tareweight box becomes visible and also the assign job select box will too. That box will collect it's list values by passing reg through (getOrdersCompatibleByTruckType).
// if the response to confirm truck = false i will just do a window alert that says truck not on database for now.

function IncomingContent() {
  const [reg, setReg] = useState("");
  const [freshReg, setFreshReg] = useState(false);
  const [job, setJob] = useState("Loading...");
  const [product, setProduct] = useState("Make a selection");
  const [jobAd1, setJobAd1] = useState("");
  const [jobAd2, setJobAd2] = useState("");
  const [jobAdTown, setJobAdTown] = useState("");
  const [jobAdPostCode, setJobPostCode] = useState("");
  const [showFields, setShowFields] = useState(false); //input fields only show if truck exists or else prompts user to add the truck to the database.
  const [jobOptions, setJobOptions] = useState([]);
  const [tareWeight, setTareWeight] = useState(0);

  const handleRegChange = (event) => {
    setReg(event.target.value);
    setFreshReg(true);
    console.log("reg set to: " + reg);
  };

  const handleTareWeightChange = (event) => {
    setTareWeight(event.target.value);
  };

  const handleJobChange = (event) => {
    //Updates the UI for the clerk to see more details about the job
    setJob(event.target.value);
    const selectedJob = jobOptions.find(
      (option) => option.label === event.target.value
    );
    setProduct(selectedJob.product);
    setJobAd1("Deliver to: " + selectedJob.deliveryAddress1);
    setJobAd2(selectedJob.deliveryAddress2);
    setJobAdTown(selectedJob.deliveryTown);
    setJobPostCode(selectedJob.deliveryPostCode);
  };

  const checkTruck = async () => {
    try {
      console.log("reg value is: " + reg);
      const data = await confirmTruck(reg);
      if (data.exists) {
        console.log("Truck exists, type:", data.truckType);
        setFreshReg(false);
        const orders = await getOrdersCompatibleByTruckType(data.truckType);
        if (orders) {
          setShowFields(true);
          // Transform the orders into a reasable format for <Select> component
          const formattedOrders = orders.map((order) => ({
            label: `${order.product} for ${order.orderNumber}`, // Format the label as "Product for OrderNumber"
            value: order.orderNumber, // Use the orderNumber as a unique value
            product: order.product,
            deliveryAddress1: order.deliveryAddress1,
            deliveryAddress2: order.deliveryAddress2,
            deliveryTown: order.deliveryTown,
            deliveryPostCode: order.deliveryPostCode,
          }));
          setJobOptions(formattedOrders);
        }
      } else {
        console.log("Truck does not exist");
      }
    } catch (error) {
      console.error("Error checking truck:", error);
    }
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
          <>
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
            <BasicWebcam />
          </>

          {freshReg === true ? <CheckButton onClick={checkTruck} /> : null}
        </div>
        <div>
          {showFields === true ? (
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

              <Typography>{jobAd1} </Typography>
              <Typography> {jobAd2} </Typography>
              <Typography> {jobAdTown} </Typography>
              <Typography> {jobAdPostCode} </Typography>
              <SubmitFormButton />
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
export default IncomingContent;
