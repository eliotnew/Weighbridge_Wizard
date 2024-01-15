import React from "react";
import LPappbar from "./LPappbar";
import ToggleThemeButton from "../settings/ToggleThemeButton";

function LandingPage() {
  return (
    <>
      <div
        style={{
          backgroundColor: "beige",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <LPappbar />
        <div>Hello from landing page!</div>
        <ToggleThemeButton />
      </div>
    </>
  );
}
export default LandingPage;
