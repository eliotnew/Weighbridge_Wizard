import React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import verifyAccount from "../functionality/verifyAccount";
// import saveAccToLS from "../functionality/saveAccToLS";
import { useLoggedInContext } from "../../loggedInContext";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { useTheme } from "@mui/material";



function SignInForm() {
  const [alertType, setAlertType] = useState(0);
  const { login } = useLoggedInContext();
  const navigate = useNavigate();
  const theme = useTheme();
  const blue = theme.palette.primary.contrastText;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    if (email === "" || email === null) {
      setAlertType(2);
      return;
    }
    if (password === "" || password === null) {
      setAlertType(3);
      return;
    }

    // const jsonObj = {
    //   email: data.get("email"),
    //   password: data.get("password"),
    // };

    // try {
    //   const result = await verifyAccount(jsonObj);
    //   if (result && result.message === "Login successful") {
    //     saveAccToLS(result);
    //     login();
    //     navigate("/account");
    //   } else if (result && result.message === "Invalid password") {
    //     setAlertType(401);
    //     //something happens
    //   } else if (
    //     result &&
    //     result.message ===
    //       "Account does not exist, did you mean to sign up instead?"
    //   ) {
    //     setAlertType(404);
    //     //something happens
    //   } else {
    //     window.alert(
    //       "Something went wrong , please contact the page administrator"
    //     );
    //   }
    // } catch {
    //   //error alert?
    // }
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
        <Avatar sx={{ m: 1, bgcolor: blue}}>
        <FontAwesomeIcon
            icon={faRightToBracket}
            beatFade
            style={{  }}
          />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <>
            {alertType === 401 ? (
              <Alert
                sx={{ padding: "10px" }}
                severity="error"
                onClose={() => setAlertType(0)}
              >
                Account Exists with this email address but Invalid Password!
              </Alert>
            ) : null}
            {alertType === 404 ? (
              <Alert
                sx={{ padding: "10px" }}
                severity="warning"
                onClose={() => setAlertType(0)}
              >
                No accounts Exist with this email address, Did you mean to sign
                UP?{" "}
                <Button
                  color="inherit"
                  size="small"
                  onClick={() => navigate("/signup")}
                >
                  Yes
                </Button>
              </Alert>
            ) : null}
            {alertType === 2 ? (
              <Alert
                sx={{ padding: "10px" }}
                severity="warning"
                onClose={() => setAlertType(0)}
              >
                Please Enter a valid email address{" "}
                <Button color="inherit" size="small"></Button>
              </Alert>
            ) : null}
            {alertType === 3 ? (
              <Alert
                sx={{ padding: "10px" }}
                severity="warning"
                onClose={() => setAlertType(0)}
              >
                Please Enter a valid password{" "}
                <Button color="inherit" size="small"></Button>
              </Alert>
            ) : null}
          </>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          <Link to="/signup" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
export default SignInForm;