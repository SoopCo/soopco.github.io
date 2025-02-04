import React, { useContext, useEffect, useState } from "react";
import logo from "../images/logo.png";
import NavbarElement from "./NavbarElement";
import { AuthContext } from "../context/AuthContext";
import { getUserData } from "../api/FirebaseCloud";

const Navbar = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (auth !== null) {
            // TODO: Make it so only admins can access
            const fetchIsAdmin = async () => {
                const admin = (await getUserData(auth.username)).admin;
                setIsAdmin(admin);
            };
            fetchIsAdmin();
        }
    }, [auth]);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                height: "10vh",
                padding: "10px",
                backgroundColor: "gray",
            }}
        >
            <img
                src={logo}
                alt="Battle Team Logo"
                className="logo"
                style={{ margin: "0 10px" }}
            />
            <NavbarElement to="/">Home</NavbarElement>
            {auth && <NavbarElement to="characters">Characters</NavbarElement>}
            <NavbarElement to="books">Books</NavbarElement>
            {isAdmin && (
                <NavbarElement to="bookmanager">Book Manager</NavbarElement>
            )}
            <NavbarElement to="news">News</NavbarElement>
            {auth ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "0 10px",
                    }}
                >
                    <h1>{auth.username}</h1>
                    <h1
                        onClick={() => {
                            setAuth(null);
                        }}
                        style={{ marginLeft: "10px" }}
                    >
                        Logout
                    </h1>
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <NavbarElement to="signup">Sign Up</NavbarElement>
                    <NavbarElement to="login">Log In</NavbarElement>
                </div>
            )}
        </div>
    );
};

export default Navbar;
