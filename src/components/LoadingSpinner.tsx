import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  message?: string;
  className?: string;
}

export function LoadingSpinner({ message = 'Loading...', className }: LoadingSpinnerProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="animate-spin h-4 w-4 border-2 border-white/20 border-l-white/80 rounded-full" />
      <span className="text-white/80">{message}</span>
    </div>
  );
}