import React, { useContext, useEffect, useState} from "react";
import { getBook, getNewsItem, getUserData } from "../api/FirebaseCloud";
import { AuthContext } from "../context/AuthContext";
import { fetchRemoteContent } from "../api/RemoteContent";
import { useLocation } from "react-router-dom";

const RemoteContentView = ({ id, allowed, book, showTitle, subtitle }) => {
    const { auth } = useContext(AuthContext);
    const location = useLocation();

    const [title, setTitle] = useState("Loading...");
    const [docContent, setDocContent] = useState("");
    const [tocHtml, setTocHtml] = useState("");
    const [mainHtml, setMainHtml] = useState("");
    const [hasAccess, setHasAccess] = useState(true);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        document.title = `Battle Team - ${title}`;
    }, [title]);

    useEffect(() => {
        const pieces = docContent.split('<hr style="page-break-before:always;display:none;">');
        if (pieces.length < 3) {
            return;
        }
        var container = document.createElement('div');
        container.innerHTML = pieces[1];
        container.removeChild(container.getElementsByTagName('h1')[0]);
        
        const currentHashPath = location.pathname;

        const anchors = container.querySelectorAll('a[href^="#"]');
        anchors.forEach(anchor => {
            const originalHash = anchor.getAttribute("href");
            if (!originalHash) return;
            anchor.setAttribute("href", `#${currentHashPath}${originalHash}`);
            console.log(anchor.innerHTML.split("&nbsp;"), anchor.innerHTML.split("&nbsp;").slice(0, -1))
            anchor.innerHTML = anchor.innerHTML.split("&nbsp;").slice(0, -1).join("&nbsp;");
        });

        setTocHtml(container.innerHTML);
        setMainHtml(pieces[0] + pieces.splice(2).join('<hr style="page-break-before:always;display:none;">'));
    }, [docContent, location.pathname]);

    useEffect(() => {
        const hash = window.location.hash.split('#')[2]; // works with /#/route/#hash
        if (hash) {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    }, [location]);
      

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
            setLoaded(true);
        };
        fetchDoc();
    }, [id, allowed, auth, book]);

    if (!loaded) {
        return <h1>Loading...</h1>
    }

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
                    <div style={{display: "flex", flexDirection: "row"}}> 
                        <div>
                            <div
                                dangerouslySetInnerHTML={{ __html: tocHtml }}
                                style={{
                                    position: "sticky",
                                    overflowY: "scroll",
                                    top: "15vh",
                                    maxHeight: "80vh",
                                    backgroundColor: "#e6e6e6",
                                    padding: "10px",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                    marginRight: "20px",
                                    width: "30vw"
                                }}
                                id={`${id}-content-toc`}
                            />
                        </div>
                        <div
                            dangerouslySetInnerHTML={{ __html: mainHtml }}
                            style={{ width: "60vw" }}
                            id={`${id}-content`}
                        />
                    </div>
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
