import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children, adminOnly = false }) {
  const location = useLocation();

  const token = localStorage.getItem("token");
  const role = (localStorage.getItem("role") || "").trim().toUpperCase();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && role !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;