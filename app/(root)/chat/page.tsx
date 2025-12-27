import { Metadata } from 'next';
import NavbarHeight from '@/components/shared/navbar-height';
import ChatBox from './_components/chat-box';

export const metadata: Metadata = {
  title: 'Chat',
};

const ChatPage = () => {
  return (
    <div>
      <NavbarHeight />
      <ChatBox />
    </div>
  );
};

export default ChatPage;
