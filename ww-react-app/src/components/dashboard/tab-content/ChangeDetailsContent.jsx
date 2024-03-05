import React from "react";
import { useState } from "react";
import editAccount from "../../../functions/account_functions/editAccount";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Divider,
  Grid,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import saveLocalAccountDetails from "../../../functions/account_functions/saveLocalAccountDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@mui/material";

function AccountEdit() {
  const [alertType, setAlertType] = useState(0);
  const userForename = localStorage.getItem("firstName");
  const userSurname = localStorage.getItem("lastName");
  const useremail = localStorage.getItem("email");
  const userId = localStorage.getItem("id");
  const location = localStorage.getItem("location");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const jsonObj = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      userId: userId,
      location: location,
    };
    console.log(jsonObj);

    try {
      const successAccount = await editAccount(jsonObj);
      if (
        successAccount &&
        successAccount.message === "Account updated successfully"
      ) {
        console.log(successAccount);
        console.log(successAccount.message);
        setAlertType(200);
        saveLocalAccountDetails(successAccount);
      } else if (
        successAccount &&
        successAccount.message === "Invalid Password"
      ) {
        setAlertType(1);
      } else {
        setAlertType(2);
      }
    } catch {
      setAlertType(0);
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: theme.palette.primary.main }}>
          <FontAwesomeIcon
            icon={faIdCard}
            style={{ color: theme.palette.primary.contrastText }}
          />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit Account
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                defaultValue={userForename}
                sx={inputFieldStyles}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                defaultValue={userSurname}
                sx={inputFieldStyles}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                defaultValue={useremail}
                sx={inputFieldStyles}
              />
            </Grid>

            <Divider sx={{ m: 2 }} />

            <Grid item xs={12}>
              <Divider sx={{ m: 2 }}>
                {" "}
                Please enter your password to submit changes:
              </Divider>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                sx={inputFieldStyles}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit Changes
          </Button>
        </Box>
      </Box>
      <br />

      <>
        {alertType === 1 ? (
          <Alert
            sx={{ padding: "10px" }}
            severity="error"
            onClose={() => setAlertType(0)}
          >
            Invalid Password!
          </Alert>
        ) : null}
        {alertType === 2 ? (
          <Alert
            sx={{ padding: "10px" }}
            severity="warning"
            onClose={() => setAlertType(0)}
          >
            Something Went wrong on our side, please contact the Administrator!{" "}
          </Alert>
        ) : null}
        {alertType === 200 ? (
          <Alert
            sx={{ padding: "10px" }}
            severity="success"
            onClose={() => setAlertType(0)}
          >
            Details Updated!
          </Alert>
        ) : null}
      </>
    </Container>
  );
}
export default AccountEdit;
