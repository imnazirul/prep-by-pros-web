'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useGetMeContentSessionsQuery } from '@/redux/api/authApi';
import { format } from 'date-fns';

export default function ContentSessionsList({ className }: { className?: string }) {
  const { data: sessionsData, isLoading } = useGetMeContentSessionsQuery({
    page_size: 5,
  });

  const sessions = sessionsData?.results || [];

  if (isLoading) {
    return (
      <div className={cn('rounded-3xl bg-white p-6', className)}>
        <h2 className="mb-4 text-xl font-semibold">Recent Sessions</h2>
        <div className="text-muted-foreground">Loading sessions...</div>
      </div>
    );
  }

  return (
    <div className={cn('rounded-3xl bg-white p-6', className)}>
      <h2 className="mb-6 text-xl font-semibold text-black-12">Recent Activity</h2>

      {sessions.length === 0 ? (
        <div className="text-muted-foreground py-4">No recent activity found.</div>
      ) : (
        <div className="space-y-6">
          {sessions.map((session) => (
            <div key={session.uid} className="flex items-start gap-4">
              <Avatar className="h-10 w-10 border border-gray-100">
                <AvatarImage src={session.user?.image} alt={session.user?.username || 'User'} />
                <AvatarFallback>{session.user?.first_name?.[0] || 'U'}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-black-12">
                    {session.user?.first_name || session.user?.username || 'Anonymous User'}
                  </p>
                  <span className="text-xs text-[#A1A1A1]">
                    {session.created_at ? format(new Date(session.created_at), 'MMM d, p') : ''}
                  </span>
                </div>

                <p className="text-sm text-[#737373]">
                  Viewed{' '}
                  <span className="text-black-12 font-medium">
                    {session.content?.title || 'Unknown Content'}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
