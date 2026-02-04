import { useState, type ReactNode } from "react";
import { AuthContext, type AuthContextState } from "./context";

interface AuthProviderProps {
  children?: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [key, setKey] = useState<AuthContextState["key"]>();

  const login: AuthContextState["login"] = async () => {
    setKey({ expiry: "", token: "" });
  };

  const logout: AuthContextState["logout"] = () => {};

  return (
    <AuthContext.Provider
      value={{ key, isAuthenticated: Boolean(key), login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
