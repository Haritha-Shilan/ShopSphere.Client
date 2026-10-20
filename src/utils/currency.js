/**
 * Formats a numeric value into Indian Rupee (INR) currency representation.
 * @param {number} amount - Numeric amount to format.
 * @returns {string} Formatted currency string (e.g. "₹2,499").
 */
export function formatINR(amount) {
  if (typeof amount !== 'number') return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
