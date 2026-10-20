import { ShoppingBag, ShieldCheck, Truck, Star, Sparkles, Store } from 'lucide-react';

const highlights = [
  {
    icon: Store,
    title: '10,000+ Verified Vendors',
    description: 'Shop directly from top brands, certified wholesalers, and independent creators.',
  },
  {
    icon: ShieldCheck,
    title: 'Buyer Protection Guarantee',
    description: 'Every transaction is backed by secure escrow and hassle-free refund resolution.',
  },
  {
    icon: Truck,
    title: 'Fast & Tracked Shipping',
    description:
      'Real-time multi-carrier tracking from the seller warehouse straight to your doorstep.',
  },
];

export function AuthPromoPanel() {
  return (
    <div className="relative hidden w-full overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-900 to-purple-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
      {/* Decorative background glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

      {/* Top Brand Header */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20 backdrop-blur-md">
          <ShoppingBag className="h-6 w-6 text-white" />
        </div>
        <div>
          <span className="text-2xl font-bold tracking-tight text-white">ShopSphere</span>
          <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-indigo-200 ring-1 ring-white/15">
            <Sparkles className="h-3 w-3" /> Marketplace
          </span>
        </div>
      </div>

      {/* Middle Content */}
      <div className="relative z-10 my-auto py-8">
        <div className="max-w-md">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Everything you love, from merchants you trust.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-indigo-200">
            Join millions of buyers and sellers thriving on the modern multi-vendor commerce
            platform. Fast, secure, and built for growth.
          </p>

          <div className="mt-8 space-y-4">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-start gap-3.5 rounded-xl bg-white/5 p-3.5 ring-1 ring-white/10 backdrop-blur-xs transition hover:bg-white/10"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                    <p className="mt-0.5 text-xs text-indigo-200/80 leading-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Trust & Testimonial Footer */}
      <div className="relative z-10 rounded-xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur-xs">
        <div className="flex items-center gap-1 text-amber-300">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-amber-300 text-amber-300" />
          ))}
          <span className="ml-2 text-xs font-semibold text-white">4.9 / 5.0</span>
        </div>
        <p className="mt-1 text-xs text-indigo-200">
          Trusted by over 50,000+ customers and 10,000+ merchants worldwide.
        </p>
      </div>
    </div>
  );
}
