import React from "react";
import logo from "../images/logo.png";

const Home = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <img
                src={logo}
                alt="Battle Team Logo"
                className="logo"
                style={{ width: "50vw" }}
            />
            <h1>Welcome to Battle Team</h1>
            <p>
                Battle Team is a game. <a href="/books">Here</a>
                's but a <b>small</b> taste of one of our most popular campaign
                books.
            </p>
            <p>
                <i>"...{"woff ".repeat(500)}..."</i>
            </p>
        </div>
    );
};

export default Home;
