import React, { useEffect } from "react";
import twev from "../images/twev.png";

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
            <img src={twev} alt="Twev, the leader of Battle Team #1." width="641" height="406"></img>
            <p>
                Twev is the leader of Battle Team #1, which was later adopted into Battle Team #2. He was the hero who managed to defeat Soop during the Second Great War.
            </p>
            <p>
                Twev might sometimes brag about accomplishments, but it's usually true.
            </p>
        </div>
    );
};

export default Home;
