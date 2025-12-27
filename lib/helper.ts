import { formatDistanceToNowStrict } from 'date-fns';

export function timeAgoShort(date: Date | string) {
  const diff = Date.now() - new Date(date).getTime();

  if (diff < 60_000) return 'Just Now';

  return formatDistanceToNowStrict(new Date(date), {
    addSuffix: true,
    unit: diff < 3_600_000 ? 'minute' : 'hour',
  })
    .replace(' minutes', 'm')
    .replace(' minute', 'm')
    .replace(' hours', 'h')
    .replace(' hour', 'h');
}
