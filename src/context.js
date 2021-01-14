import React, { createContext, useState } from "react";

export const Context = createContext();

export default function CtxProvider({ children }) {
  const [user, setUser] = useState(null);
  function loginUser(user) {
    setUser(user);
  }
  function logout() {
    setUser(null);
  }
  return (
    <CtxProvider value={(user, loginUser, logout)}>{children}</CtxProvider>
  );
}
