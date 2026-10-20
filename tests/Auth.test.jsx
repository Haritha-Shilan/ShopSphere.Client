import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SignInPage } from '@/features/auth/pages/SignInPage';
import { SignUpPage } from '@/features/auth/pages/SignUpPage';
import { APP_ROUTES } from '@/constants/appRoutes';

function renderWithRouter(ui, { route = '/' } = {}) {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
}

describe('SignInPage Component', () => {
  it('renders signin form controls and link to signup', () => {
    renderWithRouter(<SignInPage />, { route: APP_ROUTES.SIGNIN });

    expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^sign in$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /forgot password\?/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /create an account/i })).toHaveAttribute(
      'href',
      APP_ROUTES.SIGNUP
    );
  });

  it('displays client-side required field errors when submitted empty', () => {
    renderWithRouter(<SignInPage />, { route: APP_ROUTES.SIGNIN });

    const submitBtn = screen.getByRole('button', { name: /^sign in$/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText('Email address is required.')).toBeInTheDocument();
    expect(screen.getByText('Password is required.')).toBeInTheDocument();
  });

  it('validates email format on blur', () => {
    renderWithRouter(<SignInPage />, { route: APP_ROUTES.SIGNIN });

    const emailInput = screen.getByLabelText(/email address/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email-address' } });
    fireEvent.blur(emailInput);

    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
  });

  it('toggles forgot password notice on click', () => {
    renderWithRouter(<SignInPage />, { route: APP_ROUTES.SIGNIN });

    const forgotBtn = screen.getByRole('button', { name: /forgot password\?/i });
    fireEvent.click(forgotBtn);

    expect(screen.getByText(/password recovery notice/i)).toBeInTheDocument();
  });
});

describe('SignUpPage Component', () => {
  it('renders all required signup form fields and link to signin', () => {
    renderWithRouter(<SignUpPage />, { route: APP_ROUTES.SIGNUP });

    expect(screen.getByRole('heading', { name: /create an account/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sign in/i })).toHaveAttribute(
      'href',
      APP_ROUTES.SIGNIN
    );
  });

  it('validates all required fields when submitted empty', () => {
    renderWithRouter(<SignUpPage />, { route: APP_ROUTES.SIGNUP });

    const submitBtn = screen.getByRole('button', { name: /create account/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText('Full name is required.')).toBeInTheDocument();
    expect(screen.getByText('Email address is required.')).toBeInTheDocument();
    expect(screen.getByText('Password is required.')).toBeInTheDocument();
    expect(screen.getByText('Please confirm your password.')).toBeInTheDocument();
  });

  it('validates minimum password length', () => {
    renderWithRouter(<SignUpPage />, { route: APP_ROUTES.SIGNUP });

    const passwordInput = screen.getByLabelText(/^password/i);
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.blur(passwordInput);

    expect(screen.getByText('Password must be at least 8 characters long.')).toBeInTheDocument();
  });

  it('validates password confirmation match', () => {
    renderWithRouter(<SignUpPage />, { route: APP_ROUTES.SIGNUP });

    const passwordInput = screen.getByLabelText(/^password/i);
    const confirmInput = screen.getByLabelText(/confirm password/i);

    fireEvent.change(passwordInput, { target: { value: 'Secret123!' } });
    fireEvent.change(confirmInput, { target: { value: 'DifferentPassword!' } });
    fireEvent.blur(confirmInput);

    expect(screen.getByText('Passwords do not match.')).toBeInTheDocument();
  });
});
