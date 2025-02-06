import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "./Box";

const NewsPreviewItem = ({ title, preview, to }) => {
    const navigate = useNavigate();
    return (
        <Box style={{ width: "60vw" }}>
            <h1 onClick={() => navigate(`/newsItem/${to}`)}>{title}</h1>
            <p>{preview}</p>
        </Box>
    );
};

export default NewsPreviewItem;
