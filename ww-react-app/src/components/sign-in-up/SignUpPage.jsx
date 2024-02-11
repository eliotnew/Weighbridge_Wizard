import React from "react";
import pic from "../../img_Assets/WizardFarAway.png";
import SignUpForm from "./SignUpForm";
import LPappbar from "../landing-page/LPappbar";

function SignUpPage() {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${pic})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          width: "100%",
          minHeight: "100vh",
          minWidth: "100vw",
        }}
      >
        <LPappbar />

        <div
          id="content"
          style={{
            marginTop: "50px",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
            width: "fit-content",
            maxHeight: "90vh",
            borderRadius: "6px",
            textAlign: "center",
            margin: "auto",
          }}
        >
          <SignUpForm />
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
