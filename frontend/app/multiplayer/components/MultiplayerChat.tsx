"use client";
import { useState, useEffect, useRef, useContext } from 'react';
import { IMessage } from '@stomp/stompjs';
import { useSession } from 'next-auth/react';
import { MultiplayerGameContext } from '../context/MultiplayerGameContext';

const colors = [
  'bg-blue-500', 'bg-green-500', 'bg-cyan-500', 'bg-red-500',
  'bg-yellow-500', 'bg-pink-500', 'bg-orange-500', 'bg-teal-500'
];

interface ChatMessage {
  sender: string;
  content: string;
  type: 'CHAT' | 'CONNECT' | 'DISCONNECT' | 'WIN';
}

export default function MultiplayerChat() {
  const { stompClient, connected } = useContext(MultiplayerGameContext);
  const { data: session } = useSession();
  const username = session?.user?.name || '';
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messageAreaRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (stompClient.current && connected) {
      stompClient.current.subscribe('/topic/public', onMessageReceived);
      console.log("chat subscription success");
    }

    return () => {
      if (stompClient.current) {
        stompClient.current.unsubscribe('/topic/public');
      }
    };
  }, [stompClient, connected]);

  const onMessageReceived = (payload: IMessage) => {
    const message = JSON.parse(payload.body) as ChatMessage;
    setMessages((prevMessages) => [...prevMessages, message]);

    switch (message.type) {
      case 'CONNECT':
        console.log(`${message.sender} has connected!`);
        // handle CONNECT message type here
        break;
      case 'DISCONNECT':
        console.log(`${message.sender} has disconnected!`);
        // handle DISCONNECT message type here
        break;
      case 'CHAT':
        console.log(`${message.sender} says: ${message.content}`);
        // handle CHAT message type here
        break;
      case 'WIN':
        console.log(`${message.sender} has won!`);
        // handle WIN message type here
        break;
      default:
        console.error(`Unknown message type: ${message.type}`);
    }
  };


  function renderMessageContent(message) {
    let textColor = '';
    switch (message.type) {
      case 'CONNECT':
        textColor = 'text-green-500';
        return <span className={textColor}>{message.sender} joined!</span>;
      case 'DISCONNECT':
        textColor = 'text-red-500';
        return <span className={textColor}>{message.sender} left!</span>;
      case 'WIN':
        textColor = 'text-yellow-500';
        return <span className={textColor}>{message.sender} won the game!</span>;
      default:
        textColor = 'text-gray-800';
        return <span className={textColor}>{message.content}</span>;
    }
  }

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

      <div>
        <h2 className="text-xl">Chatroom</h2>
        <ul ref={messageAreaRef} className="h-64 mt-4 overflow-y-scroll border border-gray-300 p-2 rounded">
          {messages.map((message, i) => (
            <li key={i} className={message.type === 'CHAT' ? 'text-black' : 'text-blue-500'}>
              {message.type === 'CHAT' && (
                <>
                  <span className={`inline-block w-6 h-6 rounded mr-2 ${getAvatarColor(message.sender)}`}></span>
                  <span className="font-bold">{message.sender}</span>
                </>
              )}
              <p className="ml-8">
                {renderMessageContent(message)}
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

    </div>
  );
};