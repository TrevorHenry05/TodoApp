import React from "react";
import { Link } from "react-router-dom";

function NavBar({ onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Todos
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/settings">
              Settings
            </Link>
          </li>
          <li className="nav-item">
            <button className="nav-link btn btn-light" onClick={onLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
