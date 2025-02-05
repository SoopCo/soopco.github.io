import React from "react";
import Box from "./Box";

const ContentElement = ({ content, onClick, onDelete }) => {
    return (
        <Box>
            <h1 onClick={onClick}>{content.title}</h1>
            <p>Link: {content.link}</p>
            <p onClick={onDelete}>
                <u>Delete</u>
            </p>
        </Box>
    );
};
export default ContentElement;
