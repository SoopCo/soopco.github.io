import React from "react";
import Box from "./Box";

const CharacterListElement = ({ characterData, onClick }) => {
    return (
        <div onClick={onClick}>
            <Box style={{ width: "90vw" }}>
                <div style={{ margin: "10px" }}>
                    <h1>{characterData.name}</h1>
                    <p>
                        Level {characterData.level}{" "}
                        {characterData.classes.join("-")}
                    </p>
                </div>
            </Box>
        </div>
    );
};

export default CharacterListElement;
