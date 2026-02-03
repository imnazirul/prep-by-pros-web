'use client';

import Icon from '@/lib/icon';
import { cn } from '@/lib/utils';
import { useGetDashboardViewsQuery } from '@/redux/api/authApi';
import { PolarAngleAxis, RadialBar, RadialBarChart } from 'recharts';

const TotalViewsRadial = ({
  className,
  isDashboard,
}: {
  className?: string;
  isDashboard?: boolean;
}) => {
  const { data: viewsData, isLoading } = useGetDashboardViewsQuery();

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

  const radialData = viewsData?.results || [];
  const totalViews = radialData.reduce((acc, curr) => acc + curr.value, 0);

  // Sorting to match UI usually (e.g. descending)
  const sortedData = [...radialData].sort((a, b) => b.value - a.value);

  return (
    <div
      className={cn(
        'flex h-122.5 flex-col justify-between rounded-2xl bg-[#FFF8C9] p-8 md:rounded-3xl lg:rounded-4xl xl:rounded-[40px]',
        className
      )}
    >
      <div>
        <div className="mb-0 flex items-center justify-between">
          <p className="text-black-8 text-2xl">Total views</p>
          <span className="text-black-8 flex items-center text-2xl">
            7%
            <Icon
              name="chevron_down_fill"
              className="rotate-180 text-[#16A34A]"
              height={32}
              width={32}
            />
          </span>
        </div>

        <h2 className="text-[40px] font-medium">{totalViews.toLocaleString()}</h2>
      </div>

      <div className="flex-1 space-y-5">
        <div className={cn(isDashboard ? 'lg:grid 2xl:grid-cols-2' : '')}>
          <div
            className={cn(
              'relative mx-auto flex  justify-center',
              !isDashboard && 'mx-auto',
              isDashboard ? 'size-70.5' : 'size-50.5'
            )}
          >
            <RadialBarChart
              width={isDashboard ? 282 : 202}
              height={isDashboard ? 282 : 202}
              className="h-full w-full"
              innerRadius="50%"
              outerRadius="100%"
              data={radialData}
              startAngle={90}
              endAngle={-270}
              barSize={10}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />

              <RadialBar background={{ fill: '#F0E9BD' }} dataKey="value" cornerRadius={30} />
            </RadialBarChart>

            <div className="absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/8">
              <Icon height={32} width={32} name="fi_2" className="text-black-10" />
            </div>
          </div>

          {isDashboard && (
            <div className="inline-block space-y-10">
              {sortedData.map((item, index) => {
                // Heuristic for color since the prompt didn't specify mapping in API.
                // Using the component's original hardcoded colors if possible or generic ones from Item if available.
                const color = item.fill || (index === 0 ? '#1D6537' : '#9AD77C');

                return (
                  <div key={item.name}>
                    <div className="mb-3 flex items-center gap-1">
                      <div className="size-4 rounded-full" style={{ backgroundColor: color }}></div>
                      <span className="text-black-8 text-[22px]">{item.name}</span>
                    </div>

                    <div className="mb-2 flex items-baseline gap-2">
                      <h2 className="text-black-10 text-4xl font-medium">
                        {item.value.toLocaleString()}
                      </h2>
                      <span className="text-black-7 text-base">Views</span>
                    </div>
                    {/* Placeholder description calculation for now */}
                    <p className="text-black-7 text-sm">Data for {item.name}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {!isDashboard && (
          <div className="text-black-7 flex justify-center gap-6 text-sm font-medium">
            {sortedData.map((item, index) => {
              const color = item.fill || (index === 0 ? '#1D6537' : '#9AD77C');
              return (
                <div key={item.name} className="flex items-center gap-1">
                  <div className="size-2 rounded-full" style={{ backgroundColor: color }} />{' '}
                  {item.name}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TotalViewsRadial;
