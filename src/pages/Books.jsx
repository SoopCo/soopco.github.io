import React from "react";
import { useNavigate } from "react-router-dom";

const Books = () => {
    const navigate = useNavigate();
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <h1>Our Books</h1>
            <p>
                We have some cool books! The Basic Rulebook can be view for
                free!
            </p>
            <button>
                <h2 onClick={() => navigate("/book/basicrulebook")}>
                    Take me to the Basic Rules
                </h2>
            </button>
        </div>
    );
};

export default Books;
