import React, { useState } from "react";
import Box from "./Box";

const CharacterCreate = ({ onCreate }) => {
    const [name, setName] = useState("");
    const [level, setLevel] = useState(1);
    const [submitDisabled, setSubmitDisabled] = useState(true);

    function updateButtonDisabled(n, l) {
        setSubmitDisabled(
            n === "" || isNaN(l) || parseInt(l) < 1 || parseInt(l) % 1 !== 0
        );
    }

    return (
        <Box
            style={{
                position: "absolute",
                top: "10%",
                left: "10%",
                width: "80%",
                height: "80%",
            }}
        >
            <h1>Create a Character</h1>
            <form>
                <label>
                    Name:{" "}
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                            let value = e.target.value;
                            setName(value);
                            updateButtonDisabled(value, level);
                        }}
                    />
                </label>
                <label>
                    Level:{" "}
                    <input
                        type="number"
                        value={level}
                        onChange={(e) => {
                            let value = e.target.value;
                            setLevel(value);
                            updateButtonDisabled(name, value);
                        }}
                        min="1"
                        step={1}
                    />
                </label>
                {/* <label>
                    Classes:
                    <input type="text" name="classes" />
                </label> */}
                <button
                    disabled={submitDisabled}
                    onClick={() => onCreate(name, level)}
                >
                    Create!
                </button>
            </form>
        </Box>
    );
};

export default CharacterCreate;
