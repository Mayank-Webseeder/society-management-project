import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { VendorProvider } from "./context/VendorContext.jsx";
import { JobProvider } from "./context/JobContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <VendorProvider>
        <JobProvider>
          <App />
        </JobProvider>
      </VendorProvider>
    </BrowserRouter>
  </StrictMode>
);
