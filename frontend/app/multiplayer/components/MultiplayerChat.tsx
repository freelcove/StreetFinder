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
  type: 'CHAT' | 'CONNECT' | 'DISCONNECT' | 'WIN' | 'SCORE';
}

interface ChatMessageContentProps {
  message: IChatMessage;
}

const MAX_RENDERED_MESSAGES = 100; // Define the maximum number of messages to be rendered at once

const MAX_MESSAGE_LENGTH = 80;


const ChatMessageContent = memo(({ message }: ChatMessageContentProps) => {
  switch (message.type) {
    case 'CONNECT':
      return <span className="text-red-500">{message.name} joined!</span>;
    case 'DISCONNECT':
      return <span className="text-yellow-500">{message.name} left!</span>;
    case 'WIN':
      return <span className="text-green-500 font-bold">{message.name} won the game!</span>;
    case 'CHAT':
      return (
        <>
          <span style={{ color: message.color }} className="whitespace-nowrap">{message.name}</span>:
          <span className="text-gray-800 ml-1">{message.content}</span>
        </>
      );
    default:
      return <span className="text-gray-800">{message.content}</span>;
  }
});
ChatMessageContent.displayName = 'ChatMessageContent';

export default function MultiplayerChat() {
  const { stompClient, connected } = useContext(MultiplayerGameContext);
  const { data: session } = useSession();
  const [userId, setUserId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userColor, setUserColor] = useState<string>('');
  const [messageContents, setMessageContents] = useState<string>('');

  const messageAreaRef = useRef<HTMLUListElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([]);
  const [canSendMessage, setCanSendMessage] = useState(true);
  const [renderedMessagesCount, setRenderedMessagesCount] = useState(MAX_RENDERED_MESSAGES);

  useEffect(() => {
    if (session) {
      setUserId(session.user.id);
      setUserName(session.user.name);
      setUserColor(session.user.color);
    }
  }, [session]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [chatMessages]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stompClient, connected]);

  const onMessageReceived = useCallback((payload: IMessage) => {
    const message = JSON.parse(payload.body) as IChatMessage;

    setChatMessages((prevMessages) => [...prevMessages, message]);
  }, []);

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

      setCanSendMessage(false);
      setTimeout(() => setCanSendMessage(true), 1000); // Adjust this to set chat limit time.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageContents, userName, canSendMessage]);

  return (
    <div className="p-1 w-full h-full flex flex-col bg-white">
      <ul ref={messageAreaRef} className="h-full w-full overflow-y-scroll p-2 rounded">
        {chatMessages.slice(-renderedMessagesCount).map((message, i) => (
          <li className="break-words w-full" key={i}>
            <ChatMessageContent message={message} />
          </li>
        ))}
      </ul>
      <form onSubmit={sendMessage} className="flex mt-1 border border-gray-300">
        <input
          ref={inputRef}
          type="text"
          maxLength={MAX_MESSAGE_LENGTH}
          placeholder="Type a message..."
          className="p-1  rounded flex-grow overflow-auto outline-none"
          value={messageContents}
          onChange={(e) => setMessageContents(e.target.value)}
        />
      </form>
    </div>
  );
};
