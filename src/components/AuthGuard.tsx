import { Navigate } from "react-router";
import { useAuth } from "../Supabase";
import { AuthGuardProps } from "../types/AuthGuardType";

function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/logind" replace />;

  return <>{children}</>;
}

export default AuthGuard;
