import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    getBook,
    getNews,
    getNewsItem,
    getUserData,
} from "../api/FirebaseCloud";
import DOMPurify from "dompurify";
import { AuthContext } from "../context/AuthContext";

const RemotePage = ({ id, allowed, book }) => {
    const { auth } = useContext(AuthContext);

    const [title, setTitle] = useState("Loading...");
    const [docContent, setDocContent] = useState("");
    const [hasAccess, setHasAccess] = useState(true);

    useEffect(() => {
        document.title = `Battle Team - ${title}`;
    });

    useEffect(() => {
        const fetchDoc = async () => {
            const admin = (await getUserData(auth.username)).admin;
            if (!allowed(admin, id)) {
                setHasAccess(false);
                return;
            }
            const bookData = await (book ? getBook : getNewsItem)(id);
            if (bookData == null) {
                return;
            }
            setTitle(bookData.title);
            const url = bookData.link;
            const response = await fetch(url);
            const text = await response.text();
            // const sanitizedContent = DOMPurify.sanitize(text);
            setDocContent(text);
        };

        fetchDoc();
    }, [id]);

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
                    You do not have access to view this page, or it does not
                    exist!
                </h1>
            )}
        </div>
    );
};

export default RemotePage;
