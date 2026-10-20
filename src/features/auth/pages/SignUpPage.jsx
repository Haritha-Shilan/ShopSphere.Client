import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { APP_ROUTES } from '@/constants/appRoutes';
import {
  validateFullName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '@/features/auth/utils/validation';

export function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific error as the user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (successMessage) setSuccessMessage('');
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let fieldError = null;

    if (name === 'fullName') {
      fieldError = validateFullName(value);
    } else if (name === 'email') {
      fieldError = validateEmail(value);
    } else if (name === 'password') {
      fieldError = validatePassword(value, true);
    } else if (name === 'confirmPassword') {
      fieldError = validateConfirmPassword(formData.password, value);
    }

    if (fieldError) {
      setErrors((prev) => ({ ...prev, [name]: fieldError }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('');

    // Run full validation on submit
    const newErrors = {};
    const nameErr = validateFullName(formData.fullName);
    const emailErr = validateEmail(formData.email);
    const passErr = validatePassword(formData.password, true);
    const confirmPassErr = validateConfirmPassword(formData.password, formData.confirmPassword);

    if (nameErr) newErrors.fullName = nameErr;
    if (emailErr) newErrors.email = emailErr;
    if (passErr) newErrors.password = passErr;
    if (confirmPassErr) newErrors.confirmPassword = confirmPassErr;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Client-side simulation of signup
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(
        `Account successfully registered for ${formData.fullName}! (Authentication will be connected to the ASP.NET Core Identity backend in Phase 2).`
      );
    }, 600);
  };

  return (
    <div className="w-full">
      {/* Page Title & Subtitle */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Create an account
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Join ShopSphere today to explore thousands of verified vendors and exclusive marketplace
          deals.
        </p>
      </div>

      {/* Demo Success Alert */}
      {successMessage && (
        <div
          role="status"
          className="mb-6 flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-800"
        >
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
          <p className="text-xs font-medium leading-relaxed">{successMessage}</p>
        </div>
      )}

      {/* Sign Up Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Input
          label="Full name"
          id="signup-fullname"
          name="fullName"
          type="text"
          required
          autoComplete="name"
          placeholder="e.g. Sarah Jenkins"
          leftIcon={User}
          value={formData.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.fullName}
        />

        <Input
          label="Email address"
          id="signup-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="name@example.com"
          leftIcon={Mail}
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
        />

        <Input
          label="Password"
          id="signup-password"
          name="password"
          type="password"
          required
          autoComplete="new-password"
          placeholder="At least 8 characters"
          helperText="Use 8 or more characters with a mix of letters and numbers."
          leftIcon={Lock}
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
        />

        <Input
          label="Confirm password"
          id="signup-confirmpassword"
          name="confirmPassword"
          type="password"
          required
          autoComplete="new-password"
          placeholder="Re-enter your password"
          leftIcon={ShieldCheck}
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.confirmPassword}
        />

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <Spinner size="sm" className="border-t-white" />
                Creating account...
              </span>
            ) : (
              'Create Account'
            )}
          </Button>
        </div>
      </form>

      {/* Footer link to Sign In */}
      <div className="mt-8 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link
          to={APP_ROUTES.SIGNIN}
          className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline transition-colors"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
