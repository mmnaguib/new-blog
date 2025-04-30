import React, { useEffect, useState } from "react";
import socket from "../../socket";
import axiosInstance from "../../utils/axiosInstance";
import { userData } from "../../utils/data";
import ConversationsList from "../../components/chat/ConversationsList";

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState<{
    _id: string;
    username: string;
  } | null>(null);
  const [conversationId, setConversationId] = useState("");
  const [messages, setMessages] = useState<
    {
      sender: { _id: string; username: string };
      text: string;
      conversationId: string;
    }[]
  >([]);
  const [message, setMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState<
    { _id: string; username: string }[]
  >([]);

  const handleSelectUser = async (user: any) => {
    setSelectedUser(user);
    const res = await axiosInstance.post("/api/conversations", {
      senderId: userData.id,
      receiverId: user._id,
    });
    setConversationId(res.data._id);
    socket.emit("joinConversation", res.data._id);
    fetchMessages(res.data._id);
  };

  const fetchMessages = async (convId: string) => {
    const res = await axiosInstance.get(`/api/messages/${convId}`);
    setMessages(res.data);
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    const newMessage = {
      conversationId,
      sender: userData.id,
      receiverId: selectedUser?._id,
      text: message,
    };
    socket.emit("sendMessage", newMessage);
    setMessage("");
  };

  useEffect(() => {
    socket.emit("join", userData.id);

    socket.on("getMessage", (msg) => {
      if (msg.conversationId === conversationId) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    socket.on("updateOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("getMessage");
      socket.off("updateOnlineUsers");
    };
  }, [conversationId]);

  return (
    <div className="chat-container">
      <ConversationsList selectConversation={handleSelectUser} />
      <div className="chat-box">
        <h3>الدردشة مع: {selectedUser?.username || "..."}</h3>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message-box ${
                msg.sender._id === userData.id ? "my-message" : "their-message"
              }`}
            >
              <p>{msg.text}</p>
              <small>{msg.sender.username}</small>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="اكتب رسالة"
          />
          <button onClick={sendMessage}>إرسال</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
