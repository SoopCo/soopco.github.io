import React, {useState, useEffect} from "react";
import { getClassData } from "../api/FirebaseCloud";
import Box from "./Box";

const CharacterListElement = ({ characterData, onClick }) => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        async function updateClasses() {
            let newClasses = [];
            for (var classId of Object.values(characterData.classes) || []) {
                let classData = await getClassData(classId);
                newClasses.push(classData);
            }
            setClasses(newClasses);
        }
        if (characterData != null) {
            updateClasses();
        }
    }, [characterData]);

    return (
        <div onClick={onClick}>
            <Box style={{ width: "90vw" }}>
                <div style={{ margin: "10px" }}>
                    <h1>{characterData.name}</h1>
                    <p>
                        Level {characterData.level}{" "}
                        {classes.map((c) => c?.name).join(" - ")}
                    </p>
                </div>
            </Box>
        </div>
    );
};

export default CharacterListElement;
