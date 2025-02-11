import React from "react";
import { useParams } from "react-router-dom";
import RemoteContentView from "../components/RemoteContentView";

const Book = () => {
    const { bookId } = useParams();
    return (
        <RemoteContentView
            id={bookId}
            allowed={(admin, id) => admin || id === "basicrulebook"}
            book
        />
    );
};

export default Book;
