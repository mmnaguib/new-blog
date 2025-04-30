import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { baseURL, userData } from "../../utils/data";
import socket from "../../socket";
import UserIcon from "../../assetst/avatar.jpg";

const ConversationsList = ({
  selectConversation,
}: {
  selectConversation: any;
}) => {
  const [users, setUsers] = useState<
    { _id: string; username: string; image: string }[]
  >([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  // جلب قائمة المستخدمين (عدا المستخدم الحالي)
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axiosInstance.get("/api/auth/users");
      const otherUsers = res.data.filter(
        (u: { _id: any }) => u._id !== userData.id
      );
      setUsers(otherUsers);
    };
    fetchUsers();
  }, []);

  // متابعة المستخدمين الأونلاين
  useEffect(() => {
    socket.emit("getOnlineUsers");

    socket.on("onlineUsers", (online) => {
      setOnlineUsers(online);
    });

    return () => {
      socket.off("onlineUsers");
    };
  }, []);

  const isOnline = (id: string) => onlineUsers.includes(id); // تحقق إذا كان المستخدم أونلاين

  return (
    <div style={{ width: "250px", borderRight: "1px solid #ccc" }}>
      <h3>المستخدمون</h3>
      {users.map((user) => (
        <div
          key={user._id}
          onClick={() => selectConversation(user)}
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            padding: "10px",
            borderBottom: "1px solid #eee",
          }}
        >
          <img
            src={user.image ? baseURL + "/uploads/" + user.image : UserIcon}
            alt="avatar"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              marginRight: "10px",
            }}
          />
          <div>
            <div style={{ fontWeight: "bold" }}>{user.username}</div>
            <div
              style={{
                color: isOnline(user._id) ? "green" : "gray",
                fontSize: "12px",
              }}
            >
              {isOnline(user._id) ? "متصل الآن" : "غير متصل"}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConversationsList;
