import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DiscardAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DiscardAlert({ isOpen, onClose, onConfirm }: DiscardAlertProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Discard post?</DialogTitle>
          <DialogDescription>If you leave, your post won&apos;t be saved!</DialogDescription>
        </DialogHeader>
        <div className="mt-6 grid grid-cols-2 gap-2">
          <Button
            variant="secondary"
            size="lg"
            onClick={onClose}
            className="bg-primary-200 hover:bg-primary-300 text-primary"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="bg-[#EF4444] text-white hover:bg-[#EF4444]"
            size="lg"
            onClick={onConfirm}
          >
            Discard
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
