import React from "react";
import hamstur from "../images/ly_hamstur.png";

const NotFound = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <img src={hamstur} alt="ERROR 404: hamstur not found" />
            <h1>ERROR 404: Page Not Found</h1>
            <p>Much like the elusive hamstur, this page has not been found.</p>
        </div>
    );
};

export default NotFound;
