import React from "react";
import { useParams } from "react-router-dom";
import RemoteContentView from "../components/RemoteContentView";

const NewsItem = () => {
    const { newsId } = useParams();
    return (
        <RemoteContentView
            id={newsId}
            allowed={(admin, id) => true}
            book={false}
            showTitle
        />
    );
};

export default NewsItem;
