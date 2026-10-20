import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, CheckCircle2, Info } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { APP_ROUTES } from '@/constants/appRoutes';
import { validateEmail, validatePassword } from '@/features/auth/utils/validation';

export function SignInPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [forgotPasswordNotice, setForgotPasswordNotice] = useState(false);

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

    if (name === 'email') {
      fieldError = validateEmail(value);
    } else if (name === 'password') {
      fieldError = validatePassword(value, false);
    }

    if (fieldError) {
      setErrors((prev) => ({ ...prev, [name]: fieldError }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('');

    // Validate all fields
    const newErrors = {};
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password, false);

    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Client-side simulation of sign-in
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(
        `Welcome back! Signed in as ${formData.email}. (Authentication will be connected with the ASP.NET Core Identity backend).`
      );
    }, 600);
  };

  return (
    <div className="w-full">
      {/* Page Title & Subtitle */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Enter your credentials to access your ShopSphere account.
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

      {/* Forgot Password Notice (UI-only) */}
      {forgotPasswordNotice && (
        <div
          role="status"
          className="mb-6 flex items-start gap-3 rounded-lg border border-indigo-200 bg-indigo-50 p-3.5 text-indigo-900"
        >
          <Info className="h-4 w-4 shrink-0 text-indigo-600 mt-0.5" />
          <div className="text-xs">
            <span className="font-semibold">Password recovery notice:</span> Reset links will be
            dispatched once the ASP.NET Core Identity email service is connected.
          </div>
        </div>
      )}

      {/* Sign In Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <Input
          label="Email address"
          id="signin-email"
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

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="signin-password"
              className="mb-1.5 block text-xs font-semibold tracking-wide text-gray-700"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={() => setForgotPasswordNotice((prev) => !prev)}
              className="text-xs font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          <Input
            id="signin-password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            leftIcon={Lock}
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="w-full mt-2"
        >
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <Spinner size="sm" className="border-t-white" />
              Signing in...
            </span>
          ) : (
            'Sign In'
          )}
        </Button>
      </form>

      {/* Footer link to Sign Up */}
      <div className="mt-8 text-center text-sm text-gray-600">
        Don&apos;t have an account yet?{' '}
        <Link
          to={APP_ROUTES.SIGNUP}
          className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline transition-colors"
        >
          Create an account
        </Link>
      </div>
    </div>
  );
}
