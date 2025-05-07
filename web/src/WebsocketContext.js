import React, { createContext, useRef, useEffect } from 'react';

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const ws = useRef(null);

  useEffect(() => {
    // Get the token from localStorage
    const token = localStorage.getItem("go-chat-token");

    // Only attempt to connect if we have a token
    if (token) {
      const env = process.env.REACT_APP_NGINX_ENV || 'local';
      const host = process.env.REACT_APP_NGINX_HOST || 'localhost';
      const port = process.env.REACT_APP_NGINX_PORT || '3001';

      const serverUrl = env === 'local' ?
        `ws://${host}:${port}/ws/chat` : `wss://${host}/ws/chat`;

      // Add the token as a query parameter
      const wsUrl = `${serverUrl}?token=${token}`;
      console.log("Connecting to WebSocket with URL:", wsUrl);

      try {
        ws.current = new WebSocket(wsUrl);

        ws.current.onopen = () => {
          console.log("WebSocket connection established");
        };

        ws.current.onerror = (error) => {
          console.error("WebSocket connection error:", error);
        };
      } catch (error) {
        console.error("Error creating WebSocket connection:", error);
      }
    } else {
      console.log("No authentication token found. WebSocket connection not established.");
    }

    return () => {
      console.log('Closing WebSocket connection...');
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  return (
    <WebSocketContext.Provider value={ws}>
      {children}
    </WebSocketContext.Provider>
  );
};