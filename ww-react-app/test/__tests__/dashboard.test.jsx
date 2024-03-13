import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "../test-utils";
import Dashboard from "../../src/components/dashboard/Dashbboard";

// Mock react-leaflet components
jest.mock("react-leaflet", () => ({
  MapContainer: () => <div data-testid="mockMapContainer"></div>,
  TileLayer: () => <div></div>,
  Marker: () => <div></div>,
  Popup: () => <div></div>,
}));

describe("DashBoard", () => {
  test("renders the background div correctly", () => {
    render(<Dashboard />);
    const backgroundDiv = screen.getByTestId("background");
    expect(backgroundDiv).toBeInTheDocument();
  });

  test("renders the paper content correctly", () => {
    render(<Dashboard />);
    const backgroundDiv = screen.getByTestId("background-paper-content");
    expect(backgroundDiv).toBeInTheDocument();
  });

  test("renders the Top Appbar correctly", () => {
    render(<Dashboard />);
    const backgroundDiv = screen.getByTestId("dashboard-top");
    expect(backgroundDiv).toBeInTheDocument();
  });

  test("renders the Bottom Appbar correctly", () => {
    render(<Dashboard />);
    const backgroundDiv = screen.getByTestId("dashboard-bottom");
    expect(backgroundDiv).toBeInTheDocument();
  });

  test("renders the sidebar correctly", () => {
    render(<Dashboard />);
    const backgroundDiv = screen.getByTestId("dashboard-sidebar");
    expect(backgroundDiv).toBeInTheDocument();
  });
});
