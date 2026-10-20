import { Headphones, Shirt, UtensilsCrossed, Watch, Sparkles } from 'lucide-react';
import { CATEGORIES } from '@/features/products/data/mockProducts';

const categoryMeta = {
  All: {
    icon: Sparkles,
    tagline: 'Entire Catalog',
  },
  Electronics: {
    icon: Headphones,
    tagline: 'Audio, Wearables & Tech',
  },
  Fashion: {
    icon: Shirt,
    tagline: 'Apparel & Footwear',
  },
  'Home & Kitchen': {
    icon: UtensilsCrossed,
    tagline: 'Cookware & Appliances',
  },
  Accessories: {
    icon: Watch,
    tagline: 'Eyewear, Leather & Bags',
  },
};

export function CategoryFilter({ selectedCategory, onSelectCategory, productCounts = {} }) {
  return (
    <section aria-labelledby="category-heading" className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2
            id="category-heading"
            className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl"
          >
            Shop by Category
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            Explore hand-picked items from top-rated sellers across core departments
          </p>
        </div>
      </div>

      {/* Grid of Category Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          const meta = categoryMeta[cat] || { icon: Sparkles, tagline: '' };
          const Icon = meta.icon;
          const count = productCounts[cat];

          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`group flex cursor-pointer flex-col items-center justify-center rounded-2xl border p-4 text-center transition-all duration-200 ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/70 shadow-sm ring-2 ring-indigo-600/20'
                  : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-gray-50/50 hover:shadow-xs'
              }`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
                  isSelected
                    ? 'bg-indigo-600 text-white'
                    : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100'
                }`}
              >
                <Icon className="h-6 w-6" />
              </div>

              <span
                className={`mt-3 text-sm font-semibold transition-colors ${
                  isSelected ? 'text-indigo-900' : 'text-gray-900 group-hover:text-indigo-600'
                }`}
              >
                {cat}
              </span>

              <span className="mt-0.5 text-[11px] text-gray-400">
                {count !== undefined ? `${count} items` : meta.tagline}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
