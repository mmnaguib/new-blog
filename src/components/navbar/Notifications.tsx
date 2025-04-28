import React, { useEffect, useState } from "react";
import { INotification } from "../../interfaces";
import axiosInstance from "../../utils/axiosInstance";
import { getTimeDifference } from "../../utils";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ضروري عشان شكل التوست يطلع
import { baseURL } from "../../utils/data";

const socket = io(baseURL); // غير اللينك حسب سيرفرك

const Notifications = ({
  setNotificationDropDown,
  notificationDropDown,
}: {
  setNotificationDropDown: (val: boolean) => void;
  notificationDropDown: boolean;
}) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const userData = JSON.parse(localStorage.getItem("loginUserData") || "{}");

  const getAllNotifiactions = async (userId: string) => {
    const res = await axiosInstance.get(`api/notifications/${userId}`);
    setNotifications(res.data);
  };

  useEffect(() => {
    if (userData.id) {
      getAllNotifiactions(userData.id);

      socket.on("newNotification", (data) => {
        if (data.userId === userData.id) {
          setNotifications((prev) => [data.notification, ...prev]);

          toast.info(`${data.notification.message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
    }

    return () => {
      socket.off("newNotification");
    };
  }, [userData.id]);

  const notificationContent =
    notifications && notifications.length > 0 ? (
      notifications.map((notification) => {
        return (
          <React.Fragment key={notification._id}>
            <div
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
          </React.Fragment>
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
    <>
      <i
        className="fa-solid fa-bell fa-2x"
        onClick={() => setNotificationDropDown(!notificationDropDown)}
      ></i>
      {notificationDropDown && (
        <div className="notificationDropdown">{notificationContent}</div>
      )}
    </>
  );
};

export default Notifications;
