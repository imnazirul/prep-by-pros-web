import { TrackingCardProp } from '@/lib/types';
import { TrackingResponse } from '@/redux/api/authApi';
import TrackingCard from './tracking-card';

interface TrackingListProps {
  trackings: TrackingResponse[];
  selectedTrackingUid: string | null;
  onSelect: (uid: string) => void;
}

export default function TrackingList({
  trackings,
  selectedTrackingUid,
  onSelect,
}: TrackingListProps) {
  return (
    <div className="space-y-6">
      {trackings.map((tracking) => {
        // Map API response to UI Prop
        // Note: TrackingResponse might not have all fields required by TrackingCardProp exactly as is,
        // so we need to map best effort or update TrackingCardProp.
        // For now, let's map what we have. API has 'tracking_events', 'status', 'from_country', 'receiver_address' etc.
        const trackingProp: TrackingCardProp = {
          id: tracking.order_id || tracking.order_uid, // Fallback if order_id is missing
          status:
            tracking.status === 'ON_GOING'
              ? 'ongoing'
              : tracking.status === 'COMPLETED'
                ? 'completed'
                : 'cancelled',
          from: tracking.from_country || 'Unknown',
          to: tracking.receiver_address?.country || 'Unknown', // Check if address has country
          fromDate: tracking.created_at, // Use created_at as start
          toDate: tracking.estimated_delivery_date || 'Unknown',
          progress: 1, // Calculate progress based on status or events count? For now hardcode or logic.
          sender: tracking.sender_name || 'Store',
          receiver: tracking.receiver_name || 'User',
        };

        return (
          <div key={tracking.uid} onClick={() => onSelect(tracking.uid)}>
            <TrackingCard
              className="group cursor-pointer"
              isActive={selectedTrackingUid === tracking.uid}
              {...trackingProp}
            />
          </div>
        );
      })}
    </div>
  );
}
