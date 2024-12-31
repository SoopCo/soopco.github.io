import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";

function App() {
    return (
        <div
            className="App"
            style={{
                backgroundColor: "lightblue",
                width: "100vw",
                height: "100vh",
            }}
        >
            <Header />
        </div>
    );
}

export default App;
