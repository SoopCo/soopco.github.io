import React from "react";
import logo from "../images/logo.png";
import NavbarElement from "./NavbarElement";

const Navbar = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                height: "10vh",
                outline: "1px solid black",
                padding: "10px",
                backgroundColor: "green",
            }}
        >
            <img
                src={logo}
                alt="Battle Team Logo"
                className="logo"
                style={{ margin: "0 10px" }}
            />
            <NavbarElement to="/">Home</NavbarElement>
            <NavbarElement to="characters">Characters</NavbarElement>
            <NavbarElement to="books">Books</NavbarElement>
        </div>
    );
};

export default Navbar;
