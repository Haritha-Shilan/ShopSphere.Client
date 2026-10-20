import { Outlet, Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { AuthPromoPanel } from '@/features/auth/components/AuthPromoPanel';
import { APP_ROUTES } from '@/constants/appRoutes';

export function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Promotional Split Panel (Left side on desktop) */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-5/12">
        <AuthPromoPanel />
      </div>

      {/* Main Form Container (Right side on desktop, full width on mobile) */}
      <div className="flex w-full flex-col justify-between p-6 sm:p-10 lg:w-1/2 lg:p-14 xl:w-7/12">
        {/* Top Navigation Bar in Form Area */}
        <div className="flex items-center justify-between">
          <Link
            to={APP_ROUTES.HOME}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to marketplace
          </Link>

          {/* Mobile Logo (visible on screens where left promo panel is hidden) */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-xs">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <span className="text-base font-bold text-gray-900">ShopSphere</span>
          </div>
        </div>

        {/* Central Content Outlet */}
        <div className="mx-auto my-auto w-full max-w-md py-8">
          <Outlet />
        </div>

        {/* Bottom Micro Footer */}
        <div className="text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} ShopSphere Inc. Protected by reCAPTCHA & Privacy Policy.
        </div>
      </div>
    </div>
  );
}
