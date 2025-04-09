import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "../components/Box";
import {
    getCharacterData,
    getClassData,
    getAllClasses,
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
    const [classes, setClasses] = useState([]);
    const [classChoices, setClassChoices] = useState([]);


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

    const updateSkillLevel = (skillId, value) => {
        const newSkills = {
            ...characterData.skills,
            [skillId]: value
        };
        setCharacterField(characterId, "skills", newSkills);
        setCharacterData({
            ...characterData,
            skills: newSkills,
        });
    }

    const addClass = async (classId) => {
        if (classId === "") return;
        const newClasses = [...characterData.classes, classId.toString()];
        const newAttributes = {
            ...characterData.attributes,
        };
        const classData = await getClassData(classId);
        if (classData.classStat != null) {
            newAttributes[classData.classStat] = 0;
            setCharacterField(characterId, "attributes", newAttributes);
        }
        setCharacterField(characterId, "classes", newClasses);
        setCharacterData({
            ...characterData,
            classes: newClasses,
            attributes: newAttributes,
        });
    }

    const getAttribute = (attribute) => {
        return parseInt(characterData.attributes[attribute]) + (classes.length === 0 ? 0 : parseInt(
            classes.map(
                (c) =>
                    (parseInt(c.attrs?.start?.[attribute] ?? 0) + parseInt((c.attrs?.lvl?.[attribute] || 0) * (characterData.level - 1)))
            )
                .reduce((a, b) => a + b)
        )
        );
    }

    const regen = (e) => {
        e.preventDefault();
        let newHp = parseInt(characterData.poolValues.hp) + Math.floor(getAttribute("vit") / 2);
        let newMana = parseInt(characterData.poolValues.mana) + Math.floor(getAttribute("wis") / 2);
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
                newActions.push({ skillLevel, id: skill, skill: true, ...skillData });
            }
            for (var item of characterData.inventory || []) {
                let itemData = await getItemData(item);
                newActions.push({ skillLevel: 0, id: item, skill: false, ...itemData });
            }
            setActions(newActions);
        }
        async function updateClassChoices() {
            let classData = await getAllClasses();
            setClassChoices(classData.filter(c => parseInt(c.stage) === characterData.classes.length + 1));
        }
        if (characterData != null) {
            updateActions();
            updateClassChoices();
        }
    }, [characterData]);

    useEffect(() => {
        async function updateClasses() {
            let newClasses = [];
            for (var classId of Object.values(characterData.classes) || []) {
                let classData = await getClassData(classId);
                newClasses.push(classData);
            }
            setClasses(newClasses);
        }
        if (characterData?.classes != null) {
            updateClasses();
        }
    }, [characterData?.classes])

    useEffect(() => {
        const updateClassSpecifics = () => {
            setCharacterData(characterData => {
                if (characterData == null) return null;
                var newSkills = { ...characterData.skills };
                var newPoolValues = {...characterData.poolValues};
                for (var classData of classes) {
                    for (const [id, level] of Object.entries(classData.skills)) {
                        if (characterData.level >= parseInt(level) && characterData.skills[id] == null) {
                            newSkills[id] = 0;
                        }
                    }
                    if (classData?.classPool != null && characterData.poolValues?.[classData.classPool.id] == null) {
                        newPoolValues[classData.classPool.id] = 0;
                    }
                }
                setCharacterField(characterId, "poolValues", newPoolValues);
                setCharacterField(characterId, "skills", newSkills);
                return {...characterData, skills: newSkills, poolValues: newPoolValues};
            });
        }
        updateClassSpecifics();
    }, [classes, characterData?.level, characterId])

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
                            {classes.map((c) => c?.name).join(" - ")}
                            {(classes.length === Math.ceil(characterData.level / 10) || classChoices.length === 0) ? null : <select onChange={(e) => addClass(e.target.value)}>
                                <option value={""}>Choose a Class</option>
                                {classChoices.map((k) => <option key={k.id} value={k.id}>{k.name}</option>)}</select>}
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
                            {getAttribute(key)}{Object.values(characterData.attributes).reduce((a, b) => a + b) < 60 + characterData.level * 5 ? <div>{" "}
                                <button onClick={() => updateAttribute(key, value + 1)} disabled={key.toLowerCase() === "luk"}>+</button>
                            </div> : null}
                        </Roller>
                    ))}
            </div>
            <div style={{ display: "flex", direction: "row" }}>
                <div style={{ justifyContent: "flex-start" }}>
                    <Roller title="Avoid">
                        d20+{Math.floor(getAttribute("dex") / 2)}
                    </Roller>
                    <Roller title="Hit">
                        d20+{Math.floor(getAttribute("dex") / 2)}
                    </Roller>
                    <Roller title="M. Hit">
                        d20+{Math.floor(getAttribute("int") / 2)}
                    </Roller>
                </div>
                <div style={{ justifyContent: "flex-start" }}>
                    <button onClick={regen}>Regen</button>
                    <Pool
                        title="HP"
                        pool="hp"
                        value={characterData.poolValues.hp}
                        max={getAttribute("vit") * 10}
                        regen={Math.floor(getAttribute("vit") / 2)}
                        updatePoolValue={updatePoolValue}
                    />
                    <Pool
                        title="Mana"
                        pool="mana"
                        value={characterData.poolValues.mana}
                        max={getAttribute("wis") * 10}
                        regen={Math.floor(getAttribute("wis") / 2)}
                        updatePoolValue={updatePoolValue}
                    />
                    {classes.map((c) => c?.classPool != null ? <Pool
                        key={c.classPool.id}
                        title={c.classPool.name}
                        pool={c.classPool.id}
                        value={characterData.poolValues[c.classPool.id]}
                        max={getAttribute(c.classPool.src) * 10}
                        regen={Math.floor(getAttribute(c.classPool.src) / 2)}
                        updatePoolValue={updatePoolValue}
                    /> : null)}
                </div>
                <Actions characterData={characterData} actions={actions} getAttribute={getAttribute} increaseAvailable={(Object.values(characterData.skills).reduce((a, b) => a + b) + 2) < characterData.level} increase={updateSkillLevel} />
            </div>
        </div>
    );
};

export default Character;
