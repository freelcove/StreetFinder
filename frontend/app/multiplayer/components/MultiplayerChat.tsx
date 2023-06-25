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
  const [messageContents, setMessageContents] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const messageAreaRef = useRef<HTMLUListElement | null>(null);
  const [chatVisible, setChatVisible] = useState(true);


  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [chatMessages]);

  useEffect(() => {
    if (stompClient.current && connected) {
      stompClient.current.subscribe('/topic/chat', onMessageReceived);
      console.log("chat subscription success");
    }

    return () => {
      if (stompClient.current) {
        stompClient.current.unsubscribe('/topic/chat');
      }
    };
  }, [stompClient, connected]);

  const onMessageReceived = (payload: IMessage) => {
    const message = JSON.parse(payload.body) as ChatMessage;
    setChatMessages((prevMessages) => [...prevMessages, message]);
  };


  function renderSystemMessageContent(systemMessage) {
    let textColor = '';
    switch (systemMessage.type) {
      case 'CONNECT':
        textColor = 'text-green-500';
        return <span className={textColor}>{systemMessage.sender} joined!</span>;
      case 'DISCONNECT':
        textColor = 'text-red-500';
        return <span className={textColor}>{systemMessage.sender} left!</span>;
      case 'WIN':
        textColor = 'text-yellow-500';
        return <span className={textColor}>{systemMessage.sender} won the game!</span>;
      default:
        textColor = 'text-gray-800';
        return <span className={textColor}>{systemMessage.content}</span>;
    }
  }

  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    if (messageContents.trim() && stompClient.current) {
      const chatMessage = {
        sender: username,
        content: messageContents,
        type: 'CHAT'
      };
      stompClient.current.publish({
        destination: '/app/chat.sendMessage',
        body: JSON.stringify(chatMessage),
      });
      setMessageContents('');
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
    <div className="p-4 bg-white bg-opacity-70">
      <button
        className="p-1 bg-blue-500 text-white rounded text-xs"
        onClick={() => setChatVisible(!chatVisible)}
      >
        {chatVisible ? 'Hide' : 'Show'}
      </button>
      <div className={`${chatVisible ? '' : 'hidden'}`}>
        <ul ref={messageAreaRef} className="h-64 mt-4 overflow-y-scroll border border-gray-300 p-2 rounded">
          {chatMessages.map((chatMessage, i) => (
            <li key={i} className={chatMessage.type === 'CHAT' ? 'text-black' : 'text-blue-500'}>
              {chatMessage.type === 'CHAT' && (
                <>
                  <span className={`inline-block w-6 h-6 rounded mr-2 ${getAvatarColor(chatMessage.sender)}`}></span>
                  <span className="font-bold">{chatMessage.sender}</span>
                </>
              )}
              <p className="ml-8">
                {renderSystemMessageContent(chatMessage)}
              </p>
            </li>
          ))}

        </ul>
        <form onSubmit={sendMessage} className="flex space-x-2 mt-4">
          <input
            type="text"
            placeholder="Type a message..."
            className="p-2 border border-gray-300 rounded flex-grow"
            value={messageContents}
            onChange={(e) => setMessageContents(e.target.value)}
          />
          {/* <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            Send
          </button> */}
        </form>
      </div>

    </div>
  );
};