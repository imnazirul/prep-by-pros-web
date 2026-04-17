import { MeContent } from '@/redux/api/authApi';
import { Content, FileItem } from '@/redux/api/globalApi';
import { PostCardProp } from './types';

export const API_BASE_URL = 'https://prepbyprop.jumatechs.xyz';

export const mapContentToPostCard = (content: Content | MeContent): PostCardProp => {
  const fileItems = (content.file_items as FileItem[]) || [];

  const getFullUrl = (url: string | undefined | null) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${API_BASE_URL}${url}`;
  };

  // Strategy: Find video if exists, else everything else is an image
  const videoFile = fileItems.find(
    (f) =>
      ['VIDEO', 'MOV', 'MP4'].includes(f.kind?.toUpperCase() || '') ||
      f.file?.match(/\.(mp4|mov|3gp)$/i)
  );

  const imageFiles = fileItems
    .filter(
      (f) =>
        ['IMAGE', 'JPG', 'JPEG', 'PNG', 'WEBP'].includes(f.kind?.toUpperCase() || '') ||
        f.file?.match(/\.(jpg|jpeg|png|webp|gif)$/i) ||
        f.thumbnail?.match(/\.(jpg|jpeg|png|webp|gif)$/i) ||
        (!f.kind && (f.file || f.thumbnail))
    )
    .map((f) => getFullUrl(f.file || f.thumbnail))
    .filter(Boolean);

  // If still no images but we have files, just use them as images (best effort)
  const finalImages =
    imageFiles.length > 0
      ? imageFiles
      : fileItems.map((f) => getFullUrl(f.file || f.thumbnail)).filter(Boolean);

  const media: PostCardProp['media'] = videoFile
    ? {
        type: 'video',
        src: getFullUrl(videoFile.file || videoFile.link || videoFile.thumbnail),
        duration: videoFile.duration_count
          ? `${Math.floor(videoFile.duration_count / 60)}:${(videoFile.duration_count % 60)
              .toString()
              .padStart(2, '0')}`
          : '0:00',
      }
    : {
        type: 'image',
        images: finalImages,
      };

  const isLocked =
    'is_file_item_un_locked' in content
      ? content.is_file_item_un_locked === false || content.is_file_item_un_locked === 'False'
      : false;

  if (content.user) {
    console.log('DEBUG: Mapping Content User', {
      contentSlug: content.slug,
      userSlug: content.user.username || content.user.uid,
      userUid: content.user.uid,
      username: content.user.username,
      userID: (content.user as any).id,
      userObject: content.user,
      isUserSameAsContent: content.user === content, // Check for circular ref or mixup
      userHasContentTitle: content.user.title === content.title, // Heuristic check
    });
  } else {
    console.log('DEBUG: Content has NO User', { contentSlug: content.slug, title: content.title });
  }

  // Defensive check: If user slug matches content slug, it's likely a backend serialization error (user object IS content object)
  // or a very weird coincidence. We should trust UID or username instead.
  let finalUserSlug = content.user?.username || content.user?.uid || '';
  const contentSlug = content.slug;

  if (finalUserSlug && finalUserSlug === contentSlug) {
    console.warn('WARN: User slug matches content slug. Ignoring user slug.', {
      finalUserSlug,
      contentSlug,
    });
    finalUserSlug = ''; // Reset to force fallback
  }

  let fallbackUsername = content.user?.username || '';
  if (fallbackUsername.startsWith('#')) {
    fallbackUsername = fallbackUsername.substring(1);
  }

  // Fallback chain
  finalUserSlug =
    finalUserSlug || fallbackUsername || content.user?.uid || (content.user as any)?.id || '';

  console.log('DEBUG SAVE STATE:', {
    title: content.title,
    wishlist_uid: (content as any).wishlist_uid,
    is_saved_flag: (content as any).is_saved,
  });

  return {
    id: content.uid || content.slug || '', // Prefer UID for reliable routing if slug lookup fails
    uid: (content as any).uid,
    title: content.title,
    description: content.description,
    views: content.view_count?.toString() || '0',
    share: content.share_count?.toString() || '0',
    media,
    profile: {
      name: content.user
        ? content.user.first_name || content.user.username
        : 'Unknown',
      image: getFullUrl(content.user?.image),
      last_active: new Date(content.created_at),
      slug: finalUserSlug,
      uid: content.user?.uid || finalUserSlug || (content.user as any)?.id?.toString(),
    },
    category: 'Workout',
    tags: [],
    is_lock: isLocked,
    is_saved: !!(content as any).wishlist_uid,
    wishlist_uid: (content as any).wishlist_uid,
  };
};
