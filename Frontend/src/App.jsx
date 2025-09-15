import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Login from './pages/Login';
import { AuthProvider } from "./context/AuthContext";
import Register from "./pages/Register";
import Navbar2 from "./components/Navbar/Navbar2"; // <-- Import Navbar2

function App() {
  return (
    <BrowserRouter>
      <Navbar2 /> {/* <-- Add this line */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;