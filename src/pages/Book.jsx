import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBook, getUserData } from "../api/FirebaseCloud";
import DOMPurify from "dompurify";
import { AuthContext } from "../context/AuthContext";

const Book = () => {
    const { auth } = useContext(AuthContext);

    const { bookId } = useParams();
    const [bookTitle, setBookTitle] = useState("Loading Book...");
    const [docContent, setDocContent] = useState("");
    const [hasAccess, setHasAccess] = useState(true);

    useEffect(() => {
        document.title = `Battle Team - ${bookTitle}`;
    });

    useEffect(() => {
        const fetchDoc = async () => {
            const admin = (await getUserData(auth.username)).admin;
            if (!admin && bookId != "basicrulebook") {
                setHasAccess(false);
                return;
            }
            const bookData = await getBook(bookId);
            if (bookData == null) {
                return;
            }
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
            {hasAccess && docContent != null ? (
                <div>
                    <div
                        dangerouslySetInnerHTML={{ __html: docContent }}
                        style={{ width: "60vw" }}
                    ></div>
                </div>
            ) : (
                <h1>
                    You do not have access to view this book, or it does not
                    exist!
                </h1>
            )}
        </div>
    );
};

export default Book;
