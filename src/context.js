import React, { createContext, useState, useEffect } from "react";
import { getCurrentUser } from "./services/auth";

export const Context = createContext();

export default function OurProvider({ children }) {
  const [user, setuser] = useState(null);

  async function getSession() {
    const { user } = await getCurrentUser();
    console.log(user);
    if (user?.email) {
      loginUser(user);
    }
  }

  useEffect(() => {
    getSession();
  }, []);

  function loginUser(user) {
    setuser(user);
  }
  function clearCtxUser() {
    setuser(null);
  }

  return (
    <Context.Provider
      value={{
        user,
        loginUser,
        clearCtxUser,
      }}
    >
      {children}
    </Context.Provider>
  );
}
