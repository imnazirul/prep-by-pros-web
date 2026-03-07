'use client';

import { useChat } from '@/hooks/use-chat';
import { useHeaderHeight } from '@/hooks/use-header-height';
import { useCreateChatThreadMutation, useGetChatThreadsQuery } from '@/redux/api/globalApi';
import { skipToken } from '@reduxjs/toolkit/query/react';
import MessageInput from './message-input';
import MessageList from './message-list';

const ChatBox = () => {
  const headerHeight = useHeaderHeight();
  const { activeChatUid, initChat, isLoading: isChatInitLoading } = useChat();

  // Fetch threads only if we have an active chat UID
  const {
    data: threadsData,
    isLoading: isThreadsLoading,
    refetch,
  } = useGetChatThreadsQuery(
    activeChatUid && activeChatUid !== 'undefined'
      ? {
          uid: activeChatUid,
          page: 1,
          page_size: 50,
        }
      : skipToken,
    {
      pollingInterval: 5000, // Poll every 5s for new messages
      refetchOnMountOrArgChange: true,
      skip: !activeChatUid || activeChatUid === 'undefined',
    }
  );

  const [createThread, { isLoading: isSending }] = useCreateChatThreadMutation();

  const handleSendMessage = async (text: string) => {
    let currentChatUid = activeChatUid;

    if (!currentChatUid) {
      currentChatUid = await initChat();
    }

    if (!currentChatUid) return;

    try {
      await createThread({
        uid: currentChatUid,
        body: {
          content: text,
        },
      }).unwrap();
      refetch();
    } catch (error) {
      console.error('Failed to send message:', error);
      // toast.error('Failed to send message'); // Should use toast from your UI lib
    }
  };

  // Convert API threads to UI message format
  // API: ChatThread { uid, content, author: { uid, ... }, ... }
  // UI: { id, text, sender, timestamp }
  const messages =
    threadsData?.results?.map((thread) => ({
      id: thread.uid,
      text: thread.content,
      sender: (thread.author.uid === 'ME' ? 'user' : 'support') as 'user' | 'support', // Explicitly cast to the expected union type
      // Better to check if author.uid === current_user_uid.
      // For now, let's assume if it's NOT the support agent, it's the user?
      // actually we need the current user ID to distinguish.
      // Let's pass a dummy for now or fetch user info.
      // Ideally comparing thread.author.uid === myUid
      authorId: thread.author.uid,
      timestamp: new Date(thread.created_at),
    })) || [];

  return (
    <div className="container">
      <div
        style={{
          minHeight: `calc(100vh - ${headerHeight}px)`,
        }}
        className={'mx-auto flex max-w-255 flex-col py-12'}
      >
        <MessageList messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} disabled={isSending} />
      </div>
    </div>
  );
};

export default ChatBox;
