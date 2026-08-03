'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ChevronsUpDown, Loader2, Sparkles } from 'lucide-react';
import {
  ADOPTION_STATUS,
  HEALTH_CONDITION,
} from '@/validators/option-validator';

import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ImageUploader from './image-uploader';
import { toast } from 'sonner';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPetProfile } from '@/app/dashboard/actions';
import { PET_FORMAT } from '@/app/api/struct-data/types';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  age: z
    .string()
    .min(1, 'Age must be a positive number')
    .max(3, 'Age must be realistic'),
  breed: z.string().min(1, 'Breed is required'),
  address: z.string().min(1, 'Address is required'),
  lastVaccinatedDate: z.string().optional(),
  description: z
    .string()
    .min(1, 'Add a little description about your fury friend ')
    .max(500, 'Description must be less than 500 characters'),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
});

type PetFormFields = z.infer<typeof schema>;

// const queryClient = useQueryClient();

export const CreatePetProfileModal = ({ children }: PropsWithChildren) => {
  const { getLocation, isLoading: isLocating } = useGeolocation();
  const [isOpen, setIsOpen] = useState(false);

  // const [imageUrl, setImageUrl] = useState<string | null>('');

  // useEffect(() => {
  //   const storedImageUrl = localStorage.getItem('uploaded-image-url')
  //   if(storedImageUrl){
  //     setImageUrl(storedImageUrl)
  //   }
  // }, [])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<PetFormFields>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();

  const latitude = watch('latitude');
  const longitude = watch('longitude');

  const handleGetLocation = async () => {
    try {
      const { lat, lng } = await getLocation();
      setValue('latitude', String(lat));
      setValue('longitude', String(lng));
      toast.success('Location captured!');
    } catch {
      toast.error('Could not get your location. Enter it manually.');
    }
  };

  const [healthCondition, setHealthCondition] = useState<string>('Healthy');
  const [gender, setGender] = useState<string>('Male');
  const [adoptionStatus, setAdoptionStatus] = useState<string>('Ready');
  const [animalType, setAnimalType] = useState<string>('Dog');

  const [pastedText, setPastedText] = useState<string>('');

  // React query for mutation for structured data api
  const { mutate: extractDetails, isPending: isExtracting } = useMutation({
    mutationFn: async (text: string) => {
      const response = await fetch('http://localhost:3000/api/struct-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'f94b0ac9-f2b2-4f47-af58-64d3e0ec44c3',
        },
        body: JSON.stringify({
          text: text,
          format: PET_FORMAT,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to structure data');
      }

      return response.json();
    },
    onSuccess: (data) => {
      const extracted = data.data;

      if (extracted) {
        const opts = { shouldDirty: true, shouldValidate: true } as const;

        // Set react-hook-form fields
        if (extracted.name) setValue('name', extracted.name, opts);
        if (extracted.age) setValue('age', String(extracted.age), opts);
        if (extracted.breed) setValue('breed', extracted.breed, opts);
        if (extracted.address) setValue('address', extracted.address, opts);
        if (extracted.description)
          setValue('description', extracted.description, opts);
        if (extracted.lastVaccinatedDate)
          setValue('lastVaccinatedDate', extracted.lastVaccinatedDate, opts);

        // Set dropdown state values
        if (extracted.gender) setGender(extracted.gender);
        if (extracted.healthCondition)
          setHealthCondition(extracted.healthCondition);
        if (extracted.animalType) setAnimalType(extracted.animalType);
      }

      toast.success('Pet details extracted successfully! 🎉');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to extract details');
    },
  });

  const { mutate: server_createPet, isPending } = useMutation({
    mutationFn: createPetProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pets'] });
      toast.success('Pet profile created successfully! 🎉');
      localStorage.removeItem('uploaded-image-url');
      reset();
      setHealthCondition('Healthy');
      setGender('Male');
      setAdoptionStatus('Ready');
      setAnimalType('Dog');
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error(error.message || 'Something went wrong. Please try again.');
    },
  });

  // Handle extract details
  const handleExtractDetails = () => {
    if (!pastedText.trim()) {
      toast.warning('Please paste some text about your pet first.');
      return;
    }

    extractDetails(pastedText);
  };

  const onSubmit: SubmitHandler<PetFormFields> = async (data) => {
    const imageUrl = localStorage.getItem('uploaded-image-url');

    if (!imageUrl) {
      toast.error('Please upload an image for your furry friend.');
      return;
    }

    server_createPet({
      ...data,
      healthCondition,
      gender,
      adoptionStatus,
      imageUrl,
      animalType,
      location:
        data.latitude && data.longitude
          ? { latitude: data.latitude, longitude: data.longitude }
          : undefined,
    });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-scroll no-scrollbar p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <h2 className="text-lg/7 font-medium tracking-tight text-gray-950">
                Add a Furry Friend
              </h2>
              <p className="text-sm/6 text-gray-600">
                Give a friend a chance to find their forever home.
              </p>
            </DialogHeader>

            <FieldGroup>
              <ImageUploader />
            </FieldGroup>

            {/* AI Text Extraction Card */}
            <div className="relative mt-2 mb-4 rounded-xl border border-brand-200/60 bg-gradient-to-br from-brand-25 via-white to-brand-50 p-[1px] shadow-sm">
              <div className="rounded-[11px] bg-gradient-to-br from-brand-25/80 via-white to-brand-50/50 p-4">
                {/* Card Header */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 shadow-sm">
                    <Sparkles className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 leading-tight">
                      AI Auto-Fill
                    </p>
                    <p className="text-[11px] text-gray-400 leading-tight">
                      Paste pet info — we&apos;ll do the rest
                    </p>
                  </div>
                </div>

                {/* Textarea */}
                <div className="relative">
                  <textarea
                    id="auto-text-extractor"
                    placeholder='e.g. "Meet Bella, a 2-year-old female Golden Retriever from Colombo. She&apos;s healthy, vaccinated on 2024-12-01, and loves belly rubs..."'
                    rows={3}
                    className="w-full resize-none rounded-lg border border-brand-200/50 bg-white/70 px-3.5 py-2.5 text-sm text-gray-700 placeholder:text-gray-300 shadow-inner backdrop-blur-sm transition-all duration-200 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-300/30"
                    value={pastedText}
                    onChange={(e) => setPastedText(e.target.value)}
                  />

                  {/* Shimmer overlay while extracting */}
                  {isExtracting && (
                    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg">
                      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-brand-100/40 to-transparent" />
                    </div>
                  )}
                </div>

                {/* Extract Button */}
                <Button
                  className="mt-3 w-full gap-2 rounded-lg bg-gradient-to-r from-brand-600 to-brand-700 text-white shadow-md transition-all duration-200 hover:from-brand-700 hover:to-brand-800 hover:shadow-lg disabled:from-gray-200 disabled:to-gray-300 disabled:text-gray-400 disabled:shadow-none"
                  type="button"
                  onClick={handleExtractDetails}
                  disabled={isExtracting || !pastedText.trim()}
                >
                  {isExtracting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Extracting details...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      <span>Extract Details</span>
                    </>
                  )}
                </Button>
              </div>
            </div>

            <FieldGroup className="mt-6">
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g. Captain"
                    {...register('name')}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </Field>

                <Field>
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" placeholder="e.g. 3" {...register('age')} />
                  {errors.age && (
                    <p className="text-xs text-red-500">{errors.age.message}</p>
                  )}
                </Field>

                <Field>
                  <Label htmlFor="breed">Breed</Label>
                  <Input
                    id="breed"
                    placeholder="e.g. Tabby Cat"
                    {...register('breed')}
                  />
                  {errors.breed && (
                    <p className="text-xs text-red-500">
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
                    <p className="text-xs text-red-500">
                      {errors.lastVaccinatedDate.message}
                    </p>
                  )}
                </Field>

                <Field>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="e.g. 123 Park Lane"
                    {...register('address')}
                  />
                  {errors.address && (
                    <p className="text-xs text-red-500">
                      {errors.address.message}
                    </p>
                  )}
                </Field>

                <Field>
                  <Label htmlFor="description">Health Condition</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                      >
                        <span className="text-sm text-zinc-500">
                          {
                            HEALTH_CONDITION.options.find(
                              (option) => option.value === healthCondition,
                            )?.label
                          }
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {HEALTH_CONDITION.options.map((option) => (
                        <DropdownMenuItem
                          key={option.label}
                          className="flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100 bg-zinc-100"
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

                <Field>
                  <Label htmlFor="gender">Gender</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                      >
                        <span className="text-sm text-zinc-500">{gender}</span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setGender('Male')}>
                        Male
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setGender('Female')}>
                        Female
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Field>

                <Field>
                  <Label htmlFor="animal">Animal Type</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                      >
                        <span className="text-sm text-zinc-500">
                          {animalType}
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setAnimalType('Dog')}>
                        Dog
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setAnimalType('Cat')}>
                        Cat
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Field>

                <Field>
                  <Label htmlFor="description">Adoption Status</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                      >
                        <span className="text-sm text-zinc-500">
                          {adoptionStatus}
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {ADOPTION_STATUS.options.map((option) => (
                        <DropdownMenuItem
                          key={option.label}
                          className="flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100 bg-zinc-100"
                          onClick={() => {
                            setAdoptionStatus(option.value);
                          }}
                        >
                          {option.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Field>
              </div>

              <Field className="col-span-2 mb-3">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  placeholder="e.g. Loves to play fetch and cuddle"
                  rows={4}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register('description')}
                />
                {errors.description && (
                  <p className="text-xs text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </Field>

              <Field className="col-span-2">
                <Label>Location</Label>

                <div className="flex gap-2 items-center">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGetLocation}
                    disabled={isLocating}
                    className="shrink-0"
                  >
                    {isLocating ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <p className="text-sm text-zinc-500">
                        Capture my location
                      </p>
                    )}
                  </Button>
                </div>
              </Field>
            </FieldGroup>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button disabled={isPending} type="submit">
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  'Add pet'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
