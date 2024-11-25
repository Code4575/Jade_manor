import { createContext, useEffect, useState } from "react";
import { customFetch } from "./customFetch";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!user) {
      customFetch.get("api/v1/auth/profile").then(({ data }) => {
        setUser(data);
        setLoading(false);
      });
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
