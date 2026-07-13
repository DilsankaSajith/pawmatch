'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useMutation } from '@tanstack/react-query';
import { PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';
import Confetti from 'react-dom-confetti';

interface ConfirmationModalProps {
  title: string;
  description: string;
  confirmText?: string;
  pendingText?: string;
  successMessage?: string;
  errorMessage?: string;
  onConfirm: () => Promise<void>;
  onSuccess?: () => void;
  enableConfetti?: boolean;
}

const ConfirmationModal = ({
  children,
  title,
  description,
  confirmText = 'Confirm',
  pendingText = 'Submitting...',
  successMessage = 'Done! ❤️',
  errorMessage = 'Something went wrong. Please try again.',
  onConfirm,
  onSuccess,
  enableConfetti,
}: PropsWithChildren<ConfirmationModalProps>) => {
  const [open, setOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: onConfirm,
    onSuccess: () => {
      setOpen(false);

      if (enableConfetti) {
        setShowConfetti(true);
      }
      toast.success(successMessage);
      onSuccess?.();
    },
    onError: (err: Error) => {
      toast.error(err?.message || errorMessage);
      setOpen(false);
    },
  });

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-scroll no-scrollbar p-8">
          <DialogHeader>
            <h2 className="text-lg/7 font-medium tracking-tight text-gray-950">
              {title}
            </h2>
            <p className="text-md/6 text-gray-600">{description}</p>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" onClick={() => mutate()} disabled={isPending}>
              {isPending ? pendingText : confirmText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Confetti
        active={showConfetti}
        config={{ elementCount: 200, spread: 90 }}
      />
    </>
  );
};

export default ConfirmationModal;
