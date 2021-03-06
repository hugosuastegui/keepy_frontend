import React, { createContext, useState, useEffect } from "react";
import { getCurrentUser } from "./services/auth";

export const Context = createContext();

export default function OurProvider({ children }) {
  const [user, setuser] = useState(null);
  const [project, setProject] = useState(null);

  function setCtxProject(project) {
    setProject(project);
  }

  function clearCtxProject() {
    setProject(null);
  }

  function loginUser(user) {
    setuser(user);
  }
  function clearCtxUser() {
    setuser(null);
  }

  useEffect(() => {
    async function getSession() {
      const { user } = await getCurrentUser();
      if (user?.email) {
        loginUser(user);
      }
    }
    getSession();
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        loginUser,
        clearCtxUser,
        project,
        setCtxProject,
        clearCtxProject,
      }}
    >
      {children}
    </Context.Provider>
  );
}
