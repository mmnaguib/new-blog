import { Link, NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = () => (
  <nav className="navbar">
    <h1>📘 My Blog</h1>
    <div className="links">
      <NavLink to="/">الرئيسية</NavLink>
      <NavLink to="/admin">لوحة التحكم</NavLink>
      <NavLink to="/login">تسجيل الدخول</NavLink>
    </div>
  </nav>
);

export default Navbar;
