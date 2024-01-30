import React from "react";
import { Typography, TextField } from "@mui/material";
import SubmitFormButton from "../../basicUI/SubmitFormButton";

function CreateNewOrderContent() {
  return (
    <>
      <Typography variant="h3"> Create New Order </Typography>
      <div>
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
          required
          fullWidth
          margin="dense"
          label="Address Line 2:"
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
      </div>
    </>
  );
}
export default CreateNewOrderContent;
