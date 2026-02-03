/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/lib/icon';
import { cn } from '@/lib/utils';
import { DashboardEarning, useGetDashboardEarningsQuery } from '@/redux/api/authApi';
import { useMemo, useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

const TotalEarning = ({ className }: { className?: string }) => {
  const [activeIndex, setActiveIndex] = useState<string | null>(null);
  const { data: earningsDataList, isLoading } = useGetDashboardEarningsQuery({});

  const earningsData = useMemo(() => {
    if (!earningsDataList?.results || earningsDataList.results.length === 0) return [];
    // Ensure we have all months or just map what we have.
    // Assuming API returns list of objects with month name/index and amount.
    return earningsDataList.results.map((item: DashboardEarning) => ({
      name: item.month.slice(0, 3), // e.g. "January" -> "Jan"
      value: item.amount,
      fullMonth: item.month,
    }));
  }, [earningsDataList]);

  const totalEarnings = useMemo(() => {
    if (!earningsDataList?.results) return 0;
    return earningsDataList.results.reduce((acc, curr) => acc + curr.amount, 0);
  }, [earningsDataList]);

  if (isLoading) {
    return (
      <div
        className={cn(
          'bg-primary relative flex h-122.5 flex-col overflow-hidden rounded-2xl p-6 text-white md:rounded-3xl lg:rounded-4xl xl:rounded-[40px] items-center justify-center',
          className
        )}
      >
        Loading earnings...
      </div>
    );
  }

  return (
    <div
      className={cn(
        'bg-primary relative flex h-122.5 flex-col overflow-hidden rounded-2xl p-6 text-white md:rounded-3xl lg:rounded-4xl xl:rounded-[40px]',
        className
      )}
    >
      <div className="relative space-y-1">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-black-5 text-2xl">Total earnings</span>
            <Badge className="flex h-7 items-center rounded-full bg-[#DCFCE7] px-2.5 text-base text-[#16A34A]">
              56%{' '}
              <Icon
                height={20}
                width={20}
                name="chevron_down_fill"
                className="shrink-0 rotate-180"
              />
            </Badge>
          </div>

          <Button
            variant={'outline'}
            className="text-primary hover:text-primary border-[#FEFBE6] bg-[#FEFBE6] hover:bg-[#FEFBE6]"
          >
            Withdraw now{' '}
            <div className="bg-primary flex size-5 items-center justify-center rounded-full text-white">
              <Icon name="chevron_right" height={16} width={16} />
            </div>
          </Button>
        </div>

        <h2 className="text-[40px] font-medium">
          {totalEarnings.toLocaleString()}{' '}
          <span className="text-black-6 text-xl font-normal">USD</span>
        </h2>
      </div>

      <div className="flex-1">
        <ResponsiveContainer
          width="100%"
          height="100%"
          className={'outline-none focus-visible:ring-0 focus-visible:outline-none'}
        >
          <AreaChart
            data={earningsData}
            margin={{
              left: 20,
              right: 20,
            }}
            onMouseLeave={() => setActiveIndex(null)}
            onMouseMove={(e: any) => {
              if (e.activeLabel) setActiveIndex(e.activeLabel);
            }}
          >
            <defs>
              <linearGradient id="colorEarning" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1A3C39" stopOpacity="0.1" />
                <stop offset="40%" stopColor="#9AB1AF" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#9AB1AF" stopOpacity="0.6" />
                <stop offset="60%" stopColor="#9AB1AF" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#1A3C39" stopOpacity="0.1" />
              </linearGradient>

              <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#759F9B00" stopOpacity="0" />
                <stop offset="50%" stopColor="#759F9B" stopOpacity="1" />
                <stop offset="100%" stopColor="#759F9B00" stopOpacity="0" />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              interval={0}
              tick={<CustomTick activeLabel={activeIndex} />}
            />

            <Tooltip
              content={<CustomTooltip active={undefined} payload={undefined} />}
              cursor={<CustomCursor />}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="url(#strokeGradient)"
              strokeWidth={1}
              fill="url(#colorEarning)"
              dot={false}
              activeDot={{
                r: 8,
                fill: '#262626',
                stroke: '#ffffff',
                strokeWidth: 3,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload }: { active: any; payload: any }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black-12 flex h-9 items-center rounded-[10px] rounded-tl px-3 shadow-[0px_4px_12px_0px_#00000033]">
        <p className="text-lg text-white">${payload[0].value?.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const CustomTick = (props: any) => {
  const { x, y, payload, activeLabel } = props;
  const isActive = payload.value === activeLabel;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        className={cn(
          'text-sm font-medium transition-colors duration-200',
          isActive ? 'fill-white' : 'fill-black-6'
        )}
      >
        {payload.value}
      </text>
    </g>
  );
};

const CustomCursor = (props: any) => {
  const { points, height } = props;
  const { x, y } = points[0];
  return (
    <line x1={x} y1={y} x2={x} y2={height} stroke="#FEFDF4" strokeWidth={1} strokeDasharray="4 4" />
  );
};

export default TotalEarning;
