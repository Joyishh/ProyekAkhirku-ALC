import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (token && user.role_id) {
    if (user.role_id === 1) return <Navigate to="/dashboard/admin" replace />;
    if (user.role_id === 2) return <Navigate to="/dashboard/teacher" replace />;
    if (user.role_id === 3) return <Navigate to="/dashboard/student" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;