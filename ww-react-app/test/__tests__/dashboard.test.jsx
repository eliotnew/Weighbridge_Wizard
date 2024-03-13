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
});
