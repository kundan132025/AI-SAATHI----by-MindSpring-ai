import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Login from './pages/Login'
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DailyCheckinForm from "./components/DailyCheckinForm";
import { useContext } from "react";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
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
