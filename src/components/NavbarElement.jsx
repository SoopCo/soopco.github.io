import React from "react";

const NavbarElement = ({ children }) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 10px",
            }}
        >
            <h1>{children}</h1>
        </div>
    );
};

export default NavbarElement;
