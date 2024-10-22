import React from "react";
import { Navigate } from "react-router-dom";

// This is a protected route component that checks for JWT tokens.
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    // Redirect to login if token is not available
    return <Navigate to="/login" />;
  }

  // Render children components if authenticated
  return children;
}

export default ProtectedRoute;
