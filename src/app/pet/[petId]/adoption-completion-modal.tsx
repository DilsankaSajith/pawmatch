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
import { Pet } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { PropsWithChildren, useState } from 'react';
import { createApplication } from './actions';
import { toast } from 'sonner';
import Confetti from 'react-dom-confetti';

const AdoptionCompletionModal = ({
  children,
  pet,
}: PropsWithChildren<{ pet: Pet }>) => {
  const [open, setOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const { mutate, isPending, isError } = useMutation({
    mutationFn: () => createApplication(pet.id, pet.addedBy.id),
    onSuccess: () => {
      setOpen(false);
      setShowConfetti(true);
      toast.success('Paws-itively Submitted! ❤️');
    },
    onError: (err: Error) => {
      toast.error(
        `${err?.message || 'Our tails got tangled! Please try again in a moment. 🐕'}`,
      );
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
              Seal the Bond of Love 🎉
            </h2>
            <p className="text-md/6 text-gray-600">
              An email will be sent to the shelter or the person responsible for
              the pet, and they will reach out to you soon.
            </p>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" onClick={() => mutate()} disabled={isPending}>
              {isPending ? 'Submitting...' : 'Confirm Adoption'}
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

export default AdoptionCompletionModal;
