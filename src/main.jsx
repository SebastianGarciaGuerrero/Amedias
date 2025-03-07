// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AmediasProvider } from "./context/AmediasContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <AmediasProvider>
        <App />
      </AmediasProvider>
    </StrictMode>
  </BrowserRouter>
);
