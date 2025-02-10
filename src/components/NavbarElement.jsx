import React from "react";
import { NavLink } from "react-router-dom";

const NavbarElement = ({ to, children, onClick }) => {
    return (
        <NavLink
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 10px",
                textDecoration: "none",
                color: "black",
                hover: "blue",
                active: "light-blue",
            }}
            to={to}
            onClick={onClick}
        >
            <h1>{children}</h1>
        </NavLink>
    );
};

export default NavbarElement;
