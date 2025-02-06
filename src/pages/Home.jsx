import React, { useEffect } from "react";

const Home = () => {
    useEffect(() => {
        document.title = `Battle Team - Home`;
    }, []);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <h1>Welcome to Battle Team</h1>
            <p>
                Battle Team is a roleplaying game. It's way better than all
                those other ones. Also, don't worry about any data you had on
                the old website. It wasn't very important.
            </p>
        </div>
    );
};

export default Home;
