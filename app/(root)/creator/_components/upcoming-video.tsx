/* eslint-disable @next/next/no-img-element */
'use client';

import { Button } from '@/components/ui/button';
import { usePostDialog } from '@/contexts/post-dialog-context';
import Icon from '@/lib/icon';
import { cn } from '@/lib/utils';
import { useGetMeContentsQuery } from '@/redux/api/authApi';
import { format } from 'date-fns';

const UpcomingVideo = ({ className }: { className?: string }) => {
  const { openPostDialog } = usePostDialog();
  const { data: contentsData, isLoading } = useGetMeContentsQuery({
    page_size: 1,
    ordering: '-schedule', // Get latest scheduled
  });

  const latestContent = contentsData?.results?.[0];

  return (
    <div className={cn('flex min-h-160 flex-col space-y-5', className)}>
      <div className="flex items-center justify-between">
        <h1 className="text-black-12 text-2xl font-medium md:text-[32px]">Upcoming Video</h1>
        <Button type="button" onClick={openPostDialog}>
          <Icon name="plus_sign" height={20} width={20} /> Add new
        </Button>
      </div>

      <div className="group relative flex-1 overflow-hidden rounded-2xl md:rounded-3xl lg:rounded-4xl xl:rounded-[40px] bg-gray-100">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        ) : latestContent ? (
          <>
            <img
              src={
                latestContent.file_item?.thumbnail ||
                latestContent.file_items?.[0]?.thumbnail ||
                '/images/upcoming-video-bg.jpg'
              }
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt={latestContent.title}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/upcoming-video-bg.jpg';
              }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_50.29%,rgba(0,0,0,0.60)_71%)]" />

            <div className="absolute inset-x-6 bottom-6 rounded-[28px] bg-[#9C9C9C66] p-6 text-white backdrop-blur-md">
              <p className="text-black-5 mb-2 text-base">
                Scheduled post on{' '}
                {latestContent.schedule ? format(new Date(latestContent.schedule), 'PPP p') : 'N/A'}
              </p>
              <h3 className="line-clamp-2 text-xl font-medium">{latestContent.title}</h3>
              <p className="line-clamp-1 mt-1 text-sm opacity-90">{latestContent.description}</p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-black-5 mb-2 text-base">Scheduled for</p>
                  <p className="text-xl font-medium">
                    {latestContent.schedule
                      ? format(new Date(latestContent.schedule), 'EEEE')
                      : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-black-5 mb-2 text-base">Status</p>
                  <p className="text-xl font-medium capitalize">
                    {latestContent.status?.toLowerCase() || 'Draft'}
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center p-6">
            <p className="text-muted-foreground text-lg">No upcoming content scheduled.</p>
            <Button variant="outline" onClick={openPostDialog}>
              Create your first post
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingVideo;
