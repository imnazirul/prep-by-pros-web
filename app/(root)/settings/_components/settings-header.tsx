import { ReactNode } from 'react';

const SettingsHeader = ({
  title,
  subTitle,
  children,
}: {
  title: string;
  subTitle: string;
  children?: ReactNode;
}) => {
  return (
    <div className="border-black-5 mb-8 flex items-center justify-between border-b pb-4 max-sm:flex-wrap max-sm:gap-3 md:mb-10 md:pb-6 lg:mb-12">
      <div className="space-y-0.5">
        <h1 className="text-black-10 text-[28px] font-semibold">{title}</h1>
        <p className="text-black-8 text-lg">{subTitle}</p>
      </div>

      {children}
    </div>
  );
};

export default SettingsHeader;
