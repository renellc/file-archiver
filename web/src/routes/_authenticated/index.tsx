import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthContext/context";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/")({
  component: Index,
});

function Index() {
  const auth = useAuthContext();

  return (
    <div className="flex flex-col p-2 gap-2">
      <h3>Welcome Home!</h3>

      <Button onClick={auth.logout}>Logout</Button>
    </div>
  );
}
