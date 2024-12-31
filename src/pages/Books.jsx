import React from "react";
import hamstur from "../images/ly_hamstur.png";

const Books = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <h1>Our Books</h1>
            <p>
                We have some cool books! Sadly, none of them are released except
                that one book of lore in beta.
            </p>
        </div>
    );
};

export default Books;
