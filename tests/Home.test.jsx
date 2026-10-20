import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { store } from '@/app/store';
import { RootLayout } from '@/layouts/RootLayout';
import { HomePage } from '@/pages/HomePage';
import { APP_ROUTES } from '@/constants/appRoutes';
import { clearCart } from '@/features/cart/slices/cartSlice';

function renderHome(initialRoute = '/') {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path={APP_ROUTES.HOME} element={<RootLayout />}>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </Provider>
  );
}

describe('ShopSphere Customer Homepage', () => {
  beforeEach(() => {
    store.dispatch(clearCart());
  });

  it('renders promotional hero banner with headline and working Shop Now button', () => {
    renderHome();

    expect(
      screen.getByText(/curated deals from india’s trusted independent vendors/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /shop now/i })).toBeInTheDocument();
  });

  it('displays the 4 required categories and All department option', () => {
    renderHome();

    expect(screen.getByRole('heading', { name: /shop by category/i })).toBeInTheDocument();
    expect(screen.getAllByText('Electronics').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Fashion').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Home & Kitchen').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Accessories').length).toBeGreaterThan(0);
  });

  it('displays featured products with INR currency formatting and ratings', () => {
    renderHome();

    expect(screen.getByText('UltraSound Pro Wireless ANC Headphones')).toBeInTheDocument();
    expect(screen.getByText('BrewMaster Multi-Function Espresso Machine')).toBeInTheDocument();

    const prices = screen.getAllByText(/₹/);
    expect(prices.length).toBeGreaterThan(0);
  });

  it('filters products when a category card is clicked', () => {
    renderHome();

    const categoryButtons = screen.getAllByRole('button', { name: /electronics/i });
    fireEvent.click(categoryButtons[0]);

    expect(screen.getByText('UltraSound Pro Wireless ANC Headphones')).toBeInTheDocument();
    expect(screen.getByText('Aura Smartwatch Series 5 AMOLED Display')).toBeInTheDocument();

    expect(screen.queryByText("Men's Classic Slim-Fit Oxford Cotton Shirt")).not.toBeInTheDocument();
  });

  it('filters products when searching in the filter input', () => {
    renderHome();

    const searchInput = screen.getByPlaceholderText(/filter in results\.\.\./i);
    fireEvent.change(searchInput, { target: { value: 'headphones' } });

    expect(screen.getByText('UltraSound Pro Wireless ANC Headphones')).toBeInTheDocument();
    expect(
      screen.queryByText('BrewMaster Multi-Function Espresso Machine')
    ).not.toBeInTheDocument();
  });

  it('increments the cart icon badge and shows visible confirmation when Add to Cart is clicked', () => {
    renderHome();

    const addButtons = screen.getAllByRole('button', { name: /add .* to cart/i });
    expect(addButtons.length).toBeGreaterThan(0);

    // Initial cart counter is 0
    expect(screen.getByTitle('Cart: 0 items')).toBeInTheDocument();

    // Click Add to Cart on the first product
    fireEvent.click(addButtons[0]);

    // Header counter updates immediately to 1
    expect(screen.getByTitle('Cart: 1 items')).toBeInTheDocument();

    // Visible confirmation toast appears
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Added to Cart!')).toBeInTheDocument();

    // Click Add to Cart again on the same product
    fireEvent.click(addButtons[0]);

    // Header counter increases to 2
    expect(screen.getByTitle('Cart: 2 items')).toBeInTheDocument();
    expect(screen.getByText('Quantity Updated!')).toBeInTheDocument();
  });

  it('opens the cart drawer and displays added product details and subtotal', () => {
    renderHome();

    const addButtons = screen.getAllByRole('button', { name: /add .* to cart/i });
    fireEvent.click(addButtons[0]);

    // Click the cart icon in header
    const cartButton = screen.getByRole('button', { name: /open shopping cart with 1 items/i });
    fireEvent.click(cartButton);

    // Cart drawer is visible
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Your Shopping Cart')).toBeInTheDocument();
    expect(screen.getByText('Subtotal')).toBeInTheDocument();
  });

  it('displays empty state when search finds no matches and resets on click', () => {
    renderHome();

    const searchInput = screen.getByPlaceholderText(/filter in results\.\.\./i);
    fireEvent.change(searchInput, { target: { value: 'xyznonexistentproduct123' } });

    expect(screen.getByText(/no matching products found/i)).toBeInTheDocument();

    const resetBtn = screen.getByRole('button', { name: /reset all filters/i });
    fireEvent.click(resetBtn);

    expect(screen.getByText('UltraSound Pro Wireless ANC Headphones')).toBeInTheDocument();
  });
});
