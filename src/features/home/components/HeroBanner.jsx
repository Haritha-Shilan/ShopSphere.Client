import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function HeroBanner() {
  const handleShopNow = (e) => {
    e.preventDefault();
    const target = document.getElementById('featured-products');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-950 text-white shadow-lg">
      {/* Background Glows */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="relative z-10 px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7">
            {/* Promo Pill */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-medium text-indigo-200 ring-1 ring-white/15 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>Mega Marketplace Festival &bull; Up to 50% Off</span>
            </div>

            {/* Headline */}
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl sm:leading-tight">
              Curated deals from India’s trusted independent vendors.
            </h1>

            {/* Short Description */}
            <p className="mt-4 text-sm leading-relaxed text-indigo-100 sm:text-base sm:max-w-xl">
              Shop directly from certified brands, artisan creators, and wholesalers. Enjoy
              guaranteed authentic products, transparent pricing in INR, and fast multi-carrier
              shipping.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#featured-products" onClick={handleShopNow}>
                <Button
                  size="lg"
                  className="bg-white text-indigo-900 hover:bg-indigo-50 shadow-md font-semibold cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    Shop Now
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Button>
              </a>

              <a
                href="#category-heading"
                className="text-xs font-semibold text-indigo-200 hover:text-white transition-colors"
              >
                Browse All Categories &darr;
              </a>
            </div>

            {/* Value Proposition Highlights */}
            <div className="mt-10 grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2 text-xs text-indigo-100">
                <Truck className="h-4 w-4 text-indigo-300 shrink-0" />
                <span>Fast Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-indigo-100">
                <ShieldCheck className="h-4 w-4 text-indigo-300 shrink-0" />
                <span>Buyer Protection</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-indigo-100">
                <RefreshCw className="h-4 w-4 text-indigo-300 shrink-0" />
                <span>Easy 7-Day Returns</span>
              </div>
            </div>
          </div>

          {/* Right Visual Card Column */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="relative mx-auto max-w-sm rounded-2xl bg-white/10 p-6 ring-1 ring-white/15 backdrop-blur-md shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-200">
                  Featured Spotlight
                </span>
                <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                  Limited Time
                </span>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                  <div className="text-left">
                    <p className="text-xs font-semibold text-white">Audio &amp; Wearables</p>
                    <p className="text-[11px] text-indigo-200">Noise-cancelling headphones</p>
                  </div>
                  <span className="text-xs font-bold text-amber-300">Up to 40% Off</span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                  <div className="text-left">
                    <p className="text-xs font-semibold text-white">Fashion &amp; Footwear</p>
                    <p className="text-[11px] text-indigo-200">Oxford shirts &amp; knit sneakers</p>
                  </div>
                  <span className="text-xs font-bold text-amber-300">Flat 45% Off</span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                  <div className="text-left">
                    <p className="text-xs font-semibold text-white">Home &amp; Kitchen</p>
                    <p className="text-[11px] text-indigo-200">Espresso &amp; cookware</p>
                  </div>
                  <span className="text-xs font-bold text-amber-300">Save ₹4,500</span>
                </div>
              </div>

              <div className="mt-4 pt-3 text-center border-t border-white/10 text-xs text-indigo-200">
                100% Genuine &bull; Verified Indian Sellers
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
