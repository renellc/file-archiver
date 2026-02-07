import { createContext, useContext } from "react";

type AuthKey = {
  token: string;
  expiry: string;
};

export interface AuthContextState {
  key?: AuthKey;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextState>({
  isAuthenticated: false,
  isLoading: false,
  login: async () => {},
  logout: () => {},
});

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext used outside of AuthProvider");
  }

  return context;
};
