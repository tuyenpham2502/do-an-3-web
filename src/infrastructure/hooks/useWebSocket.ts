/**
 * Hook to connect to a Socket.IO server
 */

import { Socket, io } from 'socket.io-client';

export const useWebSocket = ({ url = import.meta.env.VITE_APP_WEBSOCKET_URL }): Socket => {
  const socket = io(url, {
    transports: ['websocket'], // Enforce WebSocket transport
    reconnectionAttempts: 5, // Retry connection up to 5 times
    reconnectionDelay: 2000, // Wait 2 seconds between retries
  });

  socket.on('connect', () => {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.log('Connected to Socket.IO server');
  });

  socket.on('disconnect', () => {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.log('Disconnected from Socket.IO server');
  });

  socket.on('connect_error', (error) => {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error('Connection error:', error.message);
  });

  socket.on('error', (error) => {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error('Socket.IO error:', error);
  });

  socket.on('close', () => {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.warn('WebSocket connection closed unexpectedly.');
  });

  socket.on('reconnect_attempt', () => {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.log('Attempting to reconnect to WebSocket server...');
  });

  socket.on('reconnect_failed', () => {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error('Failed to reconnect to WebSocket server.');
  });

  return socket;
};
