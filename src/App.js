import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
    return (
        <div
            className="App"
            style={{
                backgroundColor: "lightblue",
                width: "100%",
                height: "100%",
            }}
        >
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    {/* <Route path="/about" element={<About />} />
                <Route
                    path="/contact"
                    element={<Contact />}
                />
                <Route path="/blogs" element={<Blogs />} />
                <Route
                    path="/sign-up"
                    element={<SignUp />}
                /> */}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
