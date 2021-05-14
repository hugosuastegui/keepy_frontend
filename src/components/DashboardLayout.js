import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "../index.css";
// import {
//   UploadOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
// } from "@ant-design/icons";

import { Context } from "../context";
import { logout } from "../services/auth";

function DashboardLayout({ children }) {
  const { clearCtxUser, user, project } = useContext(Context);
  const history = useHistory();

  const logoutProcess = async () => {
    await logout();
    clearCtxUser(user);
    history.push("/");
  };

  return (
    <div className="layout">
      {user && (
        <navbar className="sidenav">
          <Link className="selectedProject" to="/projects">
            {project ? project.name : "My Projects"}
          </Link>
          {project && (
            <>
              <Link to="/brief">Brief</Link>
              <Link to="/ledger">Ledger</Link>
              <Link to="/ledger">KPI</Link>
            </>
          )}
          <Link to="/profile">Profile</Link>
          <Link to="/" onClick={() => logoutProcess()}>
            Logout
          </Link>
        </navbar>
      )}
      <div className="main">{children}</div>
    </div>
  );
}

export default DashboardLayout;
