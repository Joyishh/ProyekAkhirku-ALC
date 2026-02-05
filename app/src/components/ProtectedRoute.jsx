import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  // Kita ambil data user yang tadi disimpan di LoginModal
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role_id)) {
    return <Navigate to="/" replace />; 
  }

  return <Outlet />;
};

export default ProtectedRoute;