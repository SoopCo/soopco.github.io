import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Storybooks = () => {
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
            <h1>Storybooks</h1>
            <p>
                These are books that let you learn more about the deep, epic story of Battle Team.
            </p>
            <button class="button" onClick={() => navigate("/book/lore")}>
                <h2>
                    The Battalia Book of Lore
                </h2>
            </button>
        </div>
    );
};

export default Storybooks;
