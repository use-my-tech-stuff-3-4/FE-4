import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <NavLink className="nav-link" to={"/"}>
        Home
      </NavLink>
      <NavLink className="nav-link" to={"/Login"}>
        Login
      </NavLink>
      <NavLink className="nav-link" to={"/Register"}>
        Register
      </NavLink>
      <NavLink className="nav-link" to={"/Catalog"}>
        Catalog
      </NavLink>
    </div>
  );
};

export default Header;
