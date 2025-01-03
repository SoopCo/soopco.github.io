import React from "react";
import Roller from "./Roller";
import Box from "./Box";

const Pool = ({ title, pool, value, max, updatePoolValue, regen }) => {
    return (
        <Box style={{ width: "10vw" }}>
            <input
                style={{
                    margin: 0,
                    fontSize: "1.75em",
                    width: "3em",
                    borderRadius: "5px",
                    border: "none",
                    textAlign: "center",
                }}
                type="number"
                value={value}
                onChange={(e) => updatePoolValue(pool, e.target.value)}
            />
            <div
                style={{
                    borderTop: "1px solid black",
                    margin: "5px",
                    width: "80%",
                }}
            />
            <h2 style={{ margin: 0 }}>{max}</h2>
            <h7>Regen {regen || 0}</h7>
            <h3 style={{ margin: 0 }}>{title}</h3>
        </Box>
    );
};

export default Pool;
