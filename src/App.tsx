import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./Pages/home/Blogs";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import AdminDashboard from "./Pages/AdminDashboard";
import "devextreme/dist/css/dx.light.css";
import Blog from "./Pages/home/Blog";
import { ToastContainer } from "react-toastify";
import NewPost from "./Pages/home/NewPost";
import Profile from "./Pages/profile/Profile";
import UserProfile from "./Pages/profile/User";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/:id" element={<Blog />} />
            <Route path="/create" element={<NewPost />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="profile/:id" element={<UserProfile />} />
            {/* Add other routes here */}
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
