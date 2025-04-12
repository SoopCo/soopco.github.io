import React, { useContext } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import {
    HashRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Characters from "./pages/Characters";
import Rulebooks from "./pages/Rulebooks";
import Storybooks from "./pages/Storybooks";
import Books from "./pages/Books";
import NotFound from "./pages/NotFound";
import News from "./pages/News";
import Character from "./pages/Character";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import BookManager from "./pages/BookManager";
import Book from "./pages/Book";
import NewsItem from "./pages/NewsItem";

const PrivateRoute = ({ element }) => {
    const { auth } = useContext(AuthContext);
    return auth ? element : <Navigate to="/login" />;
};

function App() {
    return (
        <div
            className="App"
            style={{
                backgroundColor: "lightgray",
                minHeight: "100vh",
                width: "100%",
                height: "100%",
                fontFamily: "Georgia, serif",
            }}
        >
            <AuthProvider>
                <Router>
                    <Navbar />
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route
                            exact
                            path="/characters"
                            element={<PrivateRoute element={<Characters />} />}
                        />
                        <Route
                            exact
                            path="/characters/:characterId"
                            element={<PrivateRoute element={<Character />} />}
                        />
                        <Route exact path="/storybooks" element={<Storybooks />} />
                        <Route
                            exact
                            path="/storybooks"
                            element={<Storybooks />}
                        />
                        <Route exact path="/rulebooks" element={<Rulebooks />} />
                        <Route
                            exact
                            path="/rulebooks"
                            element={<Rulebooks />}
                        />
                        <Route exact path="/books" element={<Books />} />
                        <Route
                            exact
                            path="/bookmanager"
                            element={<BookManager />}
                        />
                        <Route exact path="/book/:bookId" element={<Book />} />
                        <Route
                            exact
                            path="/newsItem/:newsId"
                            element={<NewsItem />}
                        />

                        <Route exact path="/news" element={<News />} />

                        <Route exact path="/signup" element={<Signup />} />
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="*" element={<NotFound />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </div>
    );
}

export default App;
