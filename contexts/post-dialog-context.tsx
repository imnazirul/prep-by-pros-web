'use client';

import React, { createContext, useContext, useState } from 'react';

interface PostDialogContextType {
  isOpen: boolean;
  openPostDialog: () => void;
  closePostDialog: () => void;
}

const PostDialogContext = createContext<PostDialogContextType | undefined>(
  undefined,
);

export function PostDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const openPostDialog = () => setIsOpen(true);
  const closePostDialog = () => setIsOpen(false);

  return (
    <PostDialogContext.Provider
      value={{ isOpen, openPostDialog, closePostDialog }}
    >
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
