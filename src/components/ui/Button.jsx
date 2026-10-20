import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const variantStyles = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-500',
  secondary:
    'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus-visible:ring-gray-500',
  outline:
    'border border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus-visible:ring-indigo-500',
  ghost: 'text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-xs font-medium rounded-md',
  md: 'px-4 py-2 text-sm font-medium rounded-lg',
  lg: 'px-5 py-2.5 text-base font-medium rounded-lg',
};

export const Button = forwardRef(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      type = 'button',
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          'inline-flex cursor-pointer items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          variantStyles[variant] || variantStyles.primary,
          sizeStyles[size] || sizeStyles.md,
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
