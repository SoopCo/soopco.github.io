import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Characters from "./pages/Characters";
import Books from "./pages/Books";
import NotFound from "./pages/NotFound";
function App() {
    return (
        <div
            className="App"
            style={{
                backgroundColor: "lightblue",
                minHeight: "100vh",
                width: "100%",
                height: "100%",
            }}
        >
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/characters" element={<Characters />} />
                    <Route exact path="/books" element={<Books />} />
                    <Route exact path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
