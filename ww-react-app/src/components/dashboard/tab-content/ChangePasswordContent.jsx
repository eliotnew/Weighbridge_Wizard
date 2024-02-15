import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Avatar,
  Divider,
  Grid,
  Container,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme } from "@mui/material";
import evaluatePassLength from "../../../functions/account_functions/evaluatePassLength";
import evaluatePasswordStrength from "../../../functions/account_functions/evaluatePassword";
import changePassWord from "../../../functions/account_functions/changePassword";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";

function ChangePasswordContent() {
  const [alertType, setAlertType] = useState(0);
  const userId = localStorage.getItem("id");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const oldPassword = data.get("password");
    const newPassword1 = data.get("newpassword1");
    const newPassword2 = data.get("newpassword2");

    if (newPassword1 !== newPassword2) {
      setAlertType(3);
      return;
    }

    const isStrong = evaluatePasswordStrength(newPassword1);

    if (!isStrong) {
      setAlertType(4);
      return;
    }

    const jsonObj = {
      password: oldPassword,
      newPassword: newPassword1,
      userId: userId,
    };
    console.log(jsonObj);

    try {
      const successAccount = await changePassWord(jsonObj); //use editaccount as a reference.
      if (
        successAccount &&
        successAccount.message === "Account password updated successfully"
      ) {
        setAlertType(200);
      } else if (
        successAccount &&
        successAccount.message === "Invalid Password"
      ) {
        setAlertType(1);
      } else {
        setAlertType(2);
      }
    } catch {
      setAlertType(2);
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
            icon={faKey}
            style={{ color: theme.palette.primary.contrastText }}
          />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Divider sx={{ m: 2 }}>Please enter your old password:</Divider>
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

              <Divider sx={{ m: 2 }}>Please enter your new password:</Divider>
              <TextField
                required
                fullWidth
                name="newpassword1"
                label="New Password"
                type="password"
                id="newpassword1"
                autoComplete="new-password"
                sx={inputFieldStyles}
              />

              <TextField
                required
                fullWidth
                name="newpassword2"
                label="New Password Again"
                type="password"
                id="newpassword2"
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
            Something Went wrong on our side, please contact the Administrator!
          </Alert>
        ) : null}
        {alertType === 3 ? (
          <Alert
            sx={{ padding: "10px" }}
            severity="error"
            onClose={() => setAlertType(0)}
          >
            ERROR! Your new password inputs must match!
          </Alert>
        ) : null}
        {alertType === 4 ? (
          <Alert
            sx={{ padding: "10px" }}
            severity="warning"
            onClose={() => setAlertType(0)}
          >
            Warning! Weak password detected, it should contain uppercase,
            lowercase, symbols and numbers to be secure.
          </Alert>
        ) : null}
        {alertType === 200 ? (
          <Alert
            sx={{ padding: "10px" }}
            severity="success"
            onClose={() => setAlertType(0)}
          >
            Success! Password Updated.
          </Alert>
        ) : null}
      </>
    </Container>
  );
}
export default ChangePasswordContent;
