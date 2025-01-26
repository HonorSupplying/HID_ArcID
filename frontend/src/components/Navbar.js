import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="nav">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/add">Adding</NavLink>
      <NavLink to="/search">Searching</NavLink>
    </nav>
  );
};

export default Navbar;
