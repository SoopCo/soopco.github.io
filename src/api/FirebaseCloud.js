// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    addDoc,
    arrayUnion,
    collection,
    getFirestore,
    setDoc,
    updateDoc,
    doc,
    getDoc,
} from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
import { sha256 } from "crypto-hash";

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
        return { id: characterId, ...docSnap.data() };
    } else {
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
        attributes: {
            agi: 15,
            dex: 10,
            str: 0,
            per: 10,
            luk: 0,
            vit: 10,
            wis: 10,
            int: 10,
        },
        inventory: [],
        currency: {
            copper: 0,
            silver: 0,
            gold: 0,
            platinum: 0,
            emerald: 0,
            diamond: 0,
        },
        resistanceBonuses: {},
        poolValues: { hp: 100, mana: 100 },
        skills: [{ unarmedattack: 0, magicbolt: 1 }],
    });
    return docRef.id;
}

async function createUser(username, password) {
    await setDoc(doc(db, "users", username), {
        username: username,
        password: await sha256(password),
        characters: [],
        admin: false,
    });
}

async function addCharacterToUser(username, characterId) {
    const docRef = doc(db, "users", username);
    await updateDoc(docRef, {
        characters: arrayUnion(characterId),
    });
}

async function getUserData(username) {
    const docRef = doc(db, "users", username);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
}

async function getSkillData(skillId) {
    const docRef = doc(db, "skills", skillId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
}

export {
    getCharacterData,
    setCharacterField,
    createCharacter,
    createUser,
    addCharacterToUser,
    getUserData,
    getSkillData,
};
