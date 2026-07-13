import { SearchX } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';

const NoItems = ({
  heading,
  description,
  buttonText,
}: {
  heading: string;
  description: string;
  buttonText: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="size-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <SearchX className="size-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-bold text-gray-900">{heading}</h3>
      <p className="text-gray-500 max-w-xs mx-auto mt-2">{description}</p>
      <Button variant="outline" className="mt-6" asChild>
        <a href="/dashboard">{buttonText}</a>
      </Button>
    </div>
  );
};

export default NoItems;
