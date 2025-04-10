import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Books = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = `Battle Team - Books`;
    }, []);

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
                We have some cool books!
            </p>
            <button class="button" onClick={() => navigate("/rulebooks")}>
                <h2>
                    Rulebooks
                </h2>
            </button>
            <button class="button" onClick={() => navigate("/storybooks")}>
                <h2>
                    Storybooks
                </h2>
            </button>
        </div>
    );
};

export default Books;
