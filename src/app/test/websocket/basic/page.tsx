// pages/DeskBookingTest.tsx
"use client";

import { useEffect, useState } from "react";

export default function DeskBookingTest() {
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Establish WebSocket connection
    const socketUrl = "ws://localhost:8080/ws/desk-availability";
    const websocket = new WebSocket(socketUrl);

    websocket.onopen = () => {
      setConnectionStatus("Connected");
      console.log("Connected to WebSocket");
    };

    websocket.onmessage = (event) => {
      console.log("Message received:", event.data);
      setReceivedMessages((prev) => [...prev, event.data]);
    };

    websocket.onclose = () => {
      setConnectionStatus("Disconnected");
      console.log("WebSocket connection closed");
    };

    websocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Store WebSocket instance in state
    setWs(websocket);

    // Cleanup WebSocket on unmount
    return () => {
      websocket.close();
    };
  }, []);

  // Function to send a message to the WebSocket server
  const sendMessage = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(message);
      setMessage(""); // Clear input after sending
    } else {
      console.log("WebSocket is not connected");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Desk Booking Test</h1>
      <p>Status: {connectionStatus}</p>

      <div className="mb-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
          className="p-2 border rounded mr-2"
        />
        <button
          onClick={sendMessage}
          className="p-2 bg-blue-500 text-white rounded"
          disabled={connectionStatus !== "Connected"}
        >
          Send Message
        </button>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Messages:</h2>
        {receivedMessages.length === 0 ? (
          <p>No messages received yet...</p>
        ) : (
          receivedMessages.map((msg, index) => (
            <div key={index} className="p-2 border bg-gray-100 rounded-md">
              {msg}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
