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
            <h1>News</h1>
            <p>
                The Battle Team Basic Rulebook is being revised! You can expect a release in January of 2025! This website is still being developed! Also, hopefully there will be different pages that you can go to for news.
            </p>
        </div>
    );
};

export default Home;
