import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const styles = {
  textDecoration: "none",
  color: "white",
};

function LayoutApp({ children }) {
  return (
    <div>
      <div className="navbar">
        <img className="logo" src="../../public/logo512.png" alt="Logo" />
        <nav className="menu">
          <ul>
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
          </ul>
        </nav>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default LayoutApp;
