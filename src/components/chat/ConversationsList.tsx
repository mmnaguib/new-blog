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

  useEffect(() => {
    socket.emit("getOnlineUsers");

    socket.on("onlineUsers", (online) => {
      setOnlineUsers(online);
    });

    return () => {
      socket.off("onlineUsers");
    };
  }, []);

  const isOnline = (id: string) => onlineUsers.includes(id);

  return (
    <div className="chatSidebar">
      <h3>المستخدمون</h3>
      {users.map((user) => (
        <div
          key={user._id}
          onClick={() => selectConversation(user)}
          className="userBox"
        >
          <img
            src={user.image ? baseURL + "/uploads/" + user.image : UserIcon}
            alt="avatar"
          />
          <div>
            <div style={{ fontWeight: "bold" }}>{user.username}</div>
            <div
              style={{
                color: isOnline(user._id) ? "green" : "gray",
                fontSize: "12px",
              }}
            >
              {isOnline(user._id) && <span className="onlineNow"></span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConversationsList;
