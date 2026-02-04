import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { useAuthContext } from "./context/AuthContext/hooks";
import { AuthProvider } from "./context/AuthContext/AuthContext";

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
