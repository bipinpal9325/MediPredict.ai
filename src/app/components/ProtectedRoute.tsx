import { useAuth } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const { isLoaded, isSignedIn } = useAuth();

  // 1. Show a loading state while Clerk checks if the user is logged in
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // 2. If the user is NOT signed in, redirect them to the Auth page
  if (!isSignedIn) {
    return <Navigate to="/auth" replace />;
  }

  // 3. If signed in, render the requested page (The "Outlet")
  return <Outlet />;
}