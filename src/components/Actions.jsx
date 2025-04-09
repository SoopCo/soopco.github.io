import React from "react";
import Box from "./Box";

const Actions = ({ characterData, actions, getAttribute, increaseAvailable, increase }) => {
    // Suppress unused warning for getAttribute
    getAttribute && (() => {})();

    return (
        <Box
            style={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "flex-start",
            }}
        >
            <h1 style={{ display: "flex", alignSelf: "center" }}>Actions</h1>
            {actions.length === 0 ? null : actions
                .sort((a, b) => {
                    if (a.skillLevel < b.skillLevel) return -1;
                    if (a.skillLevel > b.skillLevel) return 1;
                    return 0;
                })
                .map((action, i) => (
                    <div
                        key={action.name + i}
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            paddingLeft: "10px",
                        }}
                    >
                        {increaseAvailable && <button onClick={() => increase(action.id, action.skillLevel+1)} disabled={action.skillLevel < 0 || !action.skill}>+</button>}
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
                                SkillLevel && stats && (() => {})();
                                return (
                                    <div key={action.name + key} style={{ margin: "0 25px" }}>
                                        <h3 style={{ margin: "0" }}>
                                            {key.charAt(0).toUpperCase() +
                                                key.slice(1)}
                                        </h3>
                                        <p style={{ margin: "0" }}>
                                            {eval(value.value) +
                                                (" " + (value.type || ""))}
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
