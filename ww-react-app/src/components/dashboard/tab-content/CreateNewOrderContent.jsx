import React, { useState } from "react";
import { Typography, TextField, Button, Box, Alert } from "@mui/material";
import createOrder from "../../../functions/order_functions/createOrder";
import SubmitFormButton from "../../basicUI/SubmitFormButton";

function CreateNewOrderContent() {
  const [alertType, setAlertType] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const company = data.get("company");
    const product = data.get("product");
    const quantity = data.get("quantity");
    const deliveryAddress1 = data.get("ad1");
    const deliveryAddress2 = data.get("ad2");
    const deliveryTown = data.get("deliveryTown");
    const deliveryPostCode = data.get("postcode");
    const contactPhone = data.get("phone");
    const contactEmail = data.get("email");

    const jsonObj = {
      company: company,
      product: product,
      quantity: Number(quantity),
      deliveryAddress1: deliveryAddress1,
      deliveryAddress2: deliveryAddress2,
      deliveryTown: deliveryTown,
      deliveryPostCode: deliveryPostCode,
      contactPhone: Number(contactPhone),
      contactEmail: contactEmail,
    };

    console.log(jsonObj);

    //Check there are no empty inputs, but deliveryAddress2 is optional.
    let filledIn = true;
    for (const key in jsonObj) {
      console.log(key, jsonObj[key]);
      if (key === "deliveryAddress2") {
        continue;
      }
      const value = jsonObj[key];
      if (value === "" || value === undefined) {
        filledIn = false;
        break;
      }
    }

    if (!filledIn) {
      setAlertType(3);
    } else {
      try {
        if (isNaN(parseFloat(quantity))) {
          setAlertType(1);
          return;
        }
        if (isNaN(parseFloat(contactPhone))) {
          setAlertType(2);
          return;
        }
        const response = await createOrder(jsonObj);
        console.log(response);
        // Handle response (e.g., display a success message, clear form, etc.)
      } catch (error) {
        setAlertType(4);
        console.error("Failed to create order:", error);
      }
    }
  };

  return (
    <>
      <Typography variant="h3"> Create New Order </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Company Name:"
          variant="outlined"
          name="company"
          size="small"
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            margin="normal"
            required
            label="Product:"
            variant="outlined"
            name="product"
            size="small"
          />

          <TextField
            margin="normal"
            required
            label="Quantity (kg):"
            variant="outlined"
            name="quantity"
            size="small"
          />
        </div>
        <Typography variant="h6" sx={{ marginTop: "10px" }}>
          Delivering To:
        </Typography>

        <TextField
          required
          fullWidth
          margin="dense"
          label="Address Line 1:"
          variant="outlined"
          name="ad1"
          size="small"
        />

        <TextField
          fullWidth
          margin="dense"
          label="Address Line 2 (Optional):"
          variant="outlined"
          name="ad2"
          size="small"
        />

        <TextField
          required
          fullWidth
          margin="dense"
          label="City/Town:"
          variant="outlined"
          name="deliveryTown"
          size="small"
        />

        <TextField
          required
          fullWidth
          margin="dense"
          label="Postcode:"
          variant="outlined"
          name="postcode"
          size="small"
        />

        <Typography variant="h6" sx={{ marginTop: "10px" }}>
          Contact Details:
        </Typography>

        <TextField
          margin="dense"
          fullWidth
          label="Phone Number:"
          variant="outlined"
          name="phone"
          size="small"
        />

        <TextField
          margin="dense"
          required
          fullWidth
          label="e-mail Address:"
          variant="outlined"
          name="email"
          size="small"
        />
        <SubmitFormButton />
      </Box>
      {alertType === 1 ? (
        <Alert
          sx={{ padding: "10px" }}
          severity="error"
          onClose={() => setAlertType(0)}
        >
          Quantity Field Must be a Number!
          <Button color="inherit" size="small"></Button>
        </Alert>
      ) : null}
      {alertType === 2 ? (
        <Alert
          sx={{ padding: "10px" }}
          severity="error"
          onClose={() => setAlertType(0)}
        >
          Phone Number Field Must be a Number!
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
    </>
  );
}
export default CreateNewOrderContent;
