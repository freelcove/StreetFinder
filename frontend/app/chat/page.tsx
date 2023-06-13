"use client";

import React, { useEffect, useState } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const ChatComponent: React.FC = () => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        client.subscribe('/topic/messages', (message: IMessage) => {
          if (message.body) {
            setMessages((prevMessages) => [...prevMessages, message.body]);
          }
        });
      },
    });
    client.activate();

    setStompClient(client);

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, []);

  const sendMessage = () => {

    if (stompClient && stompClient.connected) {
        stompClient.publish({ destination: '/app/chat', body: newMessage });
        setNewMessage('');
    } else {
        console.error('STOMP client is not connected');
    }

  };

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatComponent;
