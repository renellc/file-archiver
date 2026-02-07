import { createFileRoute } from "@tanstack/react-router";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthContext/context";

const loginFormSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const auth = useAuthContext();

  const onLoginSubmit = async (data: LoginFormSchema) => {
    await auth.login(data);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <form
        className="flex flex-col gap-4 w-full sm:w-2/3 md:w-1/4 lg:w-1/6"
        onSubmit={form.handleSubmit(onLoginSubmit)}
      >
        <FieldGroup>
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="login-username">Username</FieldLabel>

                <Input
                  {...field}
                  id="login-username"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="login-password">Password</FieldLabel>

                <Input
                  {...field}
                  id="login-password"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  type="password"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
