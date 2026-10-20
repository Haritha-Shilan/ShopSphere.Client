import { forwardRef, useId, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/utils/cn';

export const Input = forwardRef(
  (
    {
      label,
      id: customId,
      error,
      helperText,
      type = 'text',
      className,
      leftIcon: LeftIcon,
      required = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = customId || generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;

    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const computedType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="mb-1.5 block text-xs font-semibold tracking-wide text-gray-700"
          >
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        <div className="relative">
          {LeftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <LeftIcon className="h-4 w-4" aria-hidden="true" />
            </div>
          )}

          <input
            ref={ref}
            id={id}
            type={computedType}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={cn(
              'block w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-offset-0',
              LeftIcon ? 'pl-9' : 'pl-3.5',
              isPassword ? 'pr-10' : 'pr-3.5',
              error
                ? 'border-red-400 text-red-900 focus:border-red-500 focus:ring-red-100'
                : 'border-gray-300 focus:border-indigo-600 focus:ring-indigo-100',
              disabled && 'cursor-not-allowed bg-gray-50 text-gray-400 opacity-60',
              className
            )}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          )}
        </div>

        {error ? (
          <p id={errorId} role="alert" className="mt-1.5 text-xs font-medium text-red-600">
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="mt-1.5 text-xs text-gray-500">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
