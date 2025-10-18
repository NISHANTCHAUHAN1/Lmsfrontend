import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/authContext/index.jsx";
import InstructorProvider from "./context/instructorContext/index.jsx";
import StudentProvider from "./context/studentContext/index.jsx";
import { Toaster } from "react-hot-toast";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <InstructorProvider>
        <StudentProvider>
          <App />
          <Toaster />
        </StudentProvider>
      </InstructorProvider>
    </AuthProvider>
  </BrowserRouter>
);
