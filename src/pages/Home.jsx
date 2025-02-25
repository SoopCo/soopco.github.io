import React, { useEffect } from "react";
import gote from "../images/gote.png";

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
                Battle Team is a roleplaying game set in a fantasy environment. All of our campaigns and rulebooks are crafted with love, care, and magic.
            </p>
            <p>
                <bold>
                    March Character of the Month: La Gote
                </bold>
            </p>
            <img src={gote} alt="A gote (a four-headed hydra goat.)" width="409" height="500"></img>
            <p>
                La Gote is a gote (a four-headed hydra goat.) He cofounded the Resistance in an alte- what do you mean this is a spoiler? What do you mean I'm fired?
            </p>
            <p>
                Sorry about that, folks. I just saved you from a spoiler. You're welcome. Anyway, La Gote is a major character in the upcoming campaign "Battle Team: War for Battalia!" Get ready for a cool, awesome, and amazing campaign!
            </p>
        </div>
    );
};

export default Home;
