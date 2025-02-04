import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBook } from "../api/FirebaseCloud";
import DOMPurify from "dompurify";

const Book = () => {
    const { bookId } = useParams();
    const [bookTitle, setBookTitle] = useState("Loading Book...");
    const [docContent, setDocContent] = useState("");

    useEffect(() => {
        const fetchDoc = async () => {
            const bookData = await getBook(bookId);
            setBookTitle(bookData.title);
            const url = bookData.link;
            const response = await fetch(url);
            const text = await response.text();
            // const sanitizedContent = DOMPurify.sanitize(text);
            setDocContent(text);
        };

        fetchDoc();
    }, [bookId]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <h1>{bookTitle}</h1>
            <div
                dangerouslySetInnerHTML={{ __html: docContent }}
                style={{ padding: "0 20vw" }}
            ></div>
        </div>
    );
};

export default Book;
