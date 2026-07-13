import Image from 'next/image';
import { Heart, Mail, User, PawPrint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ConfirmationModal from '@/components/confirmation-modal';
import { deleteApplication, markApplicationAsAccepted } from './actions';
import { useQueryClient } from '@tanstack/react-query';

type ApplicationStatus = 'Pending' | 'Approved' | 'Rejected';

interface ApplicationCardProps {
  application: {
    id: string;
    status: ApplicationStatus;
    pet: {
      id: string;
      name: string;
      breed: string;
      imageUrl: string | null;
    };
    applicant: {
      id: string;
      email: string;
    };
  };
}

const statusStyles: Record<ApplicationStatus, string> = {
  Pending: 'bg-amber-100 text-amber-700',
  Approved: 'bg-emerald-100 text-emerald-700',
  Rejected: 'bg-red-100 text-red-600',
};

const statusDotStyles: Record<ApplicationStatus, string> = {
  Pending: 'bg-amber-500',
  Approved: 'bg-emerald-500',
  Rejected: 'bg-red-500',
};

const ApplicationCard = ({ application }: ApplicationCardProps) => {
  const { pet, applicant, status } = application;

  const queryClient = useQueryClient();

  return (
    <div className="group relative flex flex-col rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-slate-100 max-w-xs w-full">
      {/* Image */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-100">
        {pet.imageUrl ? (
          <Image
            src={pet.imageUrl}
            alt={`Photo of ${pet.name}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Heart className="h-12 w-12 text-slate-300" />
          </div>
        )}

        {/* Status badge */}
        <span
          className={`absolute top-3 right-3 rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyles[status]}`}
        >
          {status}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Pet Name & Breed */}
        <div>
          <h3 className="text-lg font-bold text-slate-800 leading-tight">
            {pet.name}
          </h3>
          <p className="text-sm text-slate-500">{pet.breed}</p>
        </div>

        {/* Applicant Email */}
        <div className="flex items-center gap-1.5">
          <Mail className="h-4 w-4 shrink-0 text-slate-400" />
          <span className="text-sm text-slate-500 truncate">
            {applicant.email}
          </span>
        </div>

        {/* Application Status Indicator */}
        <div className="flex items-center gap-1.5">
          <span
            className={`inline-block h-2 w-2 rounded-full ${statusDotStyles[status]}`}
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-1">
          <ConfirmationModal
            title="Found the perfect family? 🏡❤️"
            description="Accepting this application will notify the adopter and open the door for you both to connect and arrange the pet's new journey home."
            confirmText="Accept Application"
            successMessage="Application accepted! 🎉"
            onConfirm={() => markApplicationAsAccepted(application.id)}
          >
            <Button className="w-full">Accept and Contact</Button>
          </ConfirmationModal>
          <ConfirmationModal
            title="Not the right match? 💛"
            description="Rejecting this application will permanently remove the application. Adopters can always apply again for another lovely companion."
            confirmText="Reject Application"
            successMessage="Application rejected"
            onConfirm={() => deleteApplication(application.id)}
            onSuccess={() =>
              queryClient.invalidateQueries({ queryKey: ['applications'] })
            }
            enableConfetti={false}
          >
            <Button className="w-full" variant="ghost">
              Reject
            </Button>
          </ConfirmationModal>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
