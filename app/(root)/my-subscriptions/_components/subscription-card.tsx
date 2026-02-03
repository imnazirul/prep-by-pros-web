'use client';

import CustomImage from '@/components/shared/custom-image';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Subscription,
  useCancelSubscriptionMutation,
  useCreateSubscriptionPortalMutation,
  useReactivateSubscriptionMutation,
} from '@/redux/api/authApi';
import { format } from 'date-fns';
import { Loader2, MoreVertical } from 'lucide-react';

export function SubscriptionCard({
  subscription,
  view_type = 'GRID',
}: {
  subscription: Subscription;
  view_type?: 'GRID' | 'LIST';
}) {
  const { coach, status, current_period_end, uid } = subscription;
  const coachName = coach.first_name || coach.username || 'Unknown Coach';
  const coachImage =
    coach.image && coach.image.startsWith('http') ? coach.image : '/images/instructor/1.png';

  const [createPortal, { isLoading: isPortalLoading }] = useCreateSubscriptionPortalMutation();
  const [cancelSubscription, { isLoading: isCancelLoading }] = useCancelSubscriptionMutation();
  const [reactivateSubscription, { isLoading: isReactivateLoading }] =
    useReactivateSubscriptionMutation();

  const [refundSubscription, { isLoading: isRefundLoading }] = useRefundSubscriptionMutation();

  const handlePortal = async () => {
    try {
      const res = await createPortal(uid).unwrap();
      if (res.portal_url) {
        window.location.href = res.portal_url;
      }
    } catch (error: any) {
      alert(error?.data?.message || 'Failed to create portal session');
    }
  };

  const handleRefund = async () => {
    try {
      if (confirm('Are you sure you want to request a refund?')) {
        await refundSubscription(uid).unwrap();
        alert('Refund requested successfully');
      }
    } catch (error: any) {
      alert(error?.data?.message || 'Failed to request refund');
    }
  };

  const handleCancel = async () => {
    try {
      if (confirm('Are you sure you want to cancel this subscription?')) {
        await cancelSubscription(uid).unwrap();
        alert('Subscription canceled successfully');
      }
    } catch (error: any) {
      alert(error?.data?.message || 'Failed to cancel subscription');
    }
  };

  const handleReactivate = async () => {
    try {
      await reactivateSubscription(uid).unwrap();
      alert('Subscription reactivated successfully');
    } catch (error: any) {
      alert(error?.data?.message || 'Failed to reactivate subscription');
    }
  };

  const isLoading = isPortalLoading || isCancelLoading || isReactivateLoading || isRefundLoading;

  const StatusBadge = () => (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm ${
        status === 'ACTIVE'
          ? 'bg-green-500/20 text-green-100'
          : status === 'CANCELED'
            ? 'bg-red-500/20 text-red-100'
            : 'bg-white/20 text-white'
      }`}
    >
      {status}
    </span>
  );

  const ActionsMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-white hover:bg-white/20"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MoreVertical className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handlePortal}>Manage in Portal</DropdownMenuItem>
        <DropdownMenuItem onClick={handleRefund}>Request Refund</DropdownMenuItem>
        {status === 'ACTIVE' && (
          <DropdownMenuItem onClick={handleCancel} className="text-red-600 focus:text-red-600">
            Cancel Subscription
          </DropdownMenuItem>
        )}
        {status === 'CANCELED' && (
          <DropdownMenuItem onClick={handleReactivate}>Reactivate Subscription</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <>
      {view_type === 'GRID' ? (
        <div className="group bg-card relative aspect-342/451 cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-xl md:rounded-3xl">
          <div className="relative size-full overflow-hidden">
            <CustomImage
              fill
              src={coachImage}
              alt={coachName}
              className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0 flex size-full flex-col justify-between bg-[linear-gradient(181deg,rgba(36,85,80,0.00)_28.43%,#173633_76.66%)] p-5">
              <div className="flex items-center justify-between">
                <StatusBadge />
                <div onClick={(e) => e.stopPropagation()}>
                  <ActionsMenu />
                </div>
              </div>

              {/* Info overlay */}
              <div>
                <h3 className="mb-4 text-center text-2xl font-semibold text-white md:text-[32px]">
                  {coachName}
                </h3>

                <div className="grid grid-cols-2 gap-4.5 text-center">
                  <div>
                    <div className="mb-1 text-sm text-[#B0C6BA]">Status</div>
                    <div className="text-xl font-medium text-white uppercase">{status}</div>
                  </div>
                  <div>
                    <div className="mb-1 text-sm text-[#B0C6BA]">Renews</div>
                    <div className="text-xl font-medium text-white">
                      {current_period_end ? format(new Date(current_period_end), 'MMM dd') : 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="group bg-black-4 relative flex flex-col gap-5 overflow-hidden rounded-[20px] p-4 transition-all duration-300 hover:shadow-xl sm:flex-row sm:items-center">
          <div className="relative size-25 shrink-0 overflow-hidden rounded-xl">
            <CustomImage
              fill
              src={coachImage}
              alt={coachName}
              className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="flex flex-1 shrink-0 items-start justify-between">
            <div>
              <h3 className="text-black-9 line-clamp-1 text-2xl">{coachName}</h3>

              <div className="mt-1.5 mb-3.5 flex items-center gap-2.5">
                <span className="text-black-7 text-base capitalize">
                  {status.toLowerCase()} Subscription
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    status === 'ACTIVE'
                      ? 'bg-green-100 text-green-800'
                      : status === 'CANCELED'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {status}
                </span>
              </div>

              <p className="text-black-7 text-sm">
                Expires:{' '}
                <span className="text-black-8">
                  {current_period_end
                    ? format(new Date(current_period_end), 'MMM dd, yyyy')
                    : 'N/A'}
                </span>
              </p>
            </div>

            <div className="flex flex-col items-end gap-2" onClick={(e) => e.stopPropagation()}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Manage {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handlePortal}>Manage in Portal</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleRefund}>Request Refund</DropdownMenuItem>
                  {status === 'ACTIVE' && (
                    <DropdownMenuItem
                      onClick={handleCancel}
                      className="text-red-600 focus:text-red-600"
                    >
                      Cancel Subscription
                    </DropdownMenuItem>
                  )}
                  {status === 'CANCELED' && (
                    <DropdownMenuItem onClick={handleReactivate}>
                      Reactivate Subscription
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
