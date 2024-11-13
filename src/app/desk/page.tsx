"use client";

import { useEffect, useState } from 'react';

export default function DeskAvailability() {
  const [deskUpdates, setDeskUpdates] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState('');
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // Define the WebSocket URL
    const socketUrl = 'ws://localhost:8080/ws/desk-availability';
    const websocket = new WebSocket(socketUrl);

    // Set the WebSocket instance in state
    setWs(websocket);

    // Event handler for opening the WebSocket connection
    websocket.onopen = () => {
      console.log('Connected to WebSocket');
      setIsConnected(true);
    };

    // Event handler for receiving messages from the WebSocket
    websocket.onmessage = (event) => {
      const messageData = event.data; // No JSON parsing needed
      console.log('Message received:', messageData);

      // Update the deskUpdates state with the new message
      setDeskUpdates((prevUpdates) => [...prevUpdates, messageData]);
    };

    // Event handler for WebSocket close
    websocket.onclose = () => {
      console.log('WebSocket connection closed');
      setIsConnected(false);
    };

    // Event handler for WebSocket errors
    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Clean up the WebSocket connection on component unmount
    return () => {
      websocket.close();
    };
  }, []);

  // Function to handle sending a message to the WebSocket
  const sendMessage = () => {
    if (ws && isConnected) {
      ws.send(message); // Send plain string
      setMessage(''); // Clear the input field after sending
    } else {
      console.log('WebSocket is not connected');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Desk Availability</h1>

      <p className="mb-4">
        Status: {isConnected ? 'Connected to WebSocket' : 'Disconnected'}
      </p>

      <div className="mb-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="p-2 border rounded mr-2"
        />
        <button
          onClick={sendMessage}
          className="p-2 bg-blue-500 text-white rounded"
          disabled={!isConnected}
        >
          Send Message
        </button>
      </div>

      <div className="space-y-2">
        {deskUpdates.length === 0 ? (
          <p>No updates yet...</p>
        ) : (
          deskUpdates.map((update, index) => (
            <div
              key={index}
              className="p-2 border-b border-gray-200 bg-gray-100 rounded-md shadow-sm"
            >
              {update}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
