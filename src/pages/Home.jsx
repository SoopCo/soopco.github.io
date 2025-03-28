import React, { useEffect } from "react";
import bedger from "../images/ler_bedger.png";

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
                    April Character of the Month: Ler Bedger
                </bold>
            </p>
            <img src={bedger} alt="A bedger (a giant badger with wings and 3 eyes)" width="641" height="406"></img>
            <p>
                Ler Bedger is a bedger (A giant badger with wings and 3 eyes) and a loyal member of the Resistance. He has tried to take over the resistance many times because he is the smartest person ever! In fact-
            </p>
            <p>
                Hey! What are you doing in here, Ler Bedger? Stop praising yourself! Anyway, Ler Bedger is a major character in the upcoming "Battle Team: War for Battalia" campaign!
            </p>
        </div>
    );
};

export default Home;
