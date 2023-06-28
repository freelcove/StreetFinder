"use client";
import { useState, useEffect, useRef, useContext, useCallback, memo } from 'react';
import { IMessage } from '@stomp/stompjs';
import { useSession } from 'next-auth/react';
import { MultiplayerGameContext } from '../context/MultiplayerGameContext';

interface IChatMessage {
  id: string;
  name: string;
  color: string;
  content: string;
  type: 'CHAT' | 'CONNECT' | 'DISCONNECT' | 'WIN';
}

interface ChatMessageProps {
  message: IChatMessage;
}

export default function MultiplayerChat() {
  const { stompClient, connected, users } = useContext(MultiplayerGameContext);
  const { data: session } = useSession();
  const [userId, setUserId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userColor, setUserColor] = useState<string>('');
  const [messageContents, setMessageContents] = useState<string>('');

  const messageAreaRef = useRef<HTMLUListElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([]);

  // Wrapped component in memo to prevent unnecessary re-renders
  const ChatMessage = memo(({ message }: ChatMessageProps) => (
    <li className="break-words w-full">{getMessageContent(message)}</li>
  ));
  const [canSendMessage, setCanSendMessage] = useState(true);


  // Listening for session changes to update user's name and color
  useEffect(() => {
    if (session) {
      setUserId(session?.user?.id);
      setUserName(session?.user?.name);
      setUserColor(session?.user?.color);
    }
  }, [session]);

  // Setting focus on chat input field on mount
  useEffect(() => {

    if (inputRef.current) {
      inputRef.current?.focus();
    }
    console.log(users);
  }, []);

  // Auto-scroll to the latest chat message
  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Setup and teardown chat subscription
  useEffect(() => {
    const currentStompClient = stompClient.current;
    if (currentStompClient && connected) {
      currentStompClient.subscribe('/topic/chat', onMessageReceived);
    }

    return () => {
      if (currentStompClient) {
        currentStompClient.unsubscribe('/topic/chat');
      }
    };
  }, [stompClient, connected]);

  // Handle new chat messages
  const onMessageReceived = useCallback((payload: IMessage) => {
    const message = JSON.parse(payload.body) as IChatMessage;
    setChatMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  // Render messages according to type
  const getMessageContent = useCallback((chatMessage: IChatMessage) => {
    switch (chatMessage.type) {
      case 'CONNECT':
        return <span className="text-green-500">{chatMessage.name} joined!</span>;
      case 'DISCONNECT':
        return <span className="text-yellow-500">{chatMessage.name} left!</span>;
      case 'WIN':
        return <span className="text-red-500">{chatMessage.name} won the game!</span>;
      case 'CHAT':
        return (
          <>
            <span style={{color: chatMessage.color}} className="whitespace-nowrap">{chatMessage.name}</span>:
            <span className="text-gray-800  ml-1">{chatMessage.content}</span>
          </>
        );
      default:
        return <span className="text-gray-800">{chatMessage.content}</span>;
    }
  }, [users]);

  // Send a chat message
  const sendMessage = useCallback((event: React.FormEvent) => {
    event.preventDefault();
  
    if (!canSendMessage) {
      return;
    }
  
    if (messageContents.trim() && stompClient.current) {
      const chatMessage = {
        id: userId,
        name: userName,
        color: userColor,
        content: messageContents,
        type: 'CHAT'
      };
      
      stompClient.current.publish({
        destination: '/app/chat.sendMessage',
        body: JSON.stringify(chatMessage),
      });
      
      setMessageContents('');
      
      // Disable sending message
      setCanSendMessage(false);
      // Re-enable after a few seconds
      setTimeout(() => setCanSendMessage(true), 500); 
    }
  }, [messageContents, userName, canSendMessage]);


  return (
    <div className="p-1 w-full h-full flex flex-col bg-white">
      <ul ref={messageAreaRef} className="h-full w-full overflow-y-scroll p-2 rounded">
        {chatMessages.map((message, i) => (
          <ChatMessage key={i} message={message} />
        ))}
      </ul>
      <form onSubmit={sendMessage} className="flex mt-1">
        <input
          ref={inputRef}
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
