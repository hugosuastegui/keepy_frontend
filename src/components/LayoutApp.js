import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
import logo from "../images/logo192.png";

const styles = {
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
        <nav>
          <ul>
            <li>
              <Link style={styles} to="/profile">
                Profile
              </Link>
            </li>
            <li>
              <Link style={styles} to="/logout">
                Logout
              </Link>
            </li>
            <li>
              <Link style={styles} to="/login">
                Log In
              </Link>
            </li>
            <li>
              <Link style={styles} to="/signup">
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="sidebar">
        <nav className="menu">
          <ul>
            <li>
              <Link style={styles} to="/projects">
                My Projects
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
          </ul>
        </nav>
      </div>
      <br />
      <div>{children}</div>
    </div>
  );
}

export default LayoutApp;
