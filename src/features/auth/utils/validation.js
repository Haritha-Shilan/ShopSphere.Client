const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates full name for user registration.
 * @param {string} name
 * @returns {string|null} Error message or null if valid.
 */
export function validateFullName(name) {
  if (!name || !name.trim()) {
    return 'Full name is required.';
  }
  if (name.trim().length < 2) {
    return 'Full name must be at least 2 characters.';
  }
  return null;
}

/**
 * Validates email address format and presence.
 * @param {string} email
 * @returns {string|null} Error message or null if valid.
 */
export function validateEmail(email) {
  if (!email || !email.trim()) {
    return 'Email address is required.';
  }
  if (!EMAIL_REGEX.test(email.trim())) {
    return 'Please enter a valid email address (e.g., alex@example.com).';
  }
  return null;
}

/**
 * Validates password length and presence.
 * @param {string} password
 * @param {boolean} isNew - Whether this is a new password (signup)
 * @returns {string|null} Error message or null if valid.
 */
export function validatePassword(password, isNew = false) {
  if (!password) {
    return 'Password is required.';
  }
  if (isNew && password.length < 8) {
    return 'Password must be at least 8 characters long.';
  }
  return null;
}

/**
 * Validates password confirmation matches the password.
 * @param {string} password
 * @param {string} confirmPassword
 * @returns {string|null} Error message or null if valid.
 */
export function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) {
    return 'Please confirm your password.';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match.';
  }
  return null;
}
