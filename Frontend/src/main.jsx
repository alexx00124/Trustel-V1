import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Routes/Home";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Dashboard from "./Routes/Dashboard";
import { AuthProvider } from "./Auth/AuthProvider";



const router = createBrowserRouter([
    {
    path: "/",
    element: <Home />, 
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>)