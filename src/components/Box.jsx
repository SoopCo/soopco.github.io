import React from "react";

const Box = ({ children, direction, style }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: direction || "column",
                alignItems: "center",
                border: "1px solid black",
                borderRadius: "10px",
                padding: "10px",
                margin: "10px",
                backgroundColor: "lightgray",
                justifyContent: "center",
                ...style,
            }}
        >
            {children}
        </div>
    );
};

export default Box;
