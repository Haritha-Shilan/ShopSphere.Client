import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { App } from '@/app/App';

describe('ShopSphere Application Shell', () => {
  it('renders the ShopSphere homepage and header navigation without crashing', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getAllByText(/ShopSphere/i).length).toBeGreaterThan(0);
    expect(screen.getByRole('link', { name: /^sign in$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^sign up$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /shop now/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /featured products/i })).toBeInTheDocument();
  });
});
