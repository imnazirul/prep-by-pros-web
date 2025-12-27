'use client';

import { useState } from 'react';
import MessageList from './message-list';
import MessageInput from './message-input';
import { useHeaderHeight } from '@/hooks/use-header-height';

const ChatBox = () => {
  const headerHeight = useHeaderHeight();
  const [messages, setMessages] = useState<
    Array<{
      id: string;
      text: string;
      sender: 'user' | 'support';
      timestamp: Date;
    }>
  >([]);

  const handleSendMessage = (text: string) => {
    const newMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user' as const,
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);

    // Simulate support response after a delay
    if (messages.length === 0) {
      setTimeout(() => {
        const welcomeMessages = [
          {
            id: (Date.now() + 1).toString(),
            text: 'Hello',
            sender: 'support' as const,
            timestamp: new Date(),
          },
          {
            id: (Date.now() + 2).toString(),
            text: 'I am John from Prep by Pros',
            sender: 'support' as const,
            timestamp: new Date(),
          },
          {
            id: (Date.now() + 3).toString(),
            text: 'Please state your issues with description',
            sender: 'support' as const,
            timestamp: new Date(),
          },
        ];
        setMessages((prev) => [...prev, ...welcomeMessages]);
      }, 1000);
    }
  };

  return (
    <div className="container">
      <div
        style={{
          minHeight: `calc(100vh - ${headerHeight}px)`,
        }}
        className={'mx-auto flex max-w-255 flex-col py-12'}
      >
        <MessageList messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatBox;
