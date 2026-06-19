'use client';

import { useState } from 'react';
import { UserRole } from '@/types';
import { Heart, Users, ShieldCheck, Terminal } from 'lucide-react';
import ShinyButton from '@/components/shiny-button';
import { useMutation } from '@tanstack/react-query';
import { saveUserWithRole } from './actions';
import { useRouter } from 'next/navigation';

const roles = [
  {
    value: 'Adopter' as UserRole,
    label: 'Adopter',
    description: 'I want to find and adopt a pet.',
    icon: Heart,
  },
  {
    value: 'Volunteer' as UserRole,
    label: 'Volunteer',
    description: 'I want to help manage and upload pet profiles.',
    icon: Users,
  },
  {
    value: 'Shelter_Admin' as UserRole,
    label: 'Shelter Admin',
    description: 'I manage a shelter and its adoption workflows.',
    icon: ShieldCheck,
  },
  {
    value: 'Developer' as UserRole,
    label: 'Developer',
    description:
      'I build and integrate applications using the pet adoption API.',
    icon: Terminal,
  },
];

export default function OnboardingPage() {
  const [selected, setSelected] = useState<UserRole | null>(null);
  const router = useRouter();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (role: UserRole) => saveUserWithRole(role),
    onSuccess: () => {
      router.push('/dashboard');
    },
  });

  const handleContinue = () => {
    if (!selected) return;
    mutate(selected);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 px-4">
      <h1 className="text-4xl font-bold font-heading mb-2">
        Welcome to{' '}
        <span className="bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent">
          PawMatch
        </span>
      </h1>
      <p className="text-zinc-500 mb-10">How will you be using PawMatch?</p>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 w-full max-w-4xl mb-8">
        {roles.map(({ value, label, description, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setSelected(value)}
            className={`flex flex-col items-center gap-3 rounded-xl border-2 p-6 text-center transition-all
              ${
                selected === value
                  ? 'border-brand-600 bg-brand-50 shadow-md'
                  : 'border-zinc-200 bg-white hover:border-brand-300'
              }
              `}
          >
            <Icon
              className={`size-8 ${selected === value ? 'text-brand-600' : 'text-zinc-400'}`}
            />
            <span className="font-semibold text-zinc-800">{label}</span>
            <span className="text-sm text-zinc-500">{description}</span>
          </button>
        ))}
      </div>

      <ShinyButton
        onClick={handleContinue}
        href="/dashboard"
        className={`relative z-10 h-14 w-full max-w-xs text-base shadow-lg transition-shadow duration-300 hover:shadow-xl `}
      >
        {isPending ? 'Saving...' : 'Continue'}
      </ShinyButton>
    </div>
  );
}
