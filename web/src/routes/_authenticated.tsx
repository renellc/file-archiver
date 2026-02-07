import { useAuthContext } from "@/context/AuthContext/context";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  component: () => <RouteComponent />,
});

const RouteComponent = () => {
  const auth = useAuthContext();

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" search={{ redirect: location.href }} />;
  }

  return <Outlet />;
};
