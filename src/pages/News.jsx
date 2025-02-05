import React, { useContext, useEffect, useState } from "react";
import NewsPreviewItem from "../components/NewsPreviewItem";
import { getNews, getUserData, setNewsItem } from "../api/FirebaseCloud";
import { AuthContext } from "../context/AuthContext";
import ContentAdder from "../components/ContentAdder";

const News = () => {
    const { auth } = useContext(AuthContext);
    const [news, setNews] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    const refreshNews = async () => {
        setNews(await getNews());
    };

    const createNews = (newNewsId, newNewsTitle, newNewsLink) => {
        setNewsItem(newNewsId, {
            title: newNewsTitle,
            link: newNewsLink
                .replace("edit", "export")
                .replace("usp=", "format=html&usp="),
        });
        refreshNews();
    };

    useEffect(() => {
        document.title = `Battle Team - News`;
        refreshNews();
    });

    useEffect(() => {
        const updateIsAdmin = async () => {
            const admin = (await getUserData(auth.username)).admin;
            setIsAdmin(admin);
        };
        updateIsAdmin();
    }, [auth]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <h1>News</h1>
            {isAdmin ? (
                <ContentAdder onSubmit={createNews} title="News" />
            ) : null}
            {news.map((newsItem) => (
                <NewsPreviewItem
                    title={newsItem.title}
                    to={newsItem.id}
                    key={newsItem.id}
                />
            ))}
        </div>
    );
};

export default News;
