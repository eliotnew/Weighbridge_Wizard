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
import Order from "../../../classes/Order";
import SubmitFormButton from "../../basicUI/SubmitFormButton";
import getAllProducts from "../../../functions/product_functions/getAllProducts";
import { useTheme } from "@mui/material";

function CreateNewOrderContent() {
  const [alertType, setAlertType] = useState(0);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [hideForm, setHideForm] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        setAlertType(404);
        console.error("Failed to fetch tickets:", error);
      }
    };
    fetchProducts();
  }, []);

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

    const newOrder = new Order(
      company,
      product,
      quantity,
      deliveryAddress1,
      deliveryAddress2,
      deliveryTown,
      deliveryPostCode,
      contactPhone,
      contactEmail
    );
    const orderJson = newOrder.toJSON();

    console.log(orderJson);

    //Check there are no empty inputs, but deliveryAddress2 is optional.
    let filledIn = true;
    for (const key in orderJson) {
      console.log(key, orderJson[key]);
      if (key === "deliveryAddress2") {
        continue;
      }
      const value = orderJson[key];
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
        const response = await newOrder.createOrder();
        console.log(response);
        if (response.message === "Order Created Successfully") {
          setAlertType(201);
          setHideForm(true);
        }
        // Handle response (e.g., display a success message, clear form, etc.)
      } catch (error) {
        setAlertType(4);
        console.error("Failed to create order:", error);
      }
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
      <Typography variant="h3"> Create New Order </Typography>
      {hideForm === false ? (
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Company Name:"
            variant="outlined"
            name="company"
            size="small"
            sx={inputFieldStyles}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FormControl fullWidth margin="normal">
              <InputLabel id="product-label">Product:</InputLabel>
              <Select
                labelId="product-label"
                id="product"
                name="product"
                size="small"
                value={selectedProduct}
                label="Product"
                onChange={(event) => setSelectedProduct(event.target.value)}
                required
              >
                {products.map((product, index) => (
                  <MenuItem key={index} value={product.product}>
                    {product.product}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              margin="normal"
              required
              label="Quantity (kg):"
              variant="outlined"
              name="quantity"
              size="small"
              sx={inputFieldStyles}
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
            sx={inputFieldStyles}
          />

          <TextField
            fullWidth
            margin="dense"
            label="Address Line 2 (Optional):"
            variant="outlined"
            name="ad2"
            size="small"
            sx={inputFieldStyles}
          />

          <TextField
            required
            fullWidth
            margin="dense"
            label="City/Town:"
            variant="outlined"
            name="deliveryTown"
            size="small"
            sx={inputFieldStyles}
          />

          <TextField
            required
            fullWidth
            margin="dense"
            label="Postcode:"
            variant="outlined"
            name="postcode"
            size="small"
            sx={inputFieldStyles}
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
            sx={inputFieldStyles}
          />

          <TextField
            margin="dense"
            required
            fullWidth
            label="e-mail Address:"
            variant="outlined"
            name="email"
            size="small"
            sx={inputFieldStyles}
          />
          <SubmitFormButton />
        </Box>
      ) : null}
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
          Successfully Created Order!
          <Button color="inherit" size="small"></Button>
        </Alert>
      ) : null}
    </>
  );
}
export default CreateNewOrderContent;
