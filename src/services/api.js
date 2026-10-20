import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

/**
 * Root RTK Query baseApi service.
 * Feature endpoints (auth, products, orders) will inject into this baseApi in Phase 2.
 */
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  tagTypes: [],
  endpoints: () => ({}),
});
