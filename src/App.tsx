import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { CreateAuction } from "./components/CreateAuction/CreateAuction";
import { Auction } from "./components/Auction/Auction";
import { Default } from "./components/Default/Default";
import { Loading } from "./components/shared/Loading/Loading";
import { Login } from "./components/Login/Login";

export default function App() {
  if (process.env.NODE_ENV !== "production") {
    require("dotenv");
    require("fs");
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Default />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<CreateAuction />} />
        <Route path="/auction" element={<Auction />} />
        <Route path="/login" element={<Login />} />
        {/* Add Testing UI component to this route 
            Remove the route before prod */}
        <Route path="/test" element={<Loading />} />
      </Routes>
    </Router>
  );
}
