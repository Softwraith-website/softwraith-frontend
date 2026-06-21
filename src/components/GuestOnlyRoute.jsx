import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "./ui/Spinner";

/**
 * Redirect authenticated users away from auth pages (login, register).
 * Admins go to /admin, regular users go to /dashboard.
 */
export default function GuestOnlyRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (user) {
    return <Navigate to={user.role === "admin" || user.role === "superadmin" ? "/admin" : "/dashboard"} replace />;
  }

  return children;
}
