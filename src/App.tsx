import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./Pages/home/Home";
import Login from "./Pages/login/Login";
import Register from "./Pages/Register";
import AdminDashboard from "./Pages/AdminDashboard";
import "devextreme/dist/css/dx.light.css";
function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {<Route path="/admin" element={<AdminDashboard />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
