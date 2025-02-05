import React from "react";
import { useParams } from "react-router-dom";
import RemotePage from "../components/RemotePage";

const NewsItem = () => {
    const { newsId } = useParams();
    return (
        <RemotePage id={newsId} allowed={(admin, id) => true} book={false} />
    );
};

export default NewsItem;
