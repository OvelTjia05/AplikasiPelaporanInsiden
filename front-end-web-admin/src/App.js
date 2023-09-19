import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import DashBoard from "./screens/DashBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/DashBoard" element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
