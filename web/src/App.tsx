import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { AuthProvider } from "./context/AuthContext/AuthContext";
import { useAuthContext } from "./context/AuthContext/context";

function InnerApp() {
  const auth = useAuthContext();

  return <RouterProvider router={router} context={{ auth }} />;
}

export function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}
