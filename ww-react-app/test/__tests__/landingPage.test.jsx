import React from "react";
import "@testing-library/jest-dom";
import LandingPage from "../../src/components/landing-page/LandingPage";
import { render, screen } from "../test-utils";

describe("Landing Page", () => {
  test("renders the background div correctly", () => {
    render(<LandingPage />);
    const backgroundDiv = screen.getByTestId("background");
    expect(backgroundDiv).toBeInTheDocument();
    expect(backgroundDiv).toHaveStyle({
      backgroundColor: "beige",
      height: "100vh",
      width: "100vw",
      overflow: "hidden",
      position: "relative",
    });
  });

  test("renders the appbar correctly", () => {
    render(<LandingPage />);
    const lpAppbarComponent = screen.getByTestId("lpappbar");
    expect(lpAppbarComponent).toBeInTheDocument();
  });
  test("renders the spring animated content correctly", () => {
    render(<LandingPage />);
    const parallaxComponent = screen.getByTestId("parallaxcomponent");
    expect(parallaxComponent).toBeInTheDocument();
  });
});
