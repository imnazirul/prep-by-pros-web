'use client';

import Icon from '@/lib/icon';
import type React from 'react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function MessageInput({
  onSendMessage,
}: {
  onSendMessage: (text: string) => void;
}) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          className="shrink-0 rounded-full border-transparent bg-transparent p-0 hover:bg-transparent"
        >
          <Icon
            name="plus_circle"
            height={40}
            width={40}
            className="text-[#507773]"
          />
        </Button>
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Type your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border-black-5 placeholder:text-black-7 text-black-10 h-16 rounded-full bg-white p-5 pr-14 text-lg!"
          />
          <button
            type="submit"
            className="text-black-10 hover:bg-black-4 hover:text-primary absolute top-1/2 right-3 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full duration-300"
            disabled={!message.trim()}
          >
            <Icon name="sent_fill" height={24} width={24} />
          </button>
        </div>
      </form>
    </div>
  );
}
