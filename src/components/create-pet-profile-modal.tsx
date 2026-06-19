'use client';

import { useQueryClient } from '@tanstack/react-query';
import { PropsWithChildren, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import z from 'zod';
import {
  PET_AGE_VALIDATOR,
  PET_BREED_VALIDATOR,
  PET_DESCRIPTION_VALIDATOR,
  PET_LAST_VACCINATED_DATE_VALIDATOR,
  PET_NAME_VALIDATOR,
} from '@/lib/validators/pet-validator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ChevronsUpDown } from 'lucide-react';
import { HEALTH_CONDITION } from '@/validators/option-validator';
import { cn } from '@/lib/utils';

const PET_PROFILE_VALIDATOR = z.object({
  name: PET_NAME_VALIDATOR,
  age: PET_AGE_VALIDATOR,
  breed: PET_BREED_VALIDATOR,
  description: PET_DESCRIPTION_VALIDATOR,
  lastVaccinatedDate: PET_LAST_VACCINATED_DATE_VALIDATOR,
});

type PetProfileForm = z.infer<typeof PET_PROFILE_VALIDATOR>;
type HealthConditionType = (typeof HEALTH_CONDITION.options)[number]['value'];

export const CreatePetProfileModal = ({ children }: PropsWithChildren) => {
  const [healthCondition, setHealthCondition] = useState<
    HealthConditionType | ''
  >('');
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PetProfileForm>({
    resolver: zodResolver(PET_PROFILE_VALIDATOR),
  });

  const onSubmit = () => {
    console.log('Hello');
  };

  return (
    <>
      <Dialog>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent className="max-w-xl p-8">
            <DialogHeader>
              <h2 className="text-lg/7 font-medium tracking-tight text-gray-950">
                Add a Furry Friend
              </h2>
              <p className="text-sm/6 text-gray-600">
                Give a friend a chance to find their forever home.
              </p>
            </DialogHeader>
            <FieldGroup>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    {...register('name')}
                    placeholder="e.g. Captain"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </Field>

                <Field>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    {...register('age', { valueAsNumber: true })}
                    placeholder="e.g. 3"
                  />
                  {errors.age && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.age.message}
                    </p>
                  )}
                </Field>

                <Field>
                  <Label htmlFor="breed">Breed</Label>
                  <Input
                    id="breed"
                    {...register('breed')}
                    placeholder="e.g. Tabby Cat"
                  />
                  {errors.breed && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.breed.message}
                    </p>
                  )}
                </Field>

                <Field>
                  <Label htmlFor="lastVaccinatedDate">
                    Last Vaccinated Date
                  </Label>
                  <Input
                    id="lastVaccinatedDate"
                    type="date"
                    {...register('lastVaccinatedDate')}
                  />
                  {errors.lastVaccinatedDate && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.lastVaccinatedDate.message}
                    </p>
                  )}
                </Field>
              </div>

              <Field className="col-span-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  {...register('description')}
                  placeholder="e.g. Loves to play fetch and cuddle"
                  rows={4}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </Field>
            </FieldGroup>

            {/* <FieldGroup>
              <Field>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between"
                    >
                      <span>Health Condition</span>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {HEALTH_CONDITION.options.map((option) => (
                      <DropdownMenuItem
                        key={option.label}
                        className={cn(
                          'flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100 bg-zinc-100',
                        )}
                        onClick={() => {
                          setHealthCondition(option.value);
                        }}
                      >
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </Field>
            </FieldGroup> */}

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Add pet</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};
