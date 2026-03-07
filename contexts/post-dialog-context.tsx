'use client';

import { MeContent } from '@/redux/api/authApi';
import React, { createContext, useContext, useState } from 'react';

interface PostDialogContextType {
  isOpen: boolean;
  initialData?: MeContent | null;
  openPostDialog: (data?: MeContent) => void;
  closePostDialog: () => void;
}

const PostDialogContext = createContext<PostDialogContextType | undefined>(undefined);

export function PostDialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState<MeContent | null>(null);

  const openPostDialog = (data?: MeContent) => {
    if (data) setInitialData(data);
    else setInitialData(null);
    setIsOpen(true);
  };

  const closePostDialog = () => {
    setIsOpen(false);
    setInitialData(null);
  };

  return (
    <PostDialogContext.Provider value={{ isOpen, initialData, openPostDialog, closePostDialog }}>
      {children}
    </PostDialogContext.Provider>
  );
}

export function usePostDialog() {
  const context = useContext(PostDialogContext);
  if (!context) {
    throw new Error('usePostDialog must be used within a PostDialogProvider');
  }
  return context;
}
