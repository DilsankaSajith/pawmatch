import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { AnchorHTMLAttributes } from 'react';

interface ShinyButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

const ShinyButton = ({
  className,
  children,
  href,
  ...props
}: ShinyButtonProps) => {
  return (
    <Link href={href ?? '#'} {...props}>
      <div
        className={cn(
          'group relative flex transform items-center justify-center gap-2 overflow-hidden whitespace-nowrap border border-white bg-brand-700 px-8 text-base/7 font-medium text-white transition-all duration-300 hover:ring-2 hover:ring-brand-700 hover:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-[8px]',
          className
        )}
      >
        {/* Button content */}
        <span className="relative z-10 flex items-center gap-2">
          {children}
          <ArrowRight className="h-4 w-4 shrink-0 text-white transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
        </span>

        {/* Shiny sweep */}
        <span className="absolute -top-[50px] -left-[75px] h-[155px] w-8 rotate-[35deg] bg-white opacity-20 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:left-[120%]" />
      </div>
    </Link>
  );
};

export default ShinyButton;
