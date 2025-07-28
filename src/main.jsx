import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { VendorProvider } from "./context/VendorContext.jsx";
import { JobProvider } from "./context/JobContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
<StrictMode>
  <BrowserRouter>
    <AuthProvider>        
      <VendorProvider>
        <JobProvider>
          <App />
        </JobProvider>
      </VendorProvider>
    </AuthProvider>
  </BrowserRouter>
</StrictMode>

);
