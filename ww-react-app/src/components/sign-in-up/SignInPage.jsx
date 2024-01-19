import React from "react";
//import littleWizard from "../../img_Assets/littleWizard";
import pic from "../../img_Assets/littleWizard.png";
import DashboardAppBar from "../dashboard/top-bar/DashboardAppBar";
import SignInForm from "./SignInForm";
//import desk from '../imgAssets/carosel3.jpg';

function SignInPage(){
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
          <DashboardAppBar />
  
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
            <SignInForm/>
          </div>
        </div>
      </>
    )
}

export default SignInPage;