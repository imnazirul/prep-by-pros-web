'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';
import Icon from '@/lib/icon';
import { Button } from './button';
import { cn } from '@/lib/utils';
import { ReactNode, useState } from 'react';

const CustomSelectModal = ({
  children,
  label,
  options,
  setValue,
  value,
  buttonAction,
  buttonLabel,
  buttonClass,
}: {
  children: ReactNode;
  label: string | React.ReactNode;
  options: {
    label: string;
    value: string;
  }[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  buttonLabel?: string;
  buttonAction?: () => void;
  buttonClass?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-170" showCloseButton={false}>
        <DialogHeader className="mb-10">
          <DialogTitle>{label}</DialogTitle>
        </DialogHeader>
        <div className="bg-black-4 rounded-[20px] p-5">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setValue(option.value);
                if (!buttonAction && !buttonLabel) {
                  setOpen(false);
                }
              }}
              className="border-primary-200/60 flex w-full cursor-pointer items-center justify-between gap-4 border-b py-6 first:pt-0 last:border-b-0 last:pb-0"
            >
              <span
                className={`${value == option.value ? 'text-primary' : 'text-black-7'} text-2xl`}
              >
                {option.label}
              </span>

              <Icon
                name={
                  value == option.value
                    ? 'checkmark_circle_fill'
                    : 'checkmark_circle'
                }
                height={28}
                width={28}
                className={
                  value == option.value ? 'text-primary' : 'text-[#BFBFBF]'
                }
              />
            </button>
          ))}
        </div>

        {buttonLabel && buttonAction && (
          <Button
            onClick={buttonAction}
            size={'lg'}
            className={cn('mt-10 w-full', buttonClass)}
          >
            {buttonLabel}
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CustomSelectModal;
