import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { CreateAuction } from "./components/CreateAuction/CreateAuction";
import { Auction } from "./components/Auction/Auction";
import { Default } from "./components/Default/Default";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Default />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<CreateAuction />} />
        <Route path="/auction" element={<Auction />} />
      </Routes>
    </Router>
  );
}
