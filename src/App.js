import { Link } from "react-router-dom";
import Home from "./pages/Home";
import Router from "./router";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Router />
    </div>
  );
}

export default App;
