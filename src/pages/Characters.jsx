import React, { useState } from "react";
import CharacterCreate from "../components/CharacterCreate";
import { createCharacter } from "../api/FirebaseCloud";
import { useNavigate } from "react-router-dom";

const Characters = () => {
    const navigate = useNavigate();
    const [creatingCharacters, setCreatingCharacters] = useState(false);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <h1>Your Characters</h1>
            <button onClick={() => setCreatingCharacters(true)}>Create</button>
            {creatingCharacters && (
                <CharacterCreate
                    onCreate={async (name, level) => {
                        setCreatingCharacters(false);
                        let characterId = await createCharacter(name, level);
                        navigate(`/characters/${characterId}`);
                    }}
                />
            )}
        </div>
    );
};

export default Characters;
