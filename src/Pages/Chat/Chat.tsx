import React, { useEffect, useState } from "react";
import socket from "../../socket";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<
    { senderId: string; text: string }[]
  >([]);

  const userId = "123"; // خلي دي تيجي من الـ userData بتاعك طبعا

  useEffect(() => {
    socket.on("getMessage", (data) => {
      console.log("📥 رسالة جاية:", data);
      setChatMessages((prev) => [
        ...prev,
        { senderId: data.senderId, text: data.text },
      ]);
    });

    return () => {
      socket.off("getMessage"); // تنظيف بعد ما نخرج من الصفحة
    };
  }, []);

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("sendMessage", {
        senderId: userId,
        receiverId: "456", // ID بتاع الشخص اللي انت بتكلمه
        text: message,
      });
      setMessage("");
    }
  };

  return (
    <div>
      <h2>الدردشة</h2>
      <div
        style={{
          border: "1px solid gray",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        {chatMessages.map((msg, index) => (
          <div key={index}>
            <b>{msg.senderId}</b>: {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="اكتب رسالتك..."
      />
      <button onClick={handleSendMessage}>إرسال</button>
    </div>
  );
};

export default Chat;
