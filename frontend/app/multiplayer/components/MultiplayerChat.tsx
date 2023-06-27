"use client";
import { useState, useEffect, useRef, useContext } from 'react';
import { IMessage } from '@stomp/stompjs';
import { useSession } from 'next-auth/react';
import { MultiplayerGameContext } from '../context/MultiplayerGameContext';

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


  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [chatMessages]);

  useEffect(() => {
    const currentStompClient = stompClient.current;
    if (currentStompClient && connected) {
      currentStompClient.subscribe('/topic/chat', onMessageReceived);
      console.log("chat subscription success");
    }

    return () => {
      if (currentStompClient) {
        currentStompClient.unsubscribe('/topic/chat');
      }
    };
  }, [stompClient, connected]);


  const onMessageReceived = (payload: IMessage) => {
    const message = JSON.parse(payload.body) as ChatMessage;
    setChatMessages((prevMessages) => [...prevMessages, message]);
  };


  function renderSystemMessageContent(systemMessage: ChatMessage) {
    let textColor = '';
    switch (systemMessage.type) {
      case 'CONNECT':
        textColor = 'text-green-500';
        return <span className={`${textColor} w-full break-words`}>{systemMessage.username} joined!</span>;
      case 'DISCONNECT':
        textColor = 'text-yellow-500';
        return <span className={`${textColor}  w-full break-words`}>{systemMessage.username} left!</span>;
      case 'WIN':
        textColor = 'text-red-500';
        return <span className={`${textColor}  w-full break-words`}>{systemMessage.username} won the game!</span>;
      case 'CHAT':
        return (
          <>
            <span className="text-blue-500 w-full whitespace-nowrap">{systemMessage.username}</span>:
            <span className="text-gray-800 w-full break-words ml-1">{systemMessage.content}</span>
          </>
        );

      default:
        textColor = 'text-gray-800';
        return <span className={`${textColor}  w-full break-words`}>{systemMessage.content}</span>;
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
    <div className="p-1 w-full h-full flex flex-col bg-white">
      <ul ref={messageAreaRef} className="h-full w-full overflow-y-scroll p-2 rounded">
        {chatMessages.map((chatMessage, i) => (
          <li key={i}>
            {renderSystemMessageContent(chatMessage)}
          </li>
        ))}
      </ul>
      <form onSubmit={sendMessage} className="flex mt-1">
        <input
          type="text"
          placeholder="Type a message..."
          className="p-1 border border-gray-300 rounded flex-grow overflow-auto"
          value={messageContents}
          onChange={(e) => setMessageContents(e.target.value)}
        />
      </form>
    </div>
  );

};