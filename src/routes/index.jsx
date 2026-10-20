import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/layouts/RootLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { APP_ROUTES } from '@/constants/appRoutes';
import { HomePage } from '@/pages/HomePage';
import { SignInPage } from '@/features/auth/pages/SignInPage';
import { SignUpPage } from '@/features/auth/pages/SignUpPage';

export const router = createBrowserRouter([
  {
    path: APP_ROUTES.HOME,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: APP_ROUTES.SIGNIN,
        element: <SignInPage />,
      },
      {
        path: APP_ROUTES.SIGNUP,
        element: <SignUpPage />,
      },
    ],
  },
]);
