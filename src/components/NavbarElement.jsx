import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const NavbarElement = ({ to, children, onClick }) => {
    const [color, setColor] = useState("black");

    return (
        <NavLink
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 10px",
                textDecoration: "none",
                color: color,
            }}
            to={to}
            onClick={onClick}
            onMouseEnter={() => setColor("blue")}
            onMouseLeave={() => setColor("black")}
            onClickCapture={() => setColor("lightblue")}
        >
            <h1>{children}</h1>
        </NavLink>
    );
};

export default NavbarElement;
