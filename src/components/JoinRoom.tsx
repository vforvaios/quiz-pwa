import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { socket } from "@/services/socket";

export default function JoinRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("join-room", roomId);

    socket.on("room-ready", () => {
      navigate("/game");
    });

    return () => {
      socket.off("room-ready");
    };
  }, [roomId, navigate]);

  return (
    <div className="min-h-[calc(100vh-130px)] flex items-center justify-center text-white text-center">
      <p className="text-lg">⏳ Συνδέεσαι στο quiz...</p>
    </div>
  );
}
