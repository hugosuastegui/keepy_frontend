import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
import logo from "../images/logo192.png";

const styles = {
  textDecoration: "none",
  color: "white",
};

function LayoutApp({ children }) {
  return (
    <div>
      <div className="navbar">
        <img
          className="logo"
          src={logo}
          alt="Logo"
          style={{ height: "2rem" }}
        />
        <nav className="menu">
          <ul>
            <li>
              <Link style={styles} to="/projects">
                Projects
              </Link>
            </li>
            <li>
              <Link style={styles} to="/brief">
                Brief
              </Link>
            </li>
            <li>
              <Link style={styles} to="/ledger">
                Ledger
              </Link>
            </li>
            <li>
              <Link style={styles} to="/signup">
                Signup
              </Link>
            </li>
            <li>
              <Link style={styles} to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link style={styles} to="/">
                Logout
              </Link>
            </li>
            <li>
              <Link style={styles} to="/profile">
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <br />
      <div>{children}</div>
    </div>
  );
}

export default LayoutApp;
