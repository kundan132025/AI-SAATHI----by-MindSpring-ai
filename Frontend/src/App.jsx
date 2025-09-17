import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
<<<<<<< HEAD
import Login from './pages/Login'
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DailyCheckinForm from "./components/DailyCheckinForm";
import { useContext } from "react";
=======
import Login from './pages/Login';
import { AuthProvider } from "./context/AuthContext";
import Register from "./pages/Register";
import Navbar2 from "./components/Navbar/Navbar2"; // <-- Import Navbar2
>>>>>>> 0c8029bd46c74c89c922e1f81ce32960251f92d4

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Navbar2 /> {/* <-- Add this line */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard userId={user?.id || user?._id} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;