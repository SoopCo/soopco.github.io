import React, { useContext, useEffect, useState } from "react";
import { getBook, getNewsItem, getUserData } from "../api/FirebaseCloud";
import { AuthContext } from "../context/AuthContext";
import { fetchRemoteContent } from "../api/RemoteContent";

const RemoteContentView = ({ id, allowed, book, showTitle, subtitle }) => {
    const { auth } = useContext(AuthContext);

    const [title, setTitle] = useState("Loading...");
    const [docContent, setDocContent] = useState("");
    const [hasAccess, setHasAccess] = useState(true);

    useEffect(() => {
        document.title = `Battle Team - ${title}`;
    }, [title]);

    useEffect(() => {
        const fetchDoc = async () => {
            const admin =
                auth != null && (await getUserData(auth.username)).admin;
            if (!allowed(admin, id)) {
                setHasAccess(false);
                return;
            }
            const bookData = await (book ? getBook : getNewsItem)(id);
            if (bookData == null) {
                return;
            }
            setTitle(bookData.title);
            const text = await fetchRemoteContent(bookData.link);
            // const sanitizedContent = DOMPurify.sanitize(text);
            setDocContent(text);
        };
        fetchDoc();
    }, [id, allowed, auth, book]);

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
                    {showTitle ? <h1>{title}</h1> : null}
                    {subtitle ? <h3>{subtitle}</h3> : null}
                    <div
                        dangerouslySetInnerHTML={{ __html: docContent }}
                        style={{ width: "60vw" }}
                    />
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

export default RemoteContentView;
