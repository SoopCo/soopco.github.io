import React from "react";
import Box from "./Box";

const Roller = ({ width, title, children }) => {
    return (
        <Box style={{ width: width || "10vw" }}>
            <h1 style={{ margin: 0 }}>{children}</h1>
            <h3 style={{ margin: 0 }}>{title}</h3>
        </Box>
    );
};

export default Roller;
