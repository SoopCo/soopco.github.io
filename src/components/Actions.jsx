import React, {useEffect} from "react";
import Box from "./Box";

const Actions = ({ characterData, actions }) => {
    useEffect(() => {
        console.log("actions", actions);
    }, [actions]);
    return (
        <Box
            style={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "flex-start",
            }}
        >
            <h1 style={{ display: "flex", alignSelf: "center" }}>Actions</h1>
            {actions == [] ? null : actions
                .sort((a, b) => {
                    if (a.skillLevel < b.skillLevel) return -1;
                    if (a.skillLevel > b.skillLevel) return 1;
                    return 0;
                })
                .map((action) => (
                    <div
                        key={action.name}
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            paddingLeft: "10px",
                        }}
                    >
                        <h2 style={{ display: "flex", alignItems: "center" }}>
                            {action.name}
                        </h2>
                        {(Object.entries(action.fields ?? {}))
                            .sort((a, b) => {
                                if (a[0] < b[0]) return -1;
                                if (a[0] > b[0]) return 1;
                                return 0;
                            })
                            .map(([key, value]) => {
                                const SkillLevel = action.skillLevel;
                                const stats = characterData;
                                return (
                                    <div key={key} style={{ margin: "0 25px" }}>
                                        <h3 style={{ margin: "0" }}>
                                            {key.charAt(0).toUpperCase() +
                                                key.slice(1)}
                                        </h3>
                                        <p style={{ margin: "0" }}>
                                            {eval(value.value) +
                                                (" " + value.type || "")}
                                        </p>
                                    </div>
                                );
                            })}
                    </div>
                ))}
        </Box>
    );
};

export default Actions;
