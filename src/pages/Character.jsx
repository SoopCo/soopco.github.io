import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "../components/Box";
import {
    getCharacterData,
    getItemData,
    getSkillData,
    setCharacterField,
} from "../api/FirebaseCloud";
import { getExpForLevel } from "../api/Exp";
import Actions from "../components/Actions";
import Roller from "../components/Roller";
import Pool from "../components/Pool";

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
        setCharacterData({ ...characterData, exp: newExp, level: newLevel });
    };

    const updatePoolValue = (pool, value) => {
        setCharacterField(characterId, `poolValues.${pool}`, value);
        setCharacterData({
            ...characterData,
            poolValues: { ...characterData.poolValues, [pool]: value },
        });
    };

    const updateAttribute = (attribute, value) => {
        const newAttributes = {
            ...characterData.attributes,
            [attribute]: value,
        };
        setCharacterField(characterId, "attributes", newAttributes);
        setCharacterData({
            ...characterData,
            attributes: newAttributes,
        });
    }

    const regen = (e) => {
        e.preventDefault();
        let newHp = parseInt(characterData.poolValues.hp) + Math.floor(characterData.attributes.vit / 2);
        let newMana = parseInt(characterData.poolValues.mana) + Math.floor(characterData.attributes.wis / 2);
        setCharacterField(characterId, "poolValues.hp", newHp);
        setCharacterField(characterId, "poolValues.mana", newMana);
        setCharacterData({
            ...characterData,
            poolValues: { ...characterData.poolValues, hp: newHp, mana: newMana },
        });
    }

    useEffect(() => {
        document.title = `Battle Team - Loading Character`;
    }, []);

    useEffect(() => {
        async function fetchData() {
            await getCharacterData(characterId).then((data) => {
                if (data === null) {
                    setCharacterExists(false);
                } else {
                    setExpAddNumerator(data.level);
                    setExpAddDenominator(data.level);
                    document.title = `Battle Team - ${data.name}`;
                }
                setCharacterData(data);
            });
        }
        fetchData();
    }, [characterId]);

    useEffect(() => {
        async function updateActions() {
            let newActions = [];
            for (var skill of Object.keys(characterData.skills) || []) {
                let skillLevel = characterData.skills[skill];
                let skillData = await getSkillData(skill);
                newActions.push({ skillLevel, ...skillData });
            }
            console.log(characterData.inventory);
            for (var item of characterData.inventory || []) {
                console.log("item", item);
                let itemData = await getItemData(item);
                console.log(itemData);
                newActions.push({ skillLevel: 0, ...itemData });
            }
            console.log(newActions);
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
                        <Roller key={key} title={key.toUpperCase()} width="5vw">
                            {value}{Object.values(characterData.attributes).reduce((a, b) => a + b) < 60+characterData.level*5 ? <div>{" "}
                            <button onClick={() => updateAttribute(key, value+1)}>+</button>
                            </div> : null}
                        </Roller>
                    ))}
            </div>
            <div style={{ display: "flex", direction: "row" }}>
                <div style={{ justifyContent: "flex-start" }}>
                    <Roller title="Avoid">
                        d20+{Math.floor(characterData.attributes.dex / 2)}
                    </Roller>
                    <Roller title="Hit">
                        d20+{Math.floor(characterData.attributes.dex / 2)}
                    </Roller>
                    <Roller title="M. Hit">
                        d20+{Math.floor(characterData.attributes.int / 2)}
                    </Roller>
                </div>
                <div style={{ justifyContent: "flex-start" }}>
                    <button onClick={regen}>Regen</button>
                    <Pool
                        title="HP"
                        pool="hp"
                        value={characterData.poolValues.hp}
                        max={characterData.attributes.vit * 10}
                        regen={Math.floor(characterData.attributes.vit / 2)}
                        updatePoolValue={updatePoolValue}
                    />
                    <Pool
                        title="Mana"
                        pool="mana"
                        value={characterData.poolValues.mana}
                        max={characterData.attributes.wis * 10}
                        regen={Math.floor(characterData.attributes.wis / 2)}
                        updatePoolValue={updatePoolValue}
                    />
                </div>
                <Actions characterData={characterData} actions={actions} />
            </div>
        </div>
    );
};

export default Character;
