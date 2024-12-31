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
            <h1>Welcome to Battle Team</h1>
            <p>
                Battle Team is a rolelplaying game. It's way better than all those other ones. Also, don't worry about any data you had on the old website. It wasn't very important. Also you'll probably be getting it back.{" "}
            </p>
        </div>
    );
};

export default Home;
