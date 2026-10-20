import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  ShoppingBag,
  ShoppingCart,
  Search,
  X,
  Sparkles,
  ShieldCheck,
  Truck,
  HelpCircle,
  Store,
  CheckCircle2,
  Plus,
  Minus,
  Trash2,
} from 'lucide-react';
import { APP_ROUTES } from '@/constants/appRoutes';
import { formatINR } from '@/utils/currency';
import {
  selectCartCount,
  selectCartItems,
  selectCartNotification,
  selectCartSubtotal,
  updateQuantity,
  removeFromCart,
  clearCart,
  dismissNotification,
} from '@/features/cart/slices/cartSlice';

const HEADER_CATEGORIES = ['All', 'Electronics', 'Fashion', 'Home & Kitchen', 'Accessories'];

export function RootLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const cartCount = useSelector(selectCartCount);
  const cartItems = useSelector(selectCartItems);
  const cartSubtotal = useSelector(selectCartSubtotal);
  const cartNotification = useSelector(selectCartNotification);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const initialQuery = searchParams.get('q') || '';
  const currentCategory = searchParams.get('category') || 'All';
  const [query, setQuery] = useState(initialQuery);

  // Auto-dismiss confirmation toast after 3.5 seconds
  useEffect(() => {
    if (cartNotification) {
      const timer = setTimeout(() => {
        dispatch(dismissNotification());
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [cartNotification, dispatch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (query.trim()) {
      params.set('q', query.trim());
    } else {
      params.delete('q');
    }
    navigate(`/?${params.toString()}`);
  };

  const handleCategoryClick = (category) => {
    const params = new URLSearchParams(searchParams);
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    navigate(`/?${params.toString()}`);
  };

  const handleClearSearch = () => {
    setQuery('');
    const params = new URLSearchParams(searchParams);
    params.delete('q');
    navigate(`/?${params.toString()}`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
      {/* 1. Top Announcement Bar */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 px-4 py-2 text-center text-xs font-medium text-white shadow-xs">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-amber-300" />
          <span>
            Mega Marketplace Festival Live &bull; Free Shipping on orders over ₹999 &bull; 100%
            Genuine Vendors
          </span>
        </span>
      </div>

      {/* 2. Main Storefront Header */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo & Brand */}
          <Link
            to={APP_ROUTES.HOME}
            className="flex items-center gap-2.5 shrink-0 transition-opacity hover:opacity-90"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-xs">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-gray-900">
                Shop<span className="text-indigo-600">Sphere</span>
              </span>
              <span className="block text-[9px] font-bold uppercase tracking-wider text-gray-400 -mt-1">
                Multi-Vendor
              </span>
            </div>
          </Link>

          {/* Search Bar (Amazon / Flipkart inspired center search) */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative hidden flex-1 max-w-2xl md:flex items-center"
          >
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, verified vendors, electronics, fashion..."
                className="w-full rounded-xl border border-gray-300 bg-gray-50/60 py-2.5 pl-10 pr-10 text-xs text-gray-900 placeholder:text-gray-400 transition-colors focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
              {query && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  aria-label="Clear search query"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <button
              type="submit"
              className="ml-2 inline-flex cursor-pointer items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700 shadow-xs transition-colors shrink-0"
            >
              Search
            </button>
          </form>

          {/* Right Navigation & Cart */}
          <nav className="flex items-center gap-3 sm:gap-4 shrink-0">
            <Link
              to={APP_ROUTES.SIGNIN}
              className="text-xs font-semibold text-gray-700 hover:text-indigo-600 transition-colors px-2 py-1.5"
            >
              Sign In
            </Link>

            <Link
              to={APP_ROUTES.SIGNUP}
              className="rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 transition-colors"
            >
              Sign Up
            </Link>

            {/* Cart Button with Live Counter Badge & Clickable Drawer Trigger */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Open shopping cart with ${cartCount} items`}
              title={`Cart: ${cartCount} items`}
              className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-700 hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-600 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 ? (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white shadow-xs">
                  {cartCount}
                </span>
              ) : (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gray-300 text-[9px] font-semibold text-gray-700">
                  0
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* 3. Category Navigation Sub-Header */}
        <div className="border-t border-gray-100 bg-white">
          <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8 no-scrollbar">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mr-2 shrink-0">
              Departments:
            </span>
            {HEADER_CATEGORIES.map((cat) => {
              const isActive = currentCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryClick(cat)}
                  className={`rounded-lg px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {cat === 'All' ? 'All Departments' : cat}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Outlet */}
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      {/* 4. Simple E-Commerce Footer */}
      <footer className="border-t border-gray-200 bg-white text-gray-600">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand column */}
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                  <ShoppingBag className="h-4 w-4" />
                </div>
                <span className="text-lg font-bold text-gray-900">ShopSphere</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-gray-500">
                India&apos;s modern multi-vendor commerce marketplace connecting thousands of
                independent creators, certified wholesalers, and everyday shoppers.
              </p>
              <div className="mt-4 flex items-center gap-3 text-xs text-gray-500">
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                  <ShieldCheck className="h-4 w-4" /> 100% Buyer Protection
                </span>
              </div>
            </div>

            {/* Popular Categories */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                Top Categories
              </h4>
              <ul className="mt-3 space-y-2 text-xs">
                {HEADER_CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                  <li key={cat}>
                    <button
                      type="button"
                      onClick={() => handleCategoryClick(cat)}
                      className="text-gray-500 hover:text-indigo-600 transition-colors cursor-pointer"
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust & Safety */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                Trust &amp; Guarantees
              </h4>
              <ul className="mt-3 space-y-2 text-xs text-gray-500">
                <li className="flex items-center gap-1.5">
                  <Truck className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                  <span>Express multi-carrier delivery</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                  <span>Secure escrow transactions</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Store className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                  <span>Verified seller credential checks</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <HelpCircle className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                  <span>24/7 Dispute resolution center</span>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                Account &amp; Access
              </h4>
              <ul className="mt-3 space-y-2 text-xs">
                <li>
                  <Link
                    to={APP_ROUTES.SIGNIN}
                    className="text-gray-500 hover:text-indigo-600 transition-colors"
                  >
                    Customer &amp; Seller Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    to={APP_ROUTES.SIGNUP}
                    className="text-gray-500 hover:text-indigo-600 transition-colors"
                  >
                    Create New Account
                  </Link>
                </li>
                <li>
                  <a
                    href="#featured-products"
                    className="text-gray-500 hover:text-indigo-600 transition-colors"
                  >
                    Today&apos;s Featured Deals
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-100 pt-6 text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} ShopSphere Inc. All rights reserved. Multi-Vendor
            Marketplace Platform.
          </div>
        </div>
      </footer>

      {/* 5. Floating Add-to-Cart Confirmation Toast */}
      {cartNotification && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 flex max-w-sm items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl ring-1 ring-black/5"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-900 truncate">
              {cartNotification.isNew ? 'Added to Cart!' : 'Quantity Updated!'}
            </p>
            <p className="text-[11px] text-gray-500 truncate">
              {cartNotification.productName} (Qty: {cartNotification.quantity})
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsCartOpen(true);
              dispatch(dismissNotification());
            }}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer"
          >
            View Cart
          </button>
          <button
            type="button"
            onClick={() => dispatch(dismissNotification())}
            aria-label="Close notification"
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </aside>
      )}

      {/* 6. Interactive Slide-Over Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
          {/* Backdrop overlay */}
          <div
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-base font-bold text-gray-900">Your Shopping Cart</h2>
                  <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700">
                    {cartCount} items
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  aria-label="Close cart drawer"
                  className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Drawer Body: Cart Items List */}
              <div className="flex-1 overflow-y-auto p-6">
                {cartItems.length > 0 ? (
                  <ul className="divide-y divide-gray-100">
                    {cartItems.map((item) => (
                      <li key={item.id} className="flex gap-4 py-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 rounded-xl object-cover border border-gray-100 bg-gray-50 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-gray-900 line-clamp-1">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-gray-400 mt-0.5">{item.category}</p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-xs font-bold text-gray-900">
                              {formatINR(item.price * item.quantity)}
                            </span>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-1.5 rounded-lg border border-gray-200 p-0.5">
                              <button
                                type="button"
                                onClick={() =>
                                  dispatch(
                                    updateQuantity({
                                      id: item.id,
                                      quantity: item.quantity - 1,
                                    })
                                  )
                                }
                                aria-label={`Decrease quantity of ${item.name}`}
                                className="flex h-5 w-5 items-center justify-center rounded text-gray-500 hover:bg-gray-100 cursor-pointer"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-5 text-center text-xs font-semibold text-gray-800">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  dispatch(
                                    updateQuantity({
                                      id: item.id,
                                      quantity: item.quantity + 1,
                                    })
                                  )
                                }
                                aria-label={`Increase quantity of ${item.name}`}
                                className="flex h-5 w-5 items-center justify-center rounded text-gray-500 hover:bg-gray-100 cursor-pointer"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            {/* Remove Item */}
                            <button
                              type="button"
                              onClick={() => dispatch(removeFromCart(item.id))}
                              aria-label={`Remove ${item.name} from cart`}
                              className="text-gray-400 hover:text-red-500 cursor-pointer p-1"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                      <ShoppingBag className="h-7 w-7" />
                    </div>
                    <h3 className="mt-4 text-sm font-semibold text-gray-900">
                      Your cart is currently empty
                    </h3>
                    <p className="mt-1 text-xs text-gray-500 max-w-xs">
                      Explore our featured marketplace deals and add your favorite items to your
                      cart.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsCartOpen(false)}
                      className="mt-6 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 cursor-pointer"
                    >
                      Browse Marketplace
                    </button>
                  </div>
                )}
              </div>

              {/* Drawer Footer: Subtotal and Actions */}
              {cartItems.length > 0 && (
                <div className="border-t border-gray-200 bg-gray-50/50 p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Shipping</span>
                    <span className="font-semibold text-emerald-600">
                      {cartSubtotal >= 999 ? 'FREE' : formatINR(99)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-bold text-gray-900">
                    <span>Subtotal</span>
                    <span>{formatINR(cartSubtotal)}</span>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    Taxes calculated at checkout. Backed by ShopSphere Buyer Protection.
                  </p>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => dispatch(clearCart())}
                      className="flex-1 rounded-xl border border-gray-300 py-2.5 text-xs font-semibold text-gray-700 hover:bg-white cursor-pointer transition-colors"
                    >
                      Clear Cart
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        alert(
                          'Checkout will be integrated with the ASP.NET Core backend in Phase 2.'
                        )
                      }
                      className="flex-2 rounded-xl bg-indigo-600 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 cursor-pointer transition-colors"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
