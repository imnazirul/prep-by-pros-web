import { useCreateChatMutation, useGetChatsQuery } from '@/redux/api/globalApi';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useChat = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chatUid = searchParams.get('uid');

  const [activeChatUid, setActiveChatUid] = useState<string | null>(chatUid || null);

  const {
    data: chatsData,
    isLoading: isChatsLoading,
    error: chatsError,
    refetch: refetchChats,
  } = useGetChatsQuery({
    page: 1,
    page_size: 10,
    ordering: '-created_at',
  });

  const [createChat, { isLoading: isCreatingChat }] = useCreateChatMutation();

  useEffect(() => {
    // If we already have a focused chat UID from URL, assume it's valid for now
    if (chatUid && chatUid !== 'undefined') {
      setActiveChatUid(chatUid);
      return;
    }

    // If no valid UID in URL, try to find an existing OPEN chat
    if (chatsData?.results?.length) {
      // Find the first OPEN chat
      const openChat = chatsData.results.find((chat) => chat.status === 'OPEN');

      if (openChat) {
        setActiveChatUid(openChat.uid);
      }
    }
  }, [chatsData, chatUid, router]);

  const initChat = async () => {
    if (activeChatUid && activeChatUid !== 'undefined') return activeChatUid;

    // Double check if we found one while loading
    if (chatsData?.results?.length) {
      const openChat = chatsData.results.find((chat) => chat.status === 'OPEN');
      if (openChat) {
        setActiveChatUid(openChat.uid);
        return openChat.uid;
      }
    }

    // No open chat found, create a new one
    try {
      const res = await createChat({
        title: 'Support Chat', // Default title
        content: 'Started new support chat', // Initial message content if required/optional
      }).unwrap();

      console.log('Create Chat API Response:', res);

      let newChatUid = res?.uid;

      if (!newChatUid) {
        console.warn('Create Chat response missing uid, refetching chats...');
        const { data: refreshedData } = await refetchChats();
        // Assume the first one is the new one since we order by -created_at
        const newestChat = refreshedData?.results?.[0];
        if (newestChat) {
          newChatUid = newestChat.uid;
        }
      }

      if (newChatUid) {
        setActiveChatUid(newChatUid);
        router.replace(`/chat?uid=${newChatUid}`);
        return newChatUid;
      } else {
        console.error('Failed to resolve new chat UID');
        return null;
      }
    } catch (error) {
      console.error('Failed to create chat:', error);
      // toast.error('Failed to start chat. Please try again.');
      return null;
    }
  };

  return {
    activeChatUid,
    isLoading: isChatsLoading || isCreatingChat,
    initChat,
  };
};
