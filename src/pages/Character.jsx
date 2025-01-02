import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CharacterSheetBox from "../components/CharacterSheetBox";
import { getCharacterData, setCharacterField } from "../api/FirebaseCloud";
import { getExpForLevel } from "../api/Exp";

const Character = () => {
    const { characterId } = useParams();
    const [characterData, setCharacterData] = useState(null);
    const [characterExists, setCharacterExists] = useState(true);
    const [expAddAmount, setExpAddAmount] = useState("");
    const [expAddButtonDisabled, setExpAddButtonDisabled] = useState(true);
    const [expAddNumerator, setExpAddNumerator] = useState(1);
    const [expAddDenominator, setExpAddDenominator] = useState(1);

    const updateExpAddAmount = (event) => {
        let value = event.target.value;
        setExpAddAmount(value);
        setExpAddButtonDisabled(isNaN(value) || value === "");
    };

    const updateExpAddNumerator = (event) => {
        setExpAddNumerator(event.target.value);
    };

    const updateExpAddDenominator = (event) => {
        setExpAddDenominator(event.target.value);
    };

    const addExp = () => {
        let newExp =
            characterData.exp +
            parseInt(expAddAmount) *
                (parseInt(expAddNumerator || 1) /
                    parseInt(expAddDenominator || 1));
        let newLevel = characterData.level;
        while (newExp >= getExpForLevel(newLevel)) {
            newExp -= getExpForLevel(newLevel);
            newLevel++;
        }
        setCharacterField(characterId, "exp", newExp);
        setCharacterField(characterId, "level", newLevel);
        fetchData();
    };

    async function fetchData() {
        await getCharacterData(characterId).then((data) => {
            if (data === null) {
                setCharacterExists(false);
            } else {
                setExpAddNumerator(data.level);
                setExpAddDenominator(data.level);
            }
            setCharacterData(data);
        });
    }

    useEffect(() => {
        fetchData();
    }, [characterId]);
    if (!characterExists) {
        return <h1>Character not found!</h1>;
    }
    if (characterData === null) {
        return <h1>Loading character...</h1>;
    }
    return (
        <div>
            <CharacterSheetBox direction="row">
                <div style={{ margin: "10px" }}>
                    <h1>{characterData.name}</h1>
                    <p>
                        Level {characterData.level}{" "}
                        {characterData.classes.join("-")}
                    </p>
                </div>
                <div style={{ margin: "10px" }}>
                    <h2>
                        EXP {characterData.exp}/
                        {getExpForLevel(characterData.level)}
                    </h2>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <input
                            placeholder="Add EXP..."
                            type="number"
                            value={expAddAmount}
                            onChange={updateExpAddAmount}
                            style={{ width: "100px", marginRight: "5px" }}
                        />
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "50px",
                            }}
                        >
                            <input
                                placeholder="L"
                                type="number"
                                value={expAddNumerator}
                                onChange={updateExpAddNumerator}
                            />
                            <div
                                style={{
                                    borderTop: "1px solid black",
                                    margin: "5px",
                                }}
                            />
                            <input
                                placeholder="T"
                                type="number"
                                value={expAddDenominator}
                                onChange={updateExpAddDenominator}
                            />
                        </div>
                        <button
                            style={{ marginLeft: "5px" }}
                            disabled={expAddButtonDisabled}
                            onClick={addExp}
                        >
                            Add!
                        </button>
                    </div>
                </div>
            </CharacterSheetBox>
        </div>
    );
};

export default Character;
