import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      // Set user and token
      setAuth: (user, token) => {
        set({
          user,
          token,
          isAuthenticated: true,
          error: null,
        });
        // Store token in localStorage for API requests
        if (token) {
          localStorage.setItem('token', token);
        }
      },

      // Login action
      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Login failed');
          }

          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            loading: false,
            error: null,
          });

          if (data.token) {
            localStorage.setItem('token', data.token);
          }

          return { success: true };
        } catch (error) {
          set({
            loading: false,
            error: error.message,
            isAuthenticated: false,
          });
          return { success: false, error: error.message };
        }
      },

      // Register action
      register: async (name, email, password) => {
        set({ loading: true, error: null });
        try {
          const response = await fetch(
            'http://localhost:5000/api/auth/register',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name, email, password }),
            }
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
          }

          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            loading: false,
            error: null,
          });

          if (data.token) {
            localStorage.setItem('token', data.token);
          }

          return { success: true };
        } catch (error) {
          set({
            loading: false,
            error: error.message,
            isAuthenticated: false,
          });
          return { success: false, error: error.message };
        }
      },

      // Get current user
      getMe: async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
        }

        set({ loading: true });
        try {
          const response = await fetch('http://localhost:5000/api/auth/me', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Failed to get user');
          }

          set({
            user: data.user,
            isAuthenticated: true,
            loading: false,
            error: null,
          });
        } catch (error) {
          set({
            loading: false,
            error: error.message,
            isAuthenticated: false,
            user: null,
            token: null,
          });
          localStorage.removeItem('token');
        }
      },

      // Logout action
      logout: async () => {
        const token = localStorage.getItem('token');

        try {
          if (token) {
            await fetch('http://localhost:5000/api/auth/logout', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });
          }
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: null,
          });
          localStorage.removeItem('token');
        }
      },

      // Clear error
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage', // name of the item in localStorage
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
