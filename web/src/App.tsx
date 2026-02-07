import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { AuthProvider } from "./context/AuthContext/AuthContext";
import { useAuthContext } from "./context/AuthContext/context";
import { QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { queryClient } from "./query";

function InnerApp() {
  const auth = useAuthContext();
  const client = useQueryClient();

  return (
    <RouterProvider router={router} context={{ auth, queryClient: client }} />
  );
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </QueryClientProvider>
  );
}
