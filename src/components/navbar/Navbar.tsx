import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import { DropDownButton } from "devextreme-react";
import { profileMenuItems } from "../../utils/data";
import axiosInstance from "../../utils/axiosInstance";
import { INotification } from "../../interfaces";
import { getTimeDifference } from "../../utils";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const userData = JSON.parse(localStorage.getItem("loginUserData") || "{}");
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

  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [notificationDropDown, setNotificationDropDown] = useState(false);
  const getAllNotifiactions = async (userId: string) => {
    const res = await axiosInstance.get(`api/notifications/${userId}`);
    setNotifications(res.data);
  };

  useEffect(() => {
    if (userData.id) getAllNotifiactions(userData.id);
  }, [userData.id]);

  const notificationContent =
    notifications && notifications.length > 0 ? (
      notifications.map((notification) => {
        return (
          <>
            <div
              key={notification._id}
              className={`notification-item ${
                notification.isRead ? "read" : "unread"
              }`}
              onClick={() => readNotification(notification._id)}
            >
              <a href={`/${notification.postId}`} style={{ color: "black" }}>
                {notification.message}
              </a>
              <br />
              <span className="notificationDate">
                {getTimeDifference(notification.date)}
              </span>
            </div>
            <hr style={{ width: "100%", margin: "0" }} />
          </>
        );
      })
    ) : (
      <div style={{ background: "#fff", padding: "10px" }}>
        لا توجد إشعارات جديدة
      </div>
    );

  const readNotification = async (notificationId: string) => {
    await axiosInstance.put(`api/notifications/${notificationId}/read`);
    getAllNotifiactions(userData.id);
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
            <i
              className="fa-solid fa-bell fa-2x"
              onClick={() => setNotificationDropDown((prev) => !prev)}
            ></i>
            {notificationDropDown && (
              <div className="notificationDropdown">{notificationContent}</div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
