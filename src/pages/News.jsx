import React, { useEffect } from "react";

const News = () => {
    useEffect(() => {
        document.title = `Battle Team - News`;
    });

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <h1>News</h1>
            <h2>New Features!</h2>
            <ul>
                <li>Books! You can now view the Battle Team Basic Rulebook here on the website! Other books will hopefully be viewable in the near future.</li>
                <li>Characters! We have added character sheets, though limited. We will continue to work on more features!</li>
                <li>Accounts! There are accounts!</li>
                <li>News! We've updated the news! (but you knew that already)</li>
            </ul>
        </div>
    );
};

export default News;
