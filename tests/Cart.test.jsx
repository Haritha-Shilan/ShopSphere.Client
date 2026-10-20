import { describe, it, expect } from 'vitest';
import cartReducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  selectCartCount,
  selectCartItems,
  selectCartSubtotal,
} from '@/features/cart/slices/cartSlice';

const sampleProduct1 = {
  id: 'prod-1',
  name: 'UltraSound Pro Wireless ANC Headphones',
  category: 'Electronics',
  price: 4999,
};

const sampleProduct2 = {
  id: 'prod-2',
  name: 'Aura Smartwatch Series 5',
  category: 'Electronics',
  price: 3499,
};

describe('Cart Redux Slice', () => {
  it('returns initial state with empty items and 0 count', () => {
    const state = cartReducer(undefined, { type: '@@INIT' });
    expect(state.items).toEqual([]);
    expect(state.totalCount).toBe(0);
    expect(state.notification).toBeNull();
  });

  it('adds a new product with quantity 1 and updates totalCount', () => {
    let state = cartReducer(undefined, { type: '@@INIT' });
    state = cartReducer(state, addToCart(sampleProduct1));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe('prod-1');
    expect(state.items[0].quantity).toBe(1);
    expect(state.totalCount).toBe(1);
    expect(state.notification).not.toBeNull();
    expect(state.notification.quantity).toBe(1);
  });

  it('increases quantity for the same product without creating duplicate entries', () => {
    let state = cartReducer(undefined, { type: '@@INIT' });
    state = cartReducer(state, addToCart(sampleProduct1));
    state = cartReducer(state, addToCart(sampleProduct1)); // Add same product again

    expect(state.items).toHaveLength(1); // Still exactly 1 unique item
    expect(state.items[0].id).toBe('prod-1');
    expect(state.items[0].quantity).toBe(2); // Quantity incremented to 2
    expect(state.totalCount).toBe(2);
    expect(state.notification.quantity).toBe(2);
    expect(state.notification.isNew).toBe(false);
  });

  it('adds distinct products as separate items and sums totalCount', () => {
    let state = cartReducer(undefined, { type: '@@INIT' });
    state = cartReducer(state, addToCart(sampleProduct1)); // qty: 1
    state = cartReducer(state, addToCart(sampleProduct1)); // qty: 2
    state = cartReducer(state, addToCart(sampleProduct2)); // qty: 1

    expect(state.items).toHaveLength(2);
    expect(state.totalCount).toBe(3);

    const rootState = { cart: state };
    expect(selectCartCount(rootState)).toBe(3);
    expect(selectCartItems(rootState)).toHaveLength(2);
    expect(selectCartSubtotal(rootState)).toBe(4999 * 2 + 3499 * 1);
  });

  it('updates quantity and recalculates totalCount', () => {
    let state = cartReducer(undefined, { type: '@@INIT' });
    state = cartReducer(state, addToCart(sampleProduct1));
    state = cartReducer(state, updateQuantity({ id: 'prod-1', quantity: 5 }));

    expect(state.items[0].quantity).toBe(5);
    expect(state.totalCount).toBe(5);
  });

  it('removes product from cart and resets totalCount', () => {
    let state = cartReducer(undefined, { type: '@@INIT' });
    state = cartReducer(state, addToCart(sampleProduct1));
    state = cartReducer(state, removeFromCart('prod-1'));

    expect(state.items).toHaveLength(0);
    expect(state.totalCount).toBe(0);
  });

  it('clears all items from cart', () => {
    let state = cartReducer(undefined, { type: '@@INIT' });
    state = cartReducer(state, addToCart(sampleProduct1));
    state = cartReducer(state, addToCart(sampleProduct2));
    state = cartReducer(state, clearCart());

    expect(state.items).toHaveLength(0);
    expect(state.totalCount).toBe(0);
  });
});
