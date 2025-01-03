import React, { useContext, useEffect, useState } from "react";
import CharacterCreate from "../components/CharacterCreate";
import {
    addCharacterToUser,
    createCharacter,
    getCharacterData,
    getUserData,
} from "../api/FirebaseCloud";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CharacterListElement from "../components/CharacterListElement";

const Characters = () => {
    const { auth } = useContext(AuthContext);

    const navigate = useNavigate();
    const [creatingCharacters, setCreatingCharacters] = useState(false);
    const [characters, setCharacters] = useState([]);
    useEffect(() => {
        if (auth !== null) {
            const fetchCharacters = async () => {
                const data = await getUserData(auth.username);
                const characterPromises = data.characters.map(getCharacterData);
                const resolvedCharacters = await Promise.all(characterPromises);
                setCharacters(resolvedCharacters);
            };
            fetchCharacters();
        }
    }, [auth]);
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
                        await addCharacterToUser(auth.username, characterId);
                        navigate(`/characters/${characterId}`);
                    }}
                />
            )}
            {characters.map((characterData) => (
                // <h1>{JSON.stringify(characterData)}</h1>
                <CharacterListElement
                    key={characterData.id}
                    characterData={characterData}
                    onClick={() => navigate(`/characters/${characterData.id}`)}
                />
            ))}
        </div>
    );
};

export default Characters;
