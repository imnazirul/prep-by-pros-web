import { Content, FileItem } from '@/redux/api/globalApi';
import { PostCardProp } from './types';

export const API_BASE_URL = 'https://prepbyprop.jumatechs.xyz';

export const mapContentToPostCard = (content: Content): PostCardProp => {
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
            src: getFullUrl(videoFile.file),
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

    return {
        id: content.slug,
        title: content.title,
        description: content.description,
        views: content.view_count?.toString() || '0',
        share: content.share_count?.toString() || '0',
        media,
        profile: {
            name: content.user
                ? `${content.user.first_name || ''} ${content.user.last_name || ''}`.trim() ||
                content.user.username
                : 'Unknown',
            image: getFullUrl(content.user?.image),
            last_active: new Date(content.created_at),
        },
        category: 'Workout',
        tags: [],
        // is_file_item_un_locked can be boolean or string 'False'/'True' based on recent findings
        is_lock:
            content.is_file_item_un_locked === false || content.is_file_item_un_locked === 'False',
    };
};
