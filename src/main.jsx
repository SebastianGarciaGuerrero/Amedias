// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AmediasProvider } from "./context/AmediasContext.jsx";
import Provider from "@/components/ui/provider";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <AmediasProvider>
        <Provider>
          <App />
        </Provider>
      </AmediasProvider>
    </StrictMode>
  </BrowserRouter>
);
