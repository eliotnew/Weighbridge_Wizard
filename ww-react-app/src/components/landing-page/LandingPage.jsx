import React from "react";
import LPappbar from "./LPappbar";
import ParallaxComponent from "./ParallaxComponent";

function LandingPage() {
  return (
    <>
      <div
        data-testid="background"
        style={{
          backgroundColor: "beige",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <LPappbar data-testid="lpappbar" />
        <ParallaxComponent data-testid="parallaxcomponent" />
      </div>
    </>
  );
}
export default LandingPage;
