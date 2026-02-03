'use client';

import { Button } from '@/components/ui/button';
import Icon from '@/lib/icon';
import {
  Session,
  useBulkDeleteSessionsMutation,
  useDeleteSessionMutation,
  useGetSessionsQuery,
} from '@/redux/api/authApi';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { format } from 'date-fns';

export default function SessionList() {
  const { data: sessionsData, isLoading } = useGetSessionsQuery();
  const [deleteSession] = useDeleteSessionMutation();
  const [bulkDeleteSessions] = useBulkDeleteSessionsMutation();
  const currentToken = useAppSelector((state: RootState) => state.auth.token);

  const sessions = sessionsData?.results || [];

  const handleDisconnectSession = async (sessionUid: string) => {
    try {
      await deleteSession(sessionUid).unwrap();
    } catch (error) {
      console.error('Failed to disconnect session:', error);
    }
  };

  const handleSignOutOtherSessions = async () => {
    // Filter out current session and collect UIDs of all others
    const otherSessionUids = sessions.filter((s) => !isCurrentSession(s)).map((s) => s.uid);

    if (otherSessionUids.length === 0) return;

    try {
      await bulkDeleteSessions({ uids: otherSessionUids }).unwrap();
    } catch (error) {
      console.error('Failed to sign out other sessions:', error);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd MMMM, yyyy');
    } catch {
      return dateString;
    }
  };

  const isCurrentSession = (session: Session) => {
    // If we have a token match, that's definitive
    if (currentToken && session.token === currentToken) return true;
    return false;
  };

  if (isLoading) {
    return <div className="py-4 text-center">Loading sessions...</div>;
  }

  // Sort sessions: current session first, then by last_login
  const sortedSessions = [...sessions].sort((a, b) => {
    if (isCurrentSession(a)) return -1;
    if (isCurrentSession(b)) return 1;
    return new Date(b.last_login).getTime() - new Date(a.last_login).getTime();
  });

  return (
    <section className="space-y-4">
      <h2 className="text-black-10 text-[22px] font-semibold">Account log in activity</h2>

      <div className="space-y-5">
        {sortedSessions.map((session) => {
          const isCurrent = isCurrentSession(session);

          // Determine friendly name
          // Prefer title, then device_id. If "web" or empty, show "Web Session"
          let displayName = session.title || session.device_id;
          if (!displayName || displayName.toLowerCase() === 'web') {
            displayName = 'Web Session';
          }

          // Determine device type icon
          // Check both device_id and title for clues
          const combinedInfo = (session.device_id + session.title).toLowerCase();
          const isMobile =
            combinedInfo.includes('mobile') ||
            combinedInfo.includes('android') ||
            combinedInfo.includes('ios') ||
            combinedInfo.includes('iphone');

          const isTablet = combinedInfo.includes('ipad') || combinedInfo.includes('tablet');

          // Location handling
          let location = session.location;
          if (!location || location.toLowerCase() === 'unknown') {
            location = 'Unknown Location';
          }

          return (
            <div key={session.uid} className="flex gap-3 sm:items-center">
              <Icon
                name={isMobile || isTablet ? 'smart_phone' : 'laptop'}
                height={32}
                width={32}
                className="text-[#404040] max-sm:mt-1"
              />
              <div className="flex flex-1 flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="mb-1 text-lg font-medium text-[#404040]">{displayName}</h3>
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <span className="text-[#737373]">{location}</span>
                    {session.last_login && (
                      <>
                        <span className="size-1.5 rounded-full bg-[#D4D4D4]" />
                        <span className="text-[#A1A1A1]">{formatDate(session.last_login)}</span>
                      </>
                    )}
                    {isCurrent && (
                      <>
                        <span className="size-1.5 rounded-full bg-[#D4D4D4]" />
                        <span className="text-[#16A34A]">This device</span>
                      </>
                    )}
                  </div>
                </div>

                {!isCurrent && (
                  <Button
                    variant="link"
                    className="text-primary h-auto p-0! text-base font-semibold underline"
                    onClick={() => handleDisconnectSession(session.uid)}
                  >
                    Disconnect
                  </Button>
                )}
              </div>
            </div>
          );
        })}
        {sortedSessions.length === 0 && (
          <p className="text-muted-foreground">No active sessions found.</p>
        )}
      </div>

      {sessions.some((s) => !isCurrentSession(s)) && (
        <div className="mt-6 flex justify-end">
          <Button
            variant="outline"
            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
            onClick={handleSignOutOtherSessions}
          >
            Sign out of all other devices
          </Button>
        </div>
      )}
    </section>
  );
}
