import React, { useState, useEffect, useContext } from "react";
// import { gapi } from "gapi-script"; // Google API client
import { AuthContext } from "../context/AuthContext";
import {
    deleteBook,
    getBooks,
    getUserData,
    setBook,
} from "../api/FirebaseCloud";
import { useNavigate } from "react-router-dom";
import ContentAdder from "../components/ContentAdder";
import ContentElement from "../components/ContentElement";

const BookManager = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const [books, setBooks] = useState([]);

    const refreshBooks = async () => {
        const admin = (await getUserData(auth.username)).admin;
        console.log(admin);
        if (!admin) {
            console.log("Sorry, you are not an admin.");
            navigate("/");
            return;
        }
        const books = await getBooks();
        console.log(books);
        setBooks(books);
    };

    const createBook = (newBookId, newBookTitle, newBookLink) => {
        setBook(newBookId, {
            title: newBookTitle,
            link: newBookLink
                .replace("edit", "export")
                .replace("usp=", "format=html&usp="),
        });
        refreshBooks();
    };

    useEffect(() => {
        document.title = `Battle Team - Admin Book Manager`;
    });

    useEffect(() => {
        if (auth !== null) {
            refreshBooks();
        } else {
            navigate("/");
        }
    }, [auth]);

    return (
        <div>
            <h1>Admin Book Manager</h1>
            <ContentAdder onSubmit={createBook} title="Book" />
            {books.map((book) => (
                <ContentElement
                    key={book.id}
                    content={book}
                    onClick={() => navigate(`/book/${book.id}`)}
                    onDelete={() => {
                        deleteBook(book.id);
                        refreshBooks();
                    }}
                />
            ))}
        </div>
    );
};

export default BookManager;
