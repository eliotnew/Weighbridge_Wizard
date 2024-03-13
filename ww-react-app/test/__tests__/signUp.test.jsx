import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "../test-utils";
import SignUpPage from "../../src/components/sign-in-up/SignUpPage";

describe("SignupPage", () => {
  test("renders the background div correctly", () => {
    render(<SignUpPage />);
    const backgroundDiv = screen.getByTestId("background");
    expect(backgroundDiv).toBeInTheDocument();
  });

  it("contains the required input fields", () => {
    render(<SignUpPage />);

    const emailInput = screen.getByTestId("emailInput");
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByTestId("passwordInput1");
    expect(passwordInput).toBeInTheDocument();
    const passwordInput2 = screen.getByTestId("passwordInput2");
    expect(passwordInput2).toBeInTheDocument();
  });

  it("contains the signUp Button", () => {
    render(<SignUpPage />);

    const button = screen.getByTestId("signUpButton");
    expect(button).toBeInTheDocument();
  });
});
