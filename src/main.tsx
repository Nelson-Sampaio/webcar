import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { router } from "./App";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./contexts/AuthContext";


import 'swiper/css';
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster position="top-right" reverseOrder={false} />
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);