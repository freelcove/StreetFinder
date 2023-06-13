"use client";
import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';

const colors = [
  'bg-blue-500', 'bg-green-500', 'bg-cyan-500', 'bg-red-500',
  'bg-yellow-500', 'bg-pink-500', 'bg-orange-500', 'bg-teal-500'
];

type MessageType = 'JOIN' | 'CHAT' | 'LEAVE';

interface ChatMessage {
  sender: string;
  content: string;
  type: MessageType;
}

export default function Chat() {
  const [username, setUsername] = useState<string>('');
  const [connected, setConnected] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string>('');
  const stompClient = useRef<Client | null>(null);
  const messageAreaRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const connect = (event: React.FormEvent) => {
    event.preventDefault();
    if (username.trim()) {
      const socket = new SockJS('http://localhost:8080/ws');
      stompClient.current = new Client({
        webSocketFactory: () => socket,
        onConnect: onConnected,
        onStompError: (frame) => {
          setError('Could not connect to WebSocket server. Please refresh this page to try again!');
        },
      });
      stompClient.current.activate();
    } else {
      setError("Username cannot be empty");
    }
  };

  const disconnect = () => {
    if (stompClient.current) {
      stompClient.current.deactivate();
      setConnected(false);
    }
  };

  const onConnected = () => {
    if (stompClient.current) {
      stompClient.current.subscribe('/topic/public', onMessageReceived);

      stompClient.current.publish({
        destination: '/app/chat.addUser',
        body: JSON.stringify({ sender: username, type: 'JOIN' }),
      });

      setConnected(true);
    }
  };

  const onMessageReceived = (payload: IMessage) => {
    const message = JSON.parse(payload.body) as ChatMessage;
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    if (message.trim() && stompClient.current) {
      const chatMessage = {
        sender: username,
        content: message,
        type: 'CHAT'
      };
      stompClient.current.publish({
        destination: '/app/chat.sendMessage',
        body: JSON.stringify(chatMessage),
      });
      setMessage('');
    }
  };

  const getAvatarColor = (messageSender: string): string => {
    let hash = 0;
    for (let i = 0; i < messageSender.length; i++) {
      hash = 31 * hash + messageSender.charCodeAt(i);
    }
    const index = Math.abs(hash % colors.length);
    return colors[index];
  };

  return (
    <div className="p-4">
      {!connected ? (
        <div>
          <h1 className="text-xl">Type your username to enter the Chatroom</h1>
          <form onSubmit={connect} className="flex space-x-2 mt-4">
            <input
              type="text"
              placeholder="Username"
              className="p-2 border border-gray-300 rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">
              Start Chatting
            </button>
          </form>
          {error && <div className="mt-2 text-red-500">{error}</div>}
        </div>
      ) : (
        <div>
          <h2 className="text-xl">Chatroom</h2>
          <ul ref={messageAreaRef} className="h-64 mt-4 overflow-y-scroll border border-gray-300 p-2 rounded">
            {messages.map((message, i) => (
              <li key={i} className={message.type === 'JOIN' || message.type === 'LEAVE' ? 'text-blue-500' : 'text-black'}>
                {message.type === 'CHAT' && (
                  <>
                    <span className={`inline-block w-6 h-6 rounded mr-2 ${getAvatarColor(message.sender)}`}></span>
                    <span className="font-bold">{message.sender}</span>
                  </>
                )}
                <p className="ml-8">
                  {message.type === 'JOIN'
                    ? `${message.sender} joined!`
                    : message.type === 'LEAVE'
                    ? `${message.sender} left!`
                    : message.content}
                </p>
              </li>
            ))}
          </ul>
          <form onSubmit={sendMessage} className="flex space-x-2 mt-4">
            <input
              type="text"
              placeholder="Type a message..."
              className="p-2 border border-gray-300 rounded flex-grow"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};