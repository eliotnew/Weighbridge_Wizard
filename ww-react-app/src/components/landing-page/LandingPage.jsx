import React from "react";
import LPappbar from "./LPappbar";
import ToggleThemeButton from "../settings/ToggleThemeButton";

function LandingPage() {
  return (
    <>
      <LPappbar />
      <div>Hello from landing page!</div>
      <ToggleThemeButton />
    </>
  );
}
export default LandingPage;
