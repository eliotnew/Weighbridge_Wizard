import React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import createAccount from "../../functions/account_functions/createAccount";
import saveLocalAccountDetails from "../../functions/account_functions/saveLocalAccountDetails";
import { useLoggedInContext } from "../../loggedInContext";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import evaluatePassword from "../../functions/account_functions/evaluatePassword";
import evaluatePassLength from "../../functions/account_functions/evaluatePassLength";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

function SignUpForm() {
  const [alertType, setAlertType] = useState(0);
  const [location, setLocation] = useState("");
  const { login } = useLoggedInContext();
  const theme = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const password1 = data.get("password1");
    const password2 = data.get("password2");
    const forename = data.get("firstName");
    const surname = data.get("lastName");
    const email = data.get("email");
    if (email === null || email === "") {
      setAlertType(6); //inform the user that you need an email address
      return;
    }

    if (forename === null || surname === null) {
      setAlertType(7); //inform user that passwords dont match
      return;
    }

    if (password1 !== password2) {
      setAlertType(3); //inform user that passwords dont match
      return;
    }

    const isLong = evaluatePassLength(password1);
    if (!isLong) {
      setAlertType(8); //inform user that password is not good enough
      return;
    }

    const isStrong = evaluatePassword(password1);

    if (!isStrong) {
      setAlertType(4); //inform user that password is not good enough
      return;
    }

    if (location == "") {
      setAlertType(9);
      return;
    }

    const jsonObj = {
      firstName: forename,
      lastName: surname,
      email: email,
      password: password1,
      location: location,
    };
    try {
      const successAccount = await createAccount(jsonObj);
      if (
        successAccount &&
        successAccount.message === "Account created successfully"
      ) {
        saveLocalAccountDetails(successAccount);
        //login();
        navigate("/dashboard");
      } else if (
        successAccount &&
        successAccount.message ===
          "An account with this email already exists, did you mean to sign IN instead?"
      ) {
        setAlertType(5);
      } else {
        window.alert(
          "Something went wrong , please contact the page administrator"
        );
      }
    } catch {
      setAlertType(2);
    }
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
        <Avatar sx={{ m: 1, bgcolor: theme.palette.primary.contrastText }}>
          <FontAwesomeIcon
            icon={faRightToBracket}
            flip
            style={{
              color: theme.palette.secondary.main,
              animationDuration: "8s",
            }}
          />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
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
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password1"
                label="Password"
                type="password"
                id="password1"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password2"
                label="Enter Password Again"
                type="password"
                id="password2"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="location-label">
                  WeighBridge Location:
                </InputLabel>
                <Select
                  labelId="location-label"
                  id="location"
                  name="location"
                  value={location}
                  label="WeighBridge Location:"
                  onChange={(event) => setLocation(event.target.value)}
                  required
                >
                  <MenuItem value={"Camelot"}>Camelot</MenuItem>
                  <MenuItem value={"Plymouth"}>Plymouth</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item xs={12}>
              <Link to="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
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
        {alertType === 5 ? (
          <Alert
            sx={{ padding: "10px" }}
            severity="error"
            onClose={() => setAlertType(0)}
          >
            Oops! An account already exists with that email address, did you
            mean to Sign In?{" "}
            <Button
              color="inherit"
              size="small"
              onClick={() => navigate("/signin")}
            >
              Yes
            </Button>
          </Alert>
        ) : null}
        {alertType === 6 ? (
          <Alert
            sx={{ padding: "10px", my: "" }}
            severity="error"
            onClose={() => setAlertType(0)}
          >
            You must sign up with an email address!
          </Alert>
        ) : null}
        {alertType === 7 ? (
          <Alert
            sx={{ padding: "10px", my: "" }}
            severity="error"
            onClose={() => setAlertType(0)}
          >
            You must sign up with your first and last names!
          </Alert>
        ) : null}
        {alertType === 8 ? (
          <Alert
            sx={{ padding: "10px" }}
            severity="warning"
            onClose={() => setAlertType(0)}
          >
            Password too short! Please input a password that is more than 10
            characters long!
          </Alert>
        ) : null}
        {alertType === 9 ? (
          <Alert
            sx={{ padding: "10px" }}
            severity="warning"
            onClose={() => setAlertType(0)}
          >
            You must select the location of your WeighBridge!
          </Alert>
        ) : null}
      </>
    </Container>
  );
}

export default SignUpForm;
