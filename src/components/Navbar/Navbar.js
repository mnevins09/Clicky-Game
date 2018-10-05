import React from "react";
import "./Navbar.css";

const Navbar = props => <nav className="navbar fixed-top">Score: {props.score} | High Score: {props.highscore}</nav>;

export default Navbar;
