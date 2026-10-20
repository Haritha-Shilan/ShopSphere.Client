import { cn } from '@/utils/cn';

const sizeMap = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-8 w-8 border-3',
  xl: 'h-12 w-12 border-4',
};

export function Spinner({ size = 'md', className, label = 'Loading...' }) {
  return (
    <div role="status" className="inline-flex items-center justify-center">
      <div
        className={cn(
          'animate-spin rounded-full border-gray-300 border-t-indigo-600',
          sizeMap[size] || sizeMap.md,
          className
        )}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
