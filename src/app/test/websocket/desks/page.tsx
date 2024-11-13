// pages/DeskBookingTest.tsx

"use client";

import { useEffect, useState } from "react";

interface Desk {
  id: string;
  isAvailable: boolean;
}

export default function DeskBookingTest() {
  const [desks, setDesks] = useState<Desk[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Function to establish a new WebSocket connection with heartbeat and reconnect
  const connectWebSocket = () => {
    const socketUrl = "ws://localhost:8080/ws/desk-availability";
    const websocket = new WebSocket(socketUrl);

    websocket.onopen = () => {
      console.log("Connected to WebSocket");
      setIsConnected(true);

      // Send a heartbeat ping every 30 seconds
      const heartbeat = setInterval(() => {
        if (websocket.readyState === WebSocket.OPEN) {
          websocket.send(JSON.stringify({ type: "ping" }));
        }
      }, 30000);

      // Clear the heartbeat interval on close
      websocket.onclose = () => {
        clearInterval(heartbeat);
        console.log("WebSocket connection closed");
        setIsConnected(false);

        // Attempt reconnection after 5 seconds
        setTimeout(() => connectWebSocket(), 5000);
      };
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data) as Desk;
      console.log("Desk update received:", data);

      // Update desk status in the state
      setDesks((prevDesks) => {
        const index = prevDesks.findIndex((desk) => desk.id === data.id);
        if (index > -1) {
          const updatedDesks = [...prevDesks];
          updatedDesks[index] = data;
          return updatedDesks;
        } else {
          return [...prevDesks, data];
        }
      });
    };

    websocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setWs(websocket);
  };

  // Start the WebSocket connection on component mount
  useEffect(() => {
    connectWebSocket();
    return () => ws?.close();
  }, []);

  // Function to send a booking or release message
  const handleSendMessage = (action: "book" | "release", deskId: string) => {
    if (ws && isConnected) {
      const payload = JSON.stringify({ action, deskId });
      ws.send(payload);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Desk Booking Test</h1>
      <p className="mb-4">Status: {isConnected ? "Connected" : "Disconnected"}</p>

      <div className="grid grid-cols-3 gap-4">
        {desks.map((desk) => (
          <div
            key={desk.id}
            className={`p-4 rounded shadow-md transition-colors duration-200 ${
              desk.isAvailable ? "bg-green-200" : "bg-red-200"
            }`}
          >
            <p>{`Desk ID: ${desk.id}`}</p>
            <p>{`Available: ${desk.isAvailable ? "Yes" : "No"}`}</p>
            <div className="mt-2">
              {desk.isAvailable ? (
                <button
                  onClick={() => handleSendMessage("book", desk.id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  Book Desk
                </button>
              ) : (
                <button
                  onClick={() => handleSendMessage("release", desk.id)}
                  className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-700"
                >
                  Release Desk
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
