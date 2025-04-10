import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.jsx";
// import { AppWrapper } from "./components/common/PageMeta.js";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./context/AuthContex.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <App />
        <ToastContainer
          position="bottom-right"
          theme="colored"
          bodyClassName="toastBody"
        />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
