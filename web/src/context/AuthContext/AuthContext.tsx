import { useEffect, useState, type ReactNode } from "react";
import { AuthContext, type AuthContextState } from "./context";
import { useMutation } from "@tanstack/react-query";
import * as z from "zod";

const LS_AUTH_KEY_TOKEN = "fa_auth_token";
const LS_AUTH_KEY_EXPIRY = "fa_auth_token_expiry";

const useLoginResponseSchema = z.object({
  token: z.string(),
  expiry: z.string(),
});

type UseLoginResponse = z.infer<typeof useLoginResponseSchema>;

const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (credentials: {
      username: string;
      password: string;
    }): Promise<UseLoginResponse | null> => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const validated = useLoginResponseSchema.safeParse(await res.json());

      if (!validated.success) {
        return null;
      }

      const data = validated.data;

      localStorage.setItem(LS_AUTH_KEY_TOKEN, data.token);
      localStorage.setItem(LS_AUTH_KEY_EXPIRY, data.expiry);

      return validated.data;
    },
  });
};

interface AuthProviderProps {
  children?: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [key, setKey] = useState<AuthContextState["key"]>();
  const [isLoading, setIsLoading] = useState(false);

  const loginMutation = useLogin();

  const login: AuthContextState["login"] = async (data) => {
    setIsLoading(true);

    const authKey = await loginMutation.mutateAsync(data);

    if (authKey) {
      setKey(authKey);
    }

    setIsLoading(false);
  };

  const logout: AuthContextState["logout"] = () => {
    localStorage.removeItem(LS_AUTH_KEY_TOKEN);
    localStorage.removeItem(LS_AUTH_KEY_EXPIRY);
    setKey(undefined);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);

    const token = localStorage.getItem(LS_AUTH_KEY_TOKEN);
    const expiry = localStorage.getItem(LS_AUTH_KEY_EXPIRY);

    if (token === null || expiry === null) {
      setIsLoading(false);
      return;
    }

    const now = new Date().toISOString();

    // technically this is not secure since anyone who has access to localStorage can edit this to be a date to bypass
    // the expiration check, but if that happens it's pretty much GG anyway.
    //
    // and we should be safe from XSS attacks since we'll be hosting this on a private network anyway
    const isExpiryValid = !isNaN(Date.parse(expiry));

    // we can directly compare these two since they'll both be ISO strings
    if (isExpiryValid && now > expiry) {
      setIsLoading(false);
      return;
    }

    setKey({ token, expiry });
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ key, isAuthenticated: Boolean(key), isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
