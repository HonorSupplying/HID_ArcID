import React from "react";
import {NavLink} from 'react-router-dom';
import "../styles/Navbar.css";

const Navbar = () => {
    return (
    <nav className="nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/add">Add</NavLink>
        <NavLink to="/search">Search</NavLink>
    </nav>)
}

export default Navbar;