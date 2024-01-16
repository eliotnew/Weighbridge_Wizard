import React from "react";
import LPappbar from "./LPappbar";
import ToggleThemeButton from "../settings/ToggleThemeButton";
import ParallaxComponent from "./ParallaxComponent";

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
        <ParallaxComponent />
      </div>
    </>
  );
}
export default LandingPage;
