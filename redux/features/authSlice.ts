import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { User } from '../api/authApi';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isVerificationRequested: boolean;
  wishlistMap: Record<string, string>; // Maps content_slug to wishlist_uid
}

const getInitialState = (): AuthState => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      try {
        return {
          token,
          user: JSON.parse(user),
          isAuthenticated: true,
          isVerificationRequested: localStorage.getItem('isVerificationRequested') === 'true',
          wishlistMap: {},
        };
      } catch (error) {
        console.error('Failed to parse user from local storage', error);
      }
    }
  }
  return {
    user: null,
    token: null,
    isAuthenticated: false,
    isVerificationRequested: false,
    wishlistMap: {},
  };
};

const initialState: AuthState = getInitialState();

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        access: string;
        refresh: string;
        uid: string;
        message: string;
        role?: string | { title: string; [key: string]: any };
        [key: string]: any;
      }>
    ) => {
      const { access, ...userData } = action.payload;
      state.token = access;
      state.user = userData as any;
      state.isAuthenticated = true;

      if (typeof window !== 'undefined') {
        localStorage.setItem('token', access);
        localStorage.setItem('user', JSON.stringify(userData));
      }
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(action.payload));
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    },
    rehydrateAuth: (state, action: PayloadAction<{ token: string; user: any }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    setWishlist: (state, action: PayloadAction<Record<string, string>>) => {
      state.wishlistMap = action.payload;
    },
    addWishlistItem: (state, action: PayloadAction<{ slug: string; uid: string }>) => {
      state.wishlistMap[action.payload.slug] = action.payload.uid;
    },
    removeWishlistItem: (state, action: PayloadAction<string>) => {
      delete state.wishlistMap[action.payload];
    },
    setVerificationRequested: (state, action: PayloadAction<boolean>) => {
      state.isVerificationRequested = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('isVerificationRequested', action.payload.toString());
      }
    },
  },
});

export const {
  setCredentials,
  setUser,
  logout,
  rehydrateAuth,
  setWishlist,
  addWishlistItem,
  removeWishlistItem,
  setVerificationRequested,
} = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectIsVerificationRequested = (state: RootState) => state.auth.isVerificationRequested;

export default authSlice.reducer;
