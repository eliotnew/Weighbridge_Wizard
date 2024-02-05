import React from "react";
import pic from "../../img_Assets/WizardFarAway.png";
import SignInForm from "./SignInForm";
import LPappbar from "../landing-page/LPappbar";

function SignInPage() {
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
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)", //for safari compatibility
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
            maxWidth: "60vw",
            maxHeight: "90vh",
            textAlign: "center",
            margin: "auto",
          }}
        >
          <SignInForm />
        </div>
      </div>
    </>
  );
}

export default SignInPage;
