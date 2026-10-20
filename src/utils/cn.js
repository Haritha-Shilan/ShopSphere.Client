import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class names safely with tailwind-merge and clsx.
 * @param {...any} inputs - Class names or expressions.
 * @returns {string} Merged class name string.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
