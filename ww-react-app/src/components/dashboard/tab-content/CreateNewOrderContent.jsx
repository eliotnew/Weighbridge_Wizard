import React, { useState } from "react";
import { Typography, TextField, Button, Box } from "@mui/material";
import createOrder from "../../../functions/order_functions/createOrder";
import SubmitFormButton from "../../basicUI/SubmitFormButton";

function CreateNewOrderContent() {
  const [company, setCompany] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [deliveryAddress1, setDeliveryAddress1] = useState("");
  const [deliveryAddress2, setDeliveryAddress2] = useState("");
  const [deliveryTown, setDeliveryTown] = useState("");
  const [deliveryPostCode, setDeliveryPostCode] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  //make it set the values from the form before logic.

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      console.log("all fields must be filled in!");
    } else {
      try {
        const response = await createOrder(jsonObj);
        console.log(response);
        // Handle response (e.g., display a success message, clear form, etc.)
      } catch (error) {
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
          id="company"
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
            id="product"
            size="small"
          />

          <TextField
            margin="normal"
            required
            label="Quantity (kg):"
            variant="outlined"
            id="quantity"
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
          id="ad1"
          size="small"
        />

        <TextField
          fullWidth
          margin="dense"
          label="Address Line 2 (Optional):"
          variant="outlined"
          id="ad2"
          size="small"
        />

        <TextField
          required
          fullWidth
          margin="dense"
          label="City/Town:"
          variant="outlined"
          id="product"
          size="small"
        />

        <TextField
          required
          fullWidth
          margin="dense"
          label="Postcode:"
          variant="outlined"
          id="product"
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
          id="phone"
          size="small"
        />

        <TextField
          margin="dense"
          required
          fullWidth
          label="e-mail Address:"
          variant="outlined"
          id="email"
          size="small"
        />
        <SubmitFormButton />
      </Box>
    </>
  );
}
export default CreateNewOrderContent;
