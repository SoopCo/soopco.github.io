import React from "react";
import { useParams } from "react-router-dom";
import RemotePage from "../components/RemotePage";

const Book = () => {
    const { bookId } = useParams();
    return (
        <RemotePage
            id={bookId}
            allowed={(admin, id) => admin || id == "basicrulebook"}
            book
        />
    );
};

export default Book;
