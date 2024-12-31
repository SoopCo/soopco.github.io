import React from "react";
import logo from "../images/logo.png";
import HeaderElement from "./HeaderElement";

const Header = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                height: "10vh",
                outline: "1px solid black",
                padding: "10px",
                backgroundColor: "white",
            }}
        >
            <img
                src={logo}
                alt="Battle Team Logo"
                className="logo"
                style={{ margin: "0 10px" }}
            />
            <HeaderElement>Home</HeaderElement>
            <HeaderElement>Characters</HeaderElement>
            <HeaderElement>Books</HeaderElement>
        </div>
    );
};

export default Header;
