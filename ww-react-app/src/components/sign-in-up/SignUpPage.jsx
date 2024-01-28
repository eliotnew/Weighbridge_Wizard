import React from "react";
import pic from "../../img_Assets/littleWizard.png";
import SignUpForm from "./SignUpForm";
import LPappbar from "../landing-page/LPappbar";

function SignUpPage(){
    return(
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
          <LPappbar/>
  
          <div
            id="content"
            style={{
              marginTop: "50px",
              backgroundColor: "white",
              maxWidth: "60vw",
              maxHeight: "90vh",
              borderRadius: "25px",
              textAlign: "center",
              margin: "auto",
            }}
          >
            <SignUpForm/>
          </div>
        </div>
      </>
    )
}

export default SignUpPage;