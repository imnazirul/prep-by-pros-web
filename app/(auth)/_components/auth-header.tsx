import Icon from '@/lib/icon';
import React from 'react';

const AuthHeader = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) => {
  return (
    <div className="mb-8 space-y-8 md:space-y-10 lg:space-y-12">
      <Icon height={80} width={142} name="logo" />

      <div className="space-y-2">
        <h1 className="text-black-10 text-2xl font-semibold md:text-3xl lg:text-4xl">
          {title}
        </h1>
        <p className="text-black-7 text-xl md:text-xl lg:text-2xl">
          {subTitle}
        </p>
      </div>
    </div>
  );
};

export default AuthHeader;
