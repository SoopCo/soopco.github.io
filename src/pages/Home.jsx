import React from "react";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

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
                Battle Team is a game.{" "}
                <button onClick={() => navigate("/books")}>Here</button>
                's but a <b>small</b> taste of one of our most popular campaign
                books.
            </p>
            <p>
                <i>"...{"woff ".repeat(500)}..."</i> - Sadly a real(ish) quote
            </p>
        </div>
    );
};

export default Home;
