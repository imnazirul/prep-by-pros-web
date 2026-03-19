import { cn } from '@/lib/utils';

const PageHeader = ({
  title,
  subTitle,
  className,
}: {
  title: string;
  subTitle: string;
  className?: string;
}) => {
  return (
    <section className={cn('py-8 md:py-10 lg:py-12', className)}>
      <div className="container">
        <h2 className="text-black-10 text-2xl font-medium md:text-3xl lg:text-4xl lg:leading-[140%]">
          {title}
          <span className="text-black-7 block">{subTitle}</span>
        </h2>
      </div>
    </section>
  );
};

export default PageHeader;
