import React from "react";

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
                We have some cool books! Sadly, the only copies not confiscated
                by Soop lie in Li Librarian's <s>rusty</s> <b>clean</b> library.
                As this webpage may or may not be sponsored by SoopCo, we cannot
                give them to you without the resistance base getting attacked.
                Sorry!
            </p>
        </div>
    );
};

export default Books;
