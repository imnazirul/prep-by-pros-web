'use client';
import { useGetWishlistsQuery } from '@/redux/api/authApi';
import { setWishlist } from '@/redux/features/authSlice';
import { RootState } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function WishlistSyncProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  const { data, isSuccess } = useGetWishlistsQuery(
    { ordering: '-created_at', page_size: 100 },
    { skip: !token }
  );

  useEffect(() => {
    if (isSuccess && data?.results) {
      const wishlistMap: Record<string, string> = {};
      data.results.forEach((item) => {
        if (item.content?.slug) {
          wishlistMap[item.content.slug] = item.uid;
        }
      });
      dispatch(setWishlist(wishlistMap));
    }
  }, [data, isSuccess, dispatch]);

  return <>{children}</>;
}
