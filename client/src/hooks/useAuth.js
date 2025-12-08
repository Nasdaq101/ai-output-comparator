import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);

  // Load on startup
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (user, tokens) => {
    localStorage.setItem("user", JSON.stringify(user));
    if (tokens?.access) {
      localStorage.setItem("token", tokens.access);
    }
    if (tokens?.refresh) {
      localStorage.setItem("refresh", tokens.refresh);
    }
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  return { user, login, logout };
}
