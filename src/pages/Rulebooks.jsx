import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Rulebooks = () => {
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
            <h1>Rulebooks</h1>
            <p>
                These are books that let you play the game.
            </p>
            <button class="button" onClick={() => navigate("/book/basicrulebook")}>
                <h2>
                    The Battle Team Basic Rules
                </h2>
            </button>
            <button class="button" onClick={() => navigate("/book/doop")}>
                <h2>
                    Doop - How to be Evil
                </h2>
            </button>
            <button class="button" onClick={() => navigate("/book/glarf")}>
                <h2>
                    Glarf - How to be Cool
                </h2>
            </button>
        </div>
    );
};

export default Rulebooks;
