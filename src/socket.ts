import { io } from "socket.io-client";

const socket = io("https://quiz-api-lime.vercel.app");

export default socket;
