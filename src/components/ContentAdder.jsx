import React, { useEffect, useState } from "react";
import Box from "./Box";

const ContentAdder = ({ onSubmit, title }) => {
    const [newId, setNewID] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [newLink, setNewLink] = useState("");
    const [disabled, setNewDisabled] = useState(false);

    const submitPressed = () => {
        onSubmit(newId, newTitle, newLink);
        setNewID("");
        setNewTitle("");
        setNewLink("");
    };

    useEffect(() => {
        setNewDisabled(newId === "" || newTitle === "" || newLink === "");
    }, [newId, newTitle, newLink]);

    return (
        <Box style={{ width: "60vw" }}>
            <h1>Add {title}</h1>
            <input
                value={newId}
                onChange={(e) => setNewID(e.target.value)}
                placeholder="ID"
            />
            <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Title"
            />
            <input
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                placeholder="Link"
            />
            <button disabled={disabled} onClick={submitPressed}>
                Create {title}!
            </button>
        </Box>
    );
};

export default ContentAdder;
