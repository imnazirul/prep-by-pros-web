/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { cn } from '@/lib/utils';
import { useGetDashboardEngagementsQuery } from '@/redux/api/authApi';
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const TotalEngagement = ({ className }: { className?: string }) => {
  const { data: engagements, isLoading } = useGetDashboardEngagementsQuery();

  if (isLoading) {
    return (
      <div
        className={cn(
          'flex h-122.5 items-center justify-center rounded-2xl bg-[#FFF8C9] p-8 md:rounded-3xl lg:rounded-4xl xl:rounded-[40px]',
          className
        )}
      >
        Loading...
      </div>
    );
  }

  const engagementData = engagements?.results || [];

  return (
    <div
      className={cn(
        'flex h-122.5 flex-col space-y-16 rounded-2xl bg-[#FFF8C9] p-8 md:rounded-3xl lg:rounded-4xl xl:rounded-[40px]',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-black-8 text-[32px]">Total engagement</h3>
        <span className="text-primary text-lg">Last 28 days</span>
      </div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={engagementData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8C8C8C', fontSize: 16 }}
              tickFormatter={(value) => `Jun ${value}`} // TODO: dynamic month
              interval={4}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8C8C8C', fontSize: 16 }}
              domain={[0, 'auto']}
              allowDecimals={false}
              tickFormatter={(value) => `${Math.round(value / 1000)}k`}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />

            <Bar
              dataKey="value"
              radius={[100, 100, 100, 100]}
              barSize={16}
              activeBar={{
                fill: '#1D6537',
              }}
            >
              {engagementData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={'#9AD77C'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black-12 flex h-13 flex-col items-center justify-center rounded-[10px] rounded-tl px-3 text-white shadow-lg">
        <p className="text-lg">
          {payload[0].value > 1000 ? `${(payload[0].value / 1000).toFixed(1)}k` : payload[0].value}
        </p>
        <p className="text-xs opacity-60">Day {payload[0].payload.day}</p>
      </div>
    );
  }
  return null;
};

export default TotalEngagement;
