import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import { DropDownButton } from "devextreme-react";
import { profileMenuItems } from "../../utils/data";
import Notifications from "./Notifications";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const userData = JSON.parse(localStorage.getItem("loginUserData") || "{}");
  const navigate = useNavigate();
  const [notificationDropDown, setNotificationDropDown] =
    useState<boolean>(false);

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
            text="حسابك"
            items={profileMenuItems}
            displayExpr="name"
            keyExpr="id"
            onItemClick={handleProfileMenuClick}
            stylingMode="text"
            icon="user"
            style={{ color: "white" }}
          />
        )}
        {userData.id && (
          <div style={{ position: "relative" }}>
            <Notifications
              notificationDropDown={notificationDropDown}
              setNotificationDropDown={setNotificationDropDown}
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
