/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Icon from '@/lib/icon';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

const subscriberData = [
  { week: 'Week 1', s1: 400, s2: 240 },
  { week: 'Week 2', s1: 700, s2: 150 },
  { week: 'Week 3', s1: 300, s2: 794 },
  { week: 'Week 4', s1: 450, s2: 300 },
  { week: 'Week 5', s1: 400, s2: 500 },
];

const NewSubscriber = ({ className }: { className?: string }) => {
  const [activeIndex, setActiveIndex] = useState<string | null>(null);

  return (
    <div
      className={cn(
        'flex h-122.5 flex-col space-y-16 rounded-4xl bg-[#FFF8C9] p-8',
        className,
      )}
    >
      <div>
        <div className="mb-0 flex items-center justify-between">
          <p className="text-black-8 text-2xl">New subscriber</p>
          <span className="text-black-8 flex items-center text-2xl">
            7%
            <Icon
              name="chevron_down_fill"
              className="text-red"
              height={32}
              width={32}
            />
          </span>
        </div>

        <h2 className="text-[40px] font-medium">
          1,594 <span className="text-black-7 text-xl">People</span>
        </h2>
      </div>

      <div className="-mx-6 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={subscriberData}
            margin={{
              top: 15,
              left: 20,
              right: 20,
            }}
            onMouseLeave={() => setActiveIndex(null)}
            onMouseMove={(e: any) => {
              if (e.activeLabel) setActiveIndex(e.activeLabel);
            }}
          >
            <defs>
              {/* Gradient for the first line (Light Green) */}
              <linearGradient id="gradientS1" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#9AD77C0F" stopOpacity={1} />
                <stop offset="10%" stopColor="#9AD77C" stopOpacity={1} />
                <stop offset="60%" stopColor="#9AD77C" stopOpacity={1} />
                <stop offset="80%" stopColor="#9AD77C" stopOpacity={1} />
                <stop offset="100%" stopColor="#9AD77C0F" stopOpacity={1} />
              </linearGradient>

              {/* Gradient for the second line (Dark Green) */}
              <linearGradient id="gradientS2" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1D653705" stopOpacity={1} />
                <stop offset="10%" stopColor="#1D6537" stopOpacity={1} />
                <stop offset="60%" stopColor="#1D6537" stopOpacity={1} />
                <stop offset="80%" stopColor="#1D6537" stopOpacity={1} />
                <stop offset="100%" stopColor="#1D653705" stopOpacity={1} />
              </linearGradient>

              <filter
                id="dotShadow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feDropShadow
                  dx="0"
                  dy="2"
                  stdDeviation="3"
                  floodColor="#000000"
                  floodOpacity="0.5"
                />
              </filter>
            </defs>

            <XAxis
              dataKey="week"
              axisLine={false}
              tickLine={false}
              orientation="bottom"
              interval="preserveStartEnd"
              tick={<CustomTick activeLabel={activeIndex} />}
            />

            <Tooltip
              content={<CustomTooltip active={undefined} payload={undefined} />}
              cursor={{
                stroke: '#507773',
                strokeWidth: 1,
                strokeDasharray: '4 4',
              }}
            />

            <Line
              type="monotone"
              dataKey="s1"
              stroke="url(#gradientS1)"
              strokeWidth={8}
              dot={false}
              activeDot={false}
            />
            <Line
              type="monotone"
              dataKey="s2"
              stroke="url(#gradientS2)"
              strokeWidth={8}
              dot={false}
              activeDot={{
                r: 10,
                fill: '#262626',
                stroke: '#ffffff',
                strokeWidth: 3,
                filter: 'url(#dotShadow)',
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload }: { active: any; payload: any }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black-12 flex h-9 items-center rounded-[10px] rounded-tl px-3 shadow-[0px_4px_12px_0px_#00000033]">
        <p className="text-lg text-white">
          {payload[1].value}{' '}
          <span className="text-xs opacity-60">subscriber</span>
        </p>
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
        className={`cursor-pointer text-sm transition-colors duration-200 ${isActive ? 'fill-black-8 font-medium' : 'fill-black-6'}`}
      >
        {payload.value}
      </text>
    </g>
  );
};

export default NewSubscriber;
