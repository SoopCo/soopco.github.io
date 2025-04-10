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
            <button class="button">
                <h2 onClick={() => navigate("/rulebooks")}>
                    Rulebooks
                </h2>
            </button>
            <button class="button">
                <h2 onClick={() => navigate("/book/lore")}>
                    The Book of Lore!
                </h2>
            </button>
            <button class="button">
                <h2 onClick={() => navigate("/book/doop")}>
                    Doop - How to be Evil!
                </h2>
            </button>
            <button class="button">
                <h2 onClick={() => navigate("/book/glarf")}>
                    Glarf - How to be Cool!
                </h2>
            </button>
        </div>
    );
};

export default Books;
