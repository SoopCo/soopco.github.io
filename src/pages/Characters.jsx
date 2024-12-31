import React from "react";
import hamstur from "../images/ly_hamstur.png";

const Characters = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <h1>Your Characters</h1>
            <p>
                You have lots of <b>really cool</b> hamsturs! Here they are!
            </p>
            <ol style={{ fontSize: "10rem", margin: "0" }}>
                <li>
                    <img src={hamstur} alt="ERROR 404: hamstur not found" />
                </li>
                <li>
                    <img src={hamstur} alt="ERROR 404: hamstur not found" />
                </li>
                <li>
                    <img src={hamstur} alt="ERROR 404: hamstur not found" />
                </li>
            </ol>
        </div>
    );
};

export default Characters;
