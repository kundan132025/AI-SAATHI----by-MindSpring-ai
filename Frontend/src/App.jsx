import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useContext, Suspense } from "react";
import { lazy } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";

// Lazy load page components for code splitting
const Home = lazy(() => import("./pages/Home"));
const Chat = lazy(() => import("./pages/Chat"));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Stories = lazy(() => import("./pages/Stories"));
const DailyCheckinForm = lazy(() => import("./components/DailyCheckinForm"));
const AuthCallback = lazy(() => import("./pages/AuthCallback"));

// Loading fallback component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    <span className="ml-3 text-lg text-gray-600">Loading...</span>
  </div>
);

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard userId={user?.id || user?._id} />} />
          <Route path="/stories" element={<Stories />} />
          {/* Catch-all route for 404 handling */}
          <Route path="*" element={<div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
              <p className="mb-4">The page you're looking for doesn't exist.</p>
              <Link to="/" className="text-blue-500 hover:underline">Go Home</Link>
            </div>
          </div>} />
          {/* Add DailyCheckinForm route if needed */}
          {/* <Route path="/checkin" element={<DailyCheckinForm userId={user?.id || user?._id} />} /> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

// Wrap App with AuthProvider at the top level (in main.jsx or index.jsx)
export default App;