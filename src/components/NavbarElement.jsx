import React from "react";
import { NavLink } from "react-router-dom";

const NavbarElement = ({ to, children }) => {
    return (
        <NavLink
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 10px",
            }}
            to={to}
        >
            <h1>{children}</h1>
        </NavLink>
    );
};

export default NavbarElement;
