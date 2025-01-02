// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    addDoc,
    collection,
    getFirestore,
    updateDoc,
} from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
import { doc, getDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDz8tuzHrZyDnmk5RgEJflyf5aO-gcqsls",
    authDomain: "battleteam2-75b9d.firebaseapp.com",
    projectId: "battleteam2-75b9d",
    storageBucket: "battleteam2-75b9d.firebasestorage.app",
    messagingSenderId: "816986316093",
    appId: "1:816986316093:web:91c522ad6163429ab87954",
    measurementId: "G-KVNJB1B4XM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

async function getCharacterData(characterId) {
    const docRef = doc(db, "characters", characterId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Character data:", docSnap.data());
        return docSnap.data();
    } else {
        console.log("No such character!");
        return null;
    }
}

async function setCharacterField(characterId, field, value) {
    const docRef = doc(db, "characters", characterId);
    await updateDoc(docRef, {
        [field]: value,
    });
}

async function createCharacter(name, level) {
    const docRef = await addDoc(collection(db, "characters"), {
        name: name,
        level: level,
        classes: [],
        exp: 0,
    });
    return docRef.id;
}

export { getCharacterData, setCharacterField, createCharacter };
