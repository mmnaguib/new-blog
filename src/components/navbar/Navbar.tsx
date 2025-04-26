import { useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import { DropDownButton } from "devextreme-react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  const navigate = useNavigate();

  const checkLoginStatus = () => {
    const token = localStorage.getItem("newBlogToken");
    const userData = localStorage.getItem("loginUserData");

    setIsLoggedIn(!!token);
    if (userData) {
      const user = JSON.parse(userData);
      setUserRole(user.role);
    } else {
      setUserRole(null);
    }
  };

  useEffect(() => {
    checkLoginStatus();
    window.addEventListener("login", checkLoginStatus);

    return () => {
      window.removeEventListener("login", checkLoginStatus);
    };
  }, []);

  const profileMenuItems = [
    { id: 1, name: "الملف الشخصي", link: "/profile" },
    { id: 2, name: "الإعدادات", link: "/settings" },
    { id: 3, name: "تسجيل الخروج", action: "logout" }, // عنصر خاص
  ];

  const handleProfileMenuClick = (e: any) => {
    const { link, action } = e.itemData;

    if (action === "logout") {
      localStorage.removeItem("newBlogToken");
      localStorage.removeItem("loginUserData");
      localStorage.setItem("isLoggedIn", "false");
      window.dispatchEvent(new Event("login"));
      setIsLoggedIn(false);
      setUserRole(null);
      navigate("/login");
      return;
    }

    if (link) {
      navigate(link);
    }
  };
  return (
    <nav className="navbar">
      <h1>📘 My Blog</h1>
      <div className="links">
        <NavLink to="/">الرئيسية</NavLink>
        {userRole === "admin" && <NavLink to="/admin">لوحة التحكم</NavLink>}
        {!isLoggedIn && <NavLink to="/login">تسجيل الدخول</NavLink>}
        {isLoggedIn && (
          <DropDownButton
            text="الحساب"
            items={profileMenuItems}
            displayExpr="name"
            keyExpr="id"
            onItemClick={handleProfileMenuClick}
            stylingMode="text"
            icon="user"
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
