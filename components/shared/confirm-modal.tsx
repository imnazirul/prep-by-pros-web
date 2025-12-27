import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import Icon, { IconName } from '@/lib/icon';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';

const ConfirmModal = ({
  open,
  setOpen,
  icon,
  iconHeight,
  iconWidth,
  title,
  subTitle,
  buttonLabel,
  buttonAction,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  icon: IconName;
  iconHeight: number;
  iconWidth: number;
  title: string;
  subTitle: string | ReactNode;
  buttonLabel?: string;
  buttonAction?: () => void;
}) => {
  const router = useRouter();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        className="w-full gap-0 sm:max-w-170"
      >
        <div className="mb-10 flex flex-col items-center justify-center md:mb-15">
          <Icon
            name={icon}
            height={iconHeight}
            width={iconWidth}
            className="max-sm:size-48"
          />
          <div className="mx-auto mt-7 max-w-120.5 space-y-3 text-center">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{subTitle}</DialogDescription>
          </div>
        </div>
        <Button
          className={'w-full'}
          size={'lg'}
          onClick={() => {
            if (buttonAction) {
              buttonAction();
            } else {
              setOpen(false);

              setTimeout(() => {
                router.push(`/`);
              }, 200);
            }
          }}
        >
          {buttonLabel ? buttonLabel : 'Back to home'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;
