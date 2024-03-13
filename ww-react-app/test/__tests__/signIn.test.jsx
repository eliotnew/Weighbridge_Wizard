import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "../test-utils";
import SignInPage from "../../src/components/sign-in-up/SignInPage";

describe("SignInPage", () => {
  test("renders the background div correctly", () => {
    render(<SignInPage />);
    const backgroundDiv = screen.getByTestId("background");
    expect(backgroundDiv).toBeInTheDocument();
  });

  it("contains the required input fields", () => {
    render(<SignInPage />);

    const emailInput = screen.getByTestId("emailInput");
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByTestId("passwordInput");
    expect(passwordInput).toBeInTheDocument();
  });

  it("contains the signIn Button", () => {
    render(<SignInPage />);

    const button = screen.getByTestId("signInButton");
    expect(button).toBeInTheDocument();
  });
});
