'use client';

import { WishlistSyncProvider } from '@/components/providers/wishlist-sync-provider';
import { AppStore, makeStore } from '@/redux/store';
import { useRef } from 'react';
import { Provider } from 'react-redux';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();

    if (typeof window !== 'undefined') {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || 'null');

        if (token && user) {
          storeRef.current.dispatch({
            type: 'auth/rehydrateAuth',
            payload: { user, token },
          });
        }
      } catch (e) {
        console.error('Failed to load auth state', e);
      }
    }
  }

  return (
    <Provider store={storeRef.current}>
      <WishlistSyncProvider>{children}</WishlistSyncProvider>
    </Provider>
  );
}
