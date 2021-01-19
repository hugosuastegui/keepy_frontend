import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import logo from "../images/logo192.png";
import { Context } from "../context";

const styles = {
  color: "white",
};

function LayoutApp({ children }) {
  const { user } = useContext(Context);
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
            {!user ? (
              <>
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
              </>
            ) : (
              <></>
            )}
          </ul>
        </nav>
      </div>
      {user && (
        <div className="sidebar">
          <nav className="menu">
            <ul>
              <li>Project</li>
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
      )}
      <br />
      <div className="content">{children}</div>
    </div>
  );
}

export default LayoutApp;
