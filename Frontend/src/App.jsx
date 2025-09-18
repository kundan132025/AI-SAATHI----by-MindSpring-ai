import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Login from './pages/Login';
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DailyCheckinForm from "./components/DailyCheckinForm";
import Navbar2 from "./components/Navbar/Navbar2";
import { AuthProvider, AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Navbar2 />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard userId={user?.id || user?._id} />} />
        {/* Add DailyCheckinForm route if needed */}
        {/* <Route path="/checkin" element={<DailyCheckinForm userId={user?.id || user?._id} />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

// Wrap App with AuthProvider at the top level (in main.jsx or index.jsx)
export default App;