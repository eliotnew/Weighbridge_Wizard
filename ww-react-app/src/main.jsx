import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { LoggedInContextProvider } from "./loggedInContext.jsx";
import "./index.css";
/**
 * This document is comparable to the "index.js" found in a create-react app (this is a vite react app)
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
        <LoggedInContextProvider>
          <App />
        </LoggedInContextProvider> 
    </BrowserRouter>
  </React.StrictMode>
);
