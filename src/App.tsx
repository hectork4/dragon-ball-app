import { Route } from "wouter";
import { SessionContextProvider } from "./context/UserContext";
import Home from "./pages/Home";
import Detail from "./pages/Details";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
      <SessionContextProvider>
        <div className="App">
          <Navbar />
          <Route path="/" component={Home} />
          <Route path="/character/:id" component={Detail} />
        </div>
      </SessionContextProvider>
  );
}

export default App;
