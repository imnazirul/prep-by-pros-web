'use client';

import Circle3DLoader from '@/components/shared/circle-loader';
import PostCard from '@/components/shared/post-card';
import { PostCardProp } from '@/lib/types';
import { useGetWishlistsQuery, Wishlist } from '@/redux/api/authApi';
import { useEffect, useState } from 'react';

import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const SavedPostList = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);

  const { data, isLoading, isError, error } = useGetWishlistsQuery(
    { ordering: '-created_at' },
    { skip: !token }
  );
  const [tab, setTab] = useState<'ALL' | 'VIDEOS' | 'POSTS'>('ALL');

  const API_BASE_URL = 'https://prepbyprop.jumatechs.xyz';

  const mapWishlistToPostCard = (wishlist: Wishlist): PostCardProp => {
    const content = wishlist.content;
    const fileItem = content.file_item;

    const getFullUrl = (url: string) => {
      if (!url) return '';
      if (url.startsWith('http')) return url;
      return `${API_BASE_URL}${url}`;
    };

    const isVideo =
      ['VIDEO', 'MOV', 'MP4'].includes(fileItem?.kind?.toUpperCase() || '') ||
      fileItem?.file?.match(/\.(mp4|mov|3gp)$/i);

    const media: PostCardProp['media'] = isVideo
      ? {
          type: 'video',
          src: getFullUrl(fileItem.file),
          duration: fileItem.duration_count
            ? `${Math.floor(fileItem.duration_count / 60)}:${(fileItem.duration_count % 60)
                .toString()
                .padStart(2, '0')}`
            : '0:00',
        }
      : {
          type: 'image',
          images: [getFullUrl(fileItem.file) || getFullUrl(fileItem.thumbnail)].filter(Boolean),
        };

    return {
      id: content.slug,
      title: content.title,
      description: content.description,
      views: content.view_count?.toString() || '0',
      share: '0', // Wishlist doesn't seem to have share count
      media,
      profile: {
        name: 'Unknown', // User info not in Wishlist response
        image: '',
        last_active: new Date(content.created_at),
      },
      category: 'Saved',
      tags: [],
      is_lock: false, // Assuming saved content is unlocked or we don't know
      is_saved: true,
      wishlist_uid: wishlist.uid,
    };
  };

  const wishlists = data?.results || [];
  const mappedData = wishlists.map(mapWishlistToPostCard);

  if (!mounted) {
    return null;
  }

  if (!token) {
    return (
      <section>
        <div className="container flex h-[50vh] flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-xl font-semibold">Please Log In</h2>
          <p className="text-gray-500">You need to be logged in to view your saved items.</p>
        </div>
      </section>
    );
  }

  const role = typeof user?.role === 'string' ? user.role : user?.role?.title;
  const isCoach = role?.toUpperCase() === 'COACH';

  const isSessionExpired = isError && error && 'status' in error && error.status === 401;
  const isForbidden = isError && error && 'status' in error && error.status === 403;

  if (isSessionExpired || isForbidden) {
    return (
      <section>
        <div className="container flex h-[50vh] flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-xl font-semibold">
            {isSessionExpired ? 'Session Expired' : 'Feature Unavailable'}
          </h2>
          <p className="text-gray-500">
            {isSessionExpired
              ? 'Your session has expired. Please log in again.'
              : isCoach
                ? 'The Saved/Wishlist feature is currently available for Players only.'
                : 'You do not have permission to view this content.'}
          </p>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section>
        <div className="container flex h-[400px] items-center justify-center">
          <Circle3DLoader />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section>
        <div className="container">
          <p className="text-center text-red-500">
            Failed to load saved items. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="container">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">My Saves</h1>
            </div>
          </div>

          {mappedData.length > 0 ? (
            <div className="mb-10 gap-4 sm:columns-2 md:columns-3 xl:columns-4 2xl:columns-5">
              {mappedData.map((post) => (
                <PostCard key={post.wishlist_uid} layout="auto" post={post} />
              ))}
            </div>
          ) : (
            <p className="text-black-4 py-20 text-center">No saved content found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default SavedPostList;
