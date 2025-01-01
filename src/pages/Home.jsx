import React from "react";

const Home = () => {
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
                the old website. It wasn't very important. Also you'll probably
                be getting it back. As long as you don't click{" "}
                <button
                    onClick={() =>
                        prompt(
                            "Hey! Why did you click the button! Now you might now get your characters back...",
                            "I'm very very very sorry."
                        )
                    }
                >
                    here
                </button>
                .
            </p>
        </div>
    );
};

export default Home;
