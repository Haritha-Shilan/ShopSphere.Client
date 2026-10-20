import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, RotateCcw, PackageSearch } from 'lucide-react';
import { HeroBanner } from '@/features/home/components/HeroBanner';
import { CategoryFilter } from '@/features/products/components/CategoryFilter';
import { ProductCard } from '@/features/products/components/ProductCard';
import { MOCK_PRODUCTS } from '@/features/products/data/mockProducts';

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('q') || '';
  const selectedCategory = searchParams.get('category') || 'All';

  // Handle category change
  const handleSelectCategory = (category) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (category === 'All') {
        next.delete('category');
      } else {
        next.set('category', category);
      }
      return next;
    });
  };

  // Handle search input change directly in page
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value.trim()) {
        next.set('q', value);
      } else {
        next.delete('q');
      }
      return next;
    });
  };

  const handleResetFilters = () => {
    setSearchParams({});
  };

  // Filter products by category and search keyword
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Compute product count per category
  const productCounts = useMemo(() => {
    const counts = { All: MOCK_PRODUCTS.length };
    MOCK_PRODUCTS.forEach((prod) => {
      counts[prod.category] = (counts[prod.category] || 0) + 1;
    });
    return counts;
  }, []);

  const hasActiveFilters = Boolean(searchQuery || (selectedCategory && selectedCategory !== 'All'));

  return (
    <div className="space-y-12">
      {/* 1. Promotional Hero Banner */}
      <HeroBanner />

      {/* 2. Category Navigation Section */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        productCounts={productCounts}
      />

      {/* 3. Featured Products Header & Filter Bar */}
      <section id="featured-products" className="scroll-mt-24 space-y-6">
        <div className="flex flex-col gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                Featured Products
              </h2>
              <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-200">
                {filteredProducts.length} items
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Handcrafted, certified, and trending items from verified multi-vendor storefronts
            </p>
          </div>

          {/* Search & Quick Filter Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[220px] max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Filter in results..."
                className="w-full rounded-xl border border-gray-300 bg-white py-2 pl-9 pr-3 text-xs text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Active Filter Indicators */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
            <span className="inline-flex items-center gap-1 font-medium text-gray-500">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Active filters:
            </span>
            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-0.5 font-medium text-indigo-700">
                Category: {selectedCategory}
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 rounded-md bg-purple-50 px-2 py-0.5 font-medium text-purple-700">
                Search: &ldquo;{searchQuery}&rdquo;
              </span>
            )}
          </div>
        )}

        {/* 4. Products Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white py-16 px-6 text-center shadow-xs">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <PackageSearch className="h-7 w-7" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-gray-900">
              No matching products found
            </h3>
            <p className="mt-1.5 max-w-md text-xs text-gray-500 leading-relaxed">
              We couldn&apos;t find any items matching {searchQuery ? `"${searchQuery}"` : ''} in{' '}
              {selectedCategory}. Try checking for spelling errors or selecting another department.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 shadow-xs transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset all filters</span>
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
