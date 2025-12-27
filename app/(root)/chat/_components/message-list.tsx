'use client';

import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

export default function MessageList({ messages }: { messages: Message[] }) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Group messages by date
  const groupedMessages = messages.reduce(
    (groups, message) => {
      const dateKey = message.timestamp.toDateString();
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(message);
      return groups;
    },
    {} as Record<string, Message[]>,
  );

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="space-y-3 text-center">
          <p className="text-black-10 text-2xl font-semibold md:text-3xl lg:text-4xl">
            How can we help you today?
          </p>
          <p className="text-black-7 max-w-161 text-2xl">
            Please start the conversation by sending a message, our customer
            support member will reach you soon
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col justify-end space-y-6 overflow-y-auto py-5">
      {Object.entries(groupedMessages).map(([dateKey, dateMessages]) => {
        return (
          <div key={dateKey}>
            <div className="mb-4 flex justify-center">
              <span className="bg-black-4 text-black-7 h-7 rounded-full px-4 text-sm leading-7">
                {formatDate(new Date(dateKey))}
              </span>
            </div>

            <div className="space-y-1">
              {dateMessages.map((message, index) => {
                const prevMessage = dateMessages[index - 1];
                const nextMessage = dateMessages[index + 1];

                const isPrevSameSender =
                  prevMessage && prevMessage.sender === message.sender;

                const isNextSameSender =
                  nextMessage && nextMessage.sender === message.sender;

                function getBubbleRadius() {
                  // single message
                  if (!isPrevSameSender && !isNextSameSender) return '';

                  // middle of group
                  if (isPrevSameSender && isNextSameSender) {
                    return message.sender === 'user'
                      ? 'rounded-r'
                      : 'rounded-l';
                  }

                  // first message in group
                  if (!isPrevSameSender && isNextSameSender) {
                    return message.sender === 'user'
                      ? 'rounded-br'
                      : 'rounded-bl';
                  }

                  // last message in group
                  if (isPrevSameSender && !isNextSameSender) {
                    return message.sender === 'user'
                      ? 'rounded-tr'
                      : 'rounded-tl';
                  }

                  return '';
                }
                return (
                  <div
                    key={message.id}
                    className={cn(
                      message.sender === 'user'
                        ? 'justify-end'
                        : 'justify-start',
                    )}
                  >
                    <div
                      className={cn(
                        'flex flex-col',
                        message.sender === 'user' ? 'items-end' : 'items-start',
                      )}
                    >
                      <div
                        className={cn(
                          'max-w-md rounded-[20px] px-4 py-3 text-white',
                          getBubbleRadius(),
                          message.sender !== 'user'
                            ? 'bg-black-10'
                            : 'bg-primary',
                        )}
                      >
                        <p>{message.text}</p>
                      </div>
                      {dateMessages.indexOf(message) ===
                        dateMessages.length - 1 && (
                        <span className="text-black-8 mt-2 text-xs">
                          {formatTime(message.timestamp)}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
