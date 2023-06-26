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
  
  userId: string;
  username: string;
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
        return <span className={textColor}>{systemMessage.username} joined!</span>;
      case 'DISCONNECT':
        textColor = 'text-yellow-500';
        return <span className={textColor}>{systemMessage.username} left!</span>;
      case 'WIN':
        textColor = 'text-red-500';
        return <span className={textColor}>{systemMessage.username} won the game!</span>;
      case 'CHAT':
        textColor = 'text-gray-800';
        return <span className={textColor}>{systemMessage.username}: {systemMessage.content}</span>;
      default:
        textColor = 'text-gray-800';
        return <span className={textColor}>{systemMessage.content}</span>;
    }
  }

  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    if (messageContents.trim() && stompClient.current) {
      const chatMessage = {
        username: username,
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



  return (
    <div className="p-1 bg-white bg-opacity-80 hover:bg-opacity-100">
      {/* <button
        className="p-1 bg-blue-500 text-white rounded text-xs"
        onClick={() => setChatVisible(!chatVisible)}
      >
        {chatVisible ? 'Hide' : 'Show'}
      </button> */}
      <div className={`${chatVisible ? '' : 'hidden'}`}>
        <ul ref={messageAreaRef} className="h-64 overflow-y-scroll p-2 rounded">
          {chatMessages.map((chatMessage, i) => (
            <li key={i}>
                {renderSystemMessageContent(chatMessage)}
            </li>
          ))}

        </ul>
        <form onSubmit={sendMessage} className="flex mt-4">
          <input
            type="text"
            placeholder="Type a message..."
            className="p-1 border border-gray-300 rounded flex-grow"
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