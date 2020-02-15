import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLink.css";

const Navlink = props => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          All Users
        </NavLink>
      </li>
      <li>
        <NavLink to="/u1/places"> MY PLACES</NavLink>
      </li>
      <li>
        <NavLink to="/places/new"> NEW PLACE</NavLink>
      </li>
      <li>
        <NavLink to="/auth">AUTHENTICATE</NavLink>
      </li>
    </ul>
  );
};

export default Navlink;
