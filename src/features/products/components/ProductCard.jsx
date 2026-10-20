import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { formatINR } from '@/utils/currency';
import { addToCart } from '@/features/cart/slices/cartSlice';

export function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Retrieve current quantity in cart if any
  const cartItem = useSelector((state) => state.cart?.items?.find((i) => i.id === product.id));
  const currentQuantityInCart = cartItem ? cartItem.quantity : 0;

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1200);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      {/* Product Image Area */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={() => setImageError(true)}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-xs text-gray-400">
            {product.name}
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          {product.badge && (
            <span className="rounded-md bg-indigo-600 px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase text-white shadow-xs">
              {product.badge}
            </span>
          )}
          {discountPercent && (
            <span className="rounded-md bg-emerald-600 px-2 py-0.5 text-[10px] font-semibold text-white shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Category & In-Cart Pill */}
        <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5">
          {currentQuantityInCart > 0 && (
            <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
              {currentQuantityInCart} in cart
            </span>
          )}
          <span className="rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-medium text-gray-700 shadow-xs backdrop-blur-xs">
            {product.category}
          </span>
        </div>
      </div>

      {/* Product Details Area */}
      <div className="flex flex-1 flex-col p-4">
        {/* Rating Row */}
        <div className="flex items-center gap-1.5 text-xs">
          <div className="inline-flex items-center gap-0.5 rounded-md bg-amber-50 px-1.5 py-0.5 font-semibold text-amber-700 ring-1 ring-amber-200">
            <span>{product.rating}</span>
            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
          </div>
          <span className="text-gray-400">({product.ratingCount})</span>
        </div>

        {/* Title */}
        <h3
          title={product.name}
          className="mt-2 line-clamp-2 text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors"
        >
          {product.name}
        </h3>

        {/* Description snippet */}
        <p className="mt-1 line-clamp-1 text-xs text-gray-500">{product.description}</p>

        {/* Spacer to align buttons at bottom */}
        <div className="mt-auto pt-4">
          {/* Price Row */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">{formatINR(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
            className={`mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-2 px-3 text-xs font-semibold transition-all duration-200 ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="h-4 w-4" />
                <span>
                  {currentQuantityInCart > 0
                    ? `Added (Qty: ${currentQuantityInCart})`
                    : 'Added to Cart'}
                </span>
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                <span>
                  {currentQuantityInCart > 0
                    ? `Add Again (${currentQuantityInCart} in cart)`
                    : 'Add to Cart'}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
