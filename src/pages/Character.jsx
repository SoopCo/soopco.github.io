import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "../components/Box";
import {
    getCharacterData,
    getSkillData,
    setCharacterField,
} from "../api/FirebaseCloud";
import { getExpForLevel } from "../api/Exp";

const Character = () => {
    const { characterId } = useParams();
    const [characterData, setCharacterData] = useState(null);
    const [characterExists, setCharacterExists] = useState(true);
    const [expAddAmount, setExpAddAmount] = useState("");
    const [expAddButtonDisabled, setExpAddButtonDisabled] = useState(true);
    const [expAddNumerator, setExpAddNumerator] = useState(1);
    const [expAddDenominator, setExpAddDenominator] = useState(1);
    const [actions, setActions] = useState([]);

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
        characterData.exp = newExp;
        characterData.level = newLevel;
    };

    useEffect(() => {
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
        fetchData();
    }, [characterId]);

    useEffect(() => {
        async function updateActions() {
            let newActions = [];
            for (var skill in characterData.skills || []) {
                let skillLevel = characterData.skills[skill];
                let skillData = await getSkillData(skill);
                newActions.push({ skillLevel, ...skillData });
            }
            setActions(newActions);
        }
        if (characterData != null) {
            updateActions();
        }
    }, [characterData]);
    if (!characterExists) {
        return <h1>Character not found!</h1>;
    }
    if (characterData === null) {
        return <h1>Loading character...</h1>;
    }
    return (
        <div>
            <div style={{ display: "flex", direction: "row" }}>
                <Box direction="row">
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
                </Box>
                {Object.entries(characterData.attributes)
                    .sort((a, b) => {
                        if (a[0] < b[0]) return -1;
                        if (a[0] > b[0]) return 1;
                        return 0;
                    })
                    .map(([key, value]) => (
                        <Box key={key} style={{ width: "5vw" }}>
                            <h1>{value}</h1>
                            <h3>{key.toUpperCase()}</h3>
                        </Box>
                    ))}
            </div>
            <Box>
                <h2>Actions</h2>
                {actions
                    .sort((a, b) => {
                        if (a.skillLevel < b.skillLevel) return -1;
                        if (a.skillLevel > b.skillLevel) return 1;
                        return 0;
                    })
                    .map((action) => (
                        <div
                            key={action.name}
                            style={{ display: "flex", flexDirection: "row" }}
                        >
                            <h1>{action.name}</h1>
                            {Object.entries(action.fields)
                                .sort((a, b) => {
                                    if (a[0] < b[0]) return -1;
                                    if (a[0] > b[0]) return 1;
                                    return 0;
                                })
                                .map(([key, value]) => {
                                    const SkillLevel = action.skillLevel;
                                    const stats = characterData;
                                    return (
                                        <div
                                            key={key}
                                            style={{ margin: "0 25px" }}
                                        >
                                            <h3>
                                                {key.charAt(0).toUpperCase() +
                                                    key.slice(1)}
                                            </h3>
                                            <p>
                                                {eval(value.value) +
                                                    (" " + value.type || "")}
                                            </p>
                                        </div>
                                    );
                                })}
                        </div>
                    ))}
            </Box>
        </div>
    );
};

export default Character;
