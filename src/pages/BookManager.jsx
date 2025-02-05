import React, { useState, useEffect, useContext } from "react";
// import { gapi } from "gapi-script"; // Google API client
import { AuthContext } from "../context/AuthContext";
import { getBooks, getUserData, setBook } from "../api/FirebaseCloud";
import { useNavigate } from "react-router-dom";
import Box from "../components/Box";

const BookManager = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const [books, setBooks] = useState([]);
    const [newBookId, setNewBookId] = useState("");
    const [newBookTitle, setNewBookTitle] = useState("");
    const [newBookLink, setNewBookLink] = useState("");
    const [newBookEnabled, setNewBookEnabled] = useState(false);
    const [booksCreated, setBooksCreated] = useState(0);

    const createBook = () => {
        setBook(newBookId, {
            title: newBookTitle,
            link: newBookLink.replace("edit?usp=sharing", "export?format=html"),
        });
        setNewBookId("");
        setNewBookTitle("");
        setNewBookLink("");
        setBooksCreated(booksCreated + 1);
    };

    useEffect(() => {
        document.title = `Battle Team - Admin Book Manager`;
    });

    useEffect(() => {
        if (auth !== null) {
            // TODO: Make it so only admins can access
            const fetchBooks = async () => {
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
            fetchBooks();
        } else {
            navigate("/");
        }
    }, [auth, booksCreated]);

    useEffect(() => {
        setNewBookEnabled(
            newBookId !== "" && newBookTitle !== "" && newBookLink !== ""
        );
    }, [newBookId, newBookTitle, newBookLink]);
    return (
        <div>
            <h1>Admin Book Manager</h1>
            <Box>
                <h2>Add Book</h2>
                <input
                    value={newBookId}
                    onChange={(e) => setNewBookId(e.target.value)}
                    placeholder="Book ID"
                />
                <input
                    value={newBookTitle}
                    onChange={(e) => setNewBookTitle(e.target.value)}
                    placeholder="Book Title"
                />
                <input
                    value={newBookLink}
                    onChange={(e) => setNewBookLink(e.target.value)}
                    placeholder="Book Link"
                />
                <button disabled={!newBookEnabled} onClick={createBook}>
                    Create Book!
                </button>
            </Box>
            {books.map((book) => (
                <Box key={book.title}>
                    <h2 onClick={() => navigate(`/book/${book.id}`)}>
                        {book.title}
                    </h2>
                    <p>Link: {book.link}</p>
                </Box>
            ))}
        </div>
    );
};

export default BookManager;
