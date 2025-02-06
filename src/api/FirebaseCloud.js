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
    getDocs,
    deleteDoc,
    Timestamp,
    orderBy,
    query,
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

async function getItemData(itemId) {
    console.log("item", itemId);
    const docRef = doc(db, "items", itemId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
}

async function setBook(bookId, data) {
    console.log("book", bookId);
    console.log("data", data);
    await setDoc(doc(db, "books", bookId), data);
}

async function setBookLink(bookId, link) {
    console.log("book", bookId);
    console.log("link", link);
    const docRef = doc(db, "books", bookId);
    await updateDoc(docRef, {
        link,
    });
}

async function getBooks() {
    const docRef = collection(db, "books");
    const docSnap = await getDocs(docRef);

    return docSnap.docs.map((d, i) => ({ ...d.data(), id: d.id }));
}

async function getBook(bookId) {
    console.log("book", bookId);
    const docRef = doc(db, "books", bookId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
}

async function deleteBook(bookId) {
    console.log("book", bookId);
    await deleteDoc(doc(db, "books", bookId));
}

async function setNewsItem(newsId, data) {
    console.log("news", newsId);
    console.log("data", data);
    const docRef = doc(db, "news", newsId);
    var newData = data;
    if (!docRef.exists()) {
        newData.timestamp = Timestamp.now();
    }
    await setDoc(docRef, newData);
}

async function setNewsLink(newsId, link) {
    console.log("news", newsId);
    console.log("link", link);
    const docRef = doc(db, "news", newsId);
    await updateDoc(docRef, {
        link,
    });
}

async function getNews() {
    const docRef = query(collection(db, "news"), orderBy("timestamp", "desc"));
    const docSnap = await getDocs(docRef);

    return docSnap.docs.map((d, i) => ({ ...d.data(), id: d.id }));
}

async function getNewsItem(newsId) {
    console.log("news", newsId);
    const docRef = doc(db, "news", newsId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
}

async function deleteNewsItem(newsId) {
    console.log("news", newsId);
    await deleteDoc(doc(db, "news", newsId));
}

export {
    getCharacterData,
    setCharacterField,
    createCharacter,
    createUser,
    addCharacterToUser,
    getUserData,
    getSkillData,
    getItemData,
    setBook,
    setBookLink,
    getBooks,
    getBook,
    deleteBook,
    setNewsItem,
    setNewsLink,
    getNews,
    getNewsItem,
    deleteNewsItem,
};
