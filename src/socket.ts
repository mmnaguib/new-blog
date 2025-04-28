import { io } from "socket.io-client";
import { baseURL } from "./utils/data";

// لو شغال local أو production خليه ديناميك بعدين
const socket = io(baseURL, {
  transports: ["websocket"], // نقل مباشر
  reconnectionAttempts: 5, // يحاول يعمل اتصال لو انقطع
});

export default socket;
