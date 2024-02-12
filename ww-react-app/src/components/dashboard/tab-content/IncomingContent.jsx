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
import InTicket from "../../../classes/InTicket";
import { useTheme } from "@mui/material";

// TO DO: Takes input for reg plate , on pressing the checkButton, it calls confirmTruck(reg).
// if response = true, the enter tareweight box becomes visible and also the assign job select box will too. That box will collect it's list values by passing reg through (getOrdersCompatibleByTruckType).
// if the response to confirm truck = false i will just do a window alert that says truck not on database for now.

function IncomingContent() {
  const [reg, setReg] = useState("");
  const [freshReg, setFreshReg] = useState(false);
  const [job, setJob] = useState("");
  const [product, setProduct] = useState("Make a selection");
  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState("");
  const [jobAd1, setJobAd1] = useState(
    "Make a selection to view delivery information."
  );
  const [jobAd2, setJobAd2] = useState("");
  const [jobAdTown, setJobAdTown] = useState("");
  const [jobAdPostCode, setJobPostCode] = useState("");
  const [showFields, setShowFields] = useState(false); //input fields only show if truck exists or else prompts user to add the truck to the database.
  const [jobOptions, setJobOptions] = useState([]);
  const [tareWeight, setTareWeight] = useState(0);
  const [alertType, setAlertType] = useState(0);
  const [orderNumberString, setOrderNumberString] = useState("");

  const handleRegChange = (event) => {
    setReg(event.target.value);
    setFreshReg(true);
    setShowFields(false);
    setTareWeight(0);
    setAlertType(0);
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
    setJobAd1(selectedJob.deliveryAddress1);
    setJobAd2(selectedJob.deliveryAddress2);
    setJobAdTown(selectedJob.deliveryTown);
    setJobPostCode(selectedJob.deliveryPostCode);
    setOrderNumberString(selectedJob.orderNumber);
    setMessage(
      "Your Driver will recieve a paperless ticket with full details when weighed in."
    );
    setMessage2("Deliver To:");
  };

  const handleSubmit = async () => {
    if (tareWeight <= 0) {
      setAlertType(1);
      return;
    }
    if (isNaN(tareWeight)) {
      setAlertType(2);
      return;
    }
    if (job === "") {
      setAlertType(3);
      return;
    }

    const clerkId = localStorage.getItem("id");
    const location = localStorage.getItem("location");

    if (clerkId == null || location == null) {
      return setAlertType(401);
    }
    console.log("orderNumberString is :" + orderNumberString);

    const newInticket = new InTicket(
      reg,
      tareWeight,
      clerkId,
      location,
      orderNumberString
    );

    const save = await newInticket.createTicket();
    if (save.message === "Weigh in Successfull") {
      setAlertType(201);
      setShowFields(false);
      setReg("");
    } else {
      setAlertType(500);
    }
    console.log(save);
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
            orderNumber: order.orderNumber,
          }));
          setJobOptions(formattedOrders);
        }
      } else {
        setAlertType(404);
        console.log("Truck does not exist");
      }
    } catch (error) {
      setAlertType(500);
      console.error("Error checking truck:", error);
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
      <Typography variant="h3"> Weigh In </Typography>

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
            sx={inputFieldStyles}
          />
          {freshReg === true && <CheckButton onClick={checkTruck} />}

          {showFields === true && (
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
                sx={inputFieldStyles}
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

              <div
                style={{
                  border: "1px dashed",
                  borderColor: "lightgray",
                  padding: "10px",
                  borderRadius: "6px",
                }}
              >
                <Typography sx={{ fontWeight: "bold" }}>{message2}</Typography>
                <Typography>{jobAd1}</Typography>
                <Typography>{jobAd2}</Typography>
                <Typography>{jobAdTown}</Typography>
                <Typography>{jobAdPostCode}</Typography>
                <Typography sx={{ fontWeight: "bold", fontStyle: "italic" }}>
                  {message}
                </Typography>
              </div>
              <SubmitFormButton onClick={handleSubmit} />
            </>
          )}
          {alertType === 404 ? (
            <Alert
              sx={{ padding: "10px" }}
              severity="warning"
              onClose={() => setAlertType(0)}
            >
              Truck Not Found on Database! Please add it to your records
              (Actions / Manage Trucks / Add Truck)
            </Alert>
          ) : null}
          {alertType === 1 ? (
            <Alert
              sx={{ padding: "10px" }}
              severity="error"
              onClose={() => setAlertType(0)}
            >
              ERROR: Your Tare Weight must be greater than 0kg!
            </Alert>
          ) : null}
          {alertType === 2 ? (
            <Alert
              sx={{ padding: "10px" }}
              severity="error"
              onClose={() => setAlertType(0)}
            >
              ERROR: Your Tare Weight must be a number!
            </Alert>
          ) : null}
          {alertType === 3 ? (
            <Alert
              sx={{ padding: "10px" }}
              severity="warning"
              onClose={() => setAlertType(0)}
            >
              Please select a job
            </Alert>
          ) : null}
          {alertType === 500 ? (
            <Alert
              sx={{ padding: "10px" }}
              severity="error"
              onClose={() => setAlertType(0)}
            >
              ERROR: Difficulties Server Side! Please Contact your
              administrator!
            </Alert>
          ) : null}
          {alertType === 401 ? (
            <Alert
              sx={{ padding: "10px" }}
              severity="error"
              onClose={() => setAlertType(0)}
            >
              Un-authorised activity - Please Sign in to continue.
            </Alert>
          ) : null}
          {alertType === 201 ? (
            <Alert
              sx={{ padding: "10px" }}
              severity="success"
              onClose={() => setAlertType(0)}
            >
              Successfully Weighed In ! You may now close this tab or Weigh in
              another truck...
            </Alert>
          ) : null}
        </div>
        <BasicWebcam />
      </div>
    </>
  );
}
export default IncomingContent;
