import React, { useEffect, useState } from "react";
import socket from "../../socket";
import axiosInstance from "../../utils/axiosInstance";
import { userData } from "../../utils/data";
import ConversationsList from "../../components/chat/ConversationsList";
import "./chat.css";
import { Button } from "devextreme-react";
import { V } from "framer-motion/dist/types.d-B1Voffvi";
const Chat = () => {
  const [selectedUser, setSelectedUser] = useState<{
    _id: string;
    username: string;
  } | null>(null);
  const [conversationId, setConversationId] = useState("");
  const [messages, setMessages] = useState<
    {
      _id: string;
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

  const handleDelete = async (id: string) => {
    try {
      const res = await axiosInstance.delete(`api/messages/${id}`);
      console.log(res);
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (err) {
      console.error("خطأ في حذف الرسالة:", err);
    }
  };

  const handleEdit = (msg: any) => {
    const newText = prompt("تعديل الرسالة:", msg.text);
    if (newText && newText !== msg.text) {
      axiosInstance
        .put(`/api/messages/${msg._id}`, { text: newText })
        .then((res) => {
          setMessages((prev) =>
            prev.map((m) => (m._id === msg._id ? res.data : m))
          );
        })
        .catch((err) => {
          console.error("خطأ في تعديل الرسالة:", err);
        });
    }
  };

  const handleDeleteConversation = async () => {
    if (!conversationId) return;

    try {
      await axiosInstance.delete(`/api/conversations/${conversationId}`);
      setMessages([]);
      alert("تم حذف المحادثة");
    } catch (err) {
      console.error("❌ خطأ في حذف المحادثة:", err);
    }
  };

  return (
    <div className="chat-container">
      <ConversationsList selectConversation={handleSelectUser} />
      <div className="chat-box">
        <h3 style={{ marginTop: 0, position: "relative" }}>
          الدردشة مع: {selectedUser?.username || "..."}
          {conversationId && messages.length > 0 && (
            <Button
              type="danger"
              onClick={handleDeleteConversation}
              style={{ position: "absolute", left: 0 }}
              icon="trash"
              text="حذف المحادثة"
            />
          )}
        </h3>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message-box ${
                msg.sender._id === userData.id ? "my-message" : "their-message"
              }`}
            >
              <p>{msg.text}</p>
              {msg.sender._id === userData.id && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  <Button
                    stylingMode="outlined"
                    onClick={() => handleEdit(msg)}
                  >
                    تعديل
                  </Button>
                  <Button
                    stylingMode="outlined"
                    onClick={() => handleDelete(msg._id)}
                  >
                    حذف
                  </Button>
                </div>
              )}
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
