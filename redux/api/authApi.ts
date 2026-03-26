/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDeviceInfo } from '@/lib/device-info';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { Coach, GlobalResponse, Option, Product } from './globalApi'; // Importing from globalApi

// Helper interfaces for CartItem nested objects which use 'uid' instead of 'slug'
export interface CartOption {
  uid: string;
  title: string;
  created_at?: string;
  updated_at?: string;
}

export interface CartColour extends CartOption {
  code?: string;
}

export interface CartItem {
  uid: string;
  product: Product;
  product_count: number;
  size: CartOption;
  colour: CartColour;
  style: CartOption;
  tax_total: string;
  discount_total: string;
  created_at: string;
  updated_at: string;
}

export interface AddToCartRequest {
  product_uid: string;
  product_count: number;
  size_uid?: string;
  colour_uid?: string;
  style_uid?: string;
}

export interface UpdateCartItemRequest {
  product_count: number;
}

export interface Address {
  uid: string;
  address: string;
  street: string;
  apartment?: string;
  city?: string;
  country?: string;
  postal_code?: string;
  is_default?: boolean;
  label?: string;
}

export interface CreateAddressRequest {
  address: string;
  street: string;
  apartment?: string;
  city?: string;
  country?: string;
  postal_code?: string;
  label?: string;
}

export interface AddressDetails {
  uid: string;
  address: string;
  street: string;
  apartment?: string;
  city?: string;
  country?: string;
  postal_code?: string;
  label?: string;
}

export interface OrderItem {
  uid: string;
  status: string;
  title: string;
  description: string;
  quantity: number;
  price: string;
  product: Product;
  size: Option;
  colour: Option;
  style: Option;
  created_at: string;
  updated_at: string;
}

export interface Order {
  uid: string;
  status: string;
  title: string;
  description: string;
  sub_total: string;
  total_amount: string;
  discount_amount: string;
  tax_amount: string;
  delivery_fee: string;
  delivery_status: string;
  address: string | AddressDetails;
  address_details?: AddressDetails;
  order_items: OrderItem[];
  payment_intent_id: string;
  created_at: string;
  updated_at: string;
  user?: any;
  refund_info?: string;
  total_price?: string;
  product_count?: number;
}

export interface CreateOrderRequest {
  sub_total: string;
  total_amount: string;
  discount_amount: string;
  tax_amount: string;
  delivery_fee: string;
  address: string;
  products: { product_uid: string }[];
}

export interface UpdateOrderRequest {
  sub_total: string;
  total_amount: string;
  discount_amount: string;
  tax_amount: string;
  delivery_fee: string;
  delivery_status: string;
  payment_intent_id: string;
}

export interface CancelOrderRequest {
  cancel_reason: string;
  item_issue_reason?: string;
  additional_message?: string;
}

export interface CreateOrderItemRequest {
  title: string;
  description: string;
  price: string;
  product_uid: string;
  size_uid: string;
  colour_uid: string;
  style_uid: string;
}

export interface TrackingEvent {
  uid: string;
  event_type:
    | 'DEPARTED_FROM_MANUFACTURING'
    | 'WAITING_AT_SORTING_LINE'
    | 'WAITING_FOR_DELIVERY'
    | 'DELIVERED'
    | 'CANCELED';
  event_type_occurred_at: string | null;
  location: string | null;
  address: string | null;
  created_at: string;
  updated_at: string;
}

export interface TrackingResponse {
  uid: string;
  order_uid: string;
  order_id: string;
  status: 'ON_GOING' | 'COMPLETED' | 'CANCELED';
  from_country: string | null;
  from_city: string | null;
  from_address: string | null;
  sender_name: string | null;
  receiver_name: string;
  receiver_address: {
    address: string;
    street: string;
    apartment?: string | null;
    country?: string; // Adding optional country as it's used in UI map
  };
  estimated_delivery_date: string | null;
  tracking_events: TrackingEvent[];
  created_at: string;
  updated_at: string;
}

export interface UpdateOrderItemRequest {
  title: string;
  description: string;
  product_uid: string;
  size_uid: string;
  colour_uid: string;
  style_uid: string;
}

export interface RefundOrderItemsRequest {
  order_item_uids: string[];
  item_issue_reason?: string;
  additional_message?: string;
}

export interface MeContentFileItem {
  uid: string;
  title: string;
  file: string;
  thumbnail: string;
  status: string;
  kind: string;
  duration_count: number;
  created_at: string;
}

export interface MeContent {
  slug?: string;
  uid: string;
  title: string;
  status: string;
  description: string;
  react_count: number;
  share_count: number;
  view_count: number;
  schedule: string;
  file_item?: MeContentFileItem;
  file_items?: MeContentFileItem[];
  user?: any;
  created_at: string;
  updated_at: string;
}

export interface CreateMeContentRequest {
  title: string;
  description: string;
  schedule: string;
  file_items?: string[];
}

export interface UpdateMeContentRequest {
  title: string;
  description: string;
  schedule: string;
}

export interface MeContentSession {
  uid: string;
  content: {
    slug: string;
    title: string;
    description: string;
    view_count: number;
    created_at: string;
    updated_at: string;
  };
  file_items: MeContentFileItem;
  user?: Player;
  created_at: string;
}

export interface Session {
  uid: string;
  title: string;
  token: string;
  device_id: string;
  location: string;
  ip_address: string;
  expires_at: string;
  last_login: string;
  created_at: string;
}

export interface CreateSessionRequest {
  title: string;
  token: string;
  device_id: string;
  location: string;
  ip_address: string;
}

export interface UpdateSessionRequest {
  title: string;
  token: string;
  device_id: string;
  location: string;
  ip_address: string;
}

export interface SessionBulkDeleteRequest {
  uids: string[];
}

export interface SessionBulkDeleteResponse {
  uids: string[];
  message: string;
  deleted_count: number;
}

export interface LogoutResponse {
  message: string;
  deleted_count: number;
}

export interface NotificationUser {
  uid: string;
  username: string;
  first_name: string;
  image: string;
  created_at: string;
}

export interface Notification {
  uid: string;
  title: string;
  description: string;
  is_read: boolean;
  kind: string;
  kind_display: string;
  model_kind: string;
  model_kind_display: string;
  created_at: string;
  created_relative: string;
  firebase_id: string;
  content_uid?: string;
  content_title?: string;
  content_image?: string;
  user_image?: string;
  order_uid?: string;
  order_title?: string;
  product_image?: string;
  user_follows_uid?: string;
  user_follows_kind?: string;
  follower_user?: NotificationUser;
  followed_user?: NotificationUser;
}

export interface NotificationSettings {
  uid: string;
  is_notification_enabled: boolean;
  is_event_updates_enabled: boolean;
  reminder_interval: string;
  reminder_interval_display?: string;
  is_email_communication_enabled: boolean;
  is_email_event_updates_enabled: boolean;
  is_email_payment_updates_enabled: boolean;
  is_email_invoice_updates_enabled: boolean;
  is_email_general_updates_enabled: boolean;
  is_sound_disabled: boolean;
}

export interface UpdateNotificationSettingsRequest {
  is_notification_enabled: boolean;
  is_event_updates_enabled: boolean;
  reminder_interval: string;
  is_email_communication_enabled: boolean;
  is_email_event_updates_enabled: boolean;
  is_email_payment_updates_enabled: boolean;
  is_email_invoice_updates_enabled: boolean;
  is_email_general_updates_enabled: boolean;
  is_sound_disabled: boolean;
}

export interface WishlistFileItem {
  slug: string;
  title: string;
  file: string;
  thumbnail: string;
  status: string;
  kind: string;
  duration_count: number;
  created_at: string;
}

export interface WishlistContent {
  slug: string;
  title: string;
  description: string;
  view_count: number;
  file_item: WishlistFileItem;
  created_at: string;
  updated_at: string;
}

export interface Wishlist {
  uid: string;
  kind: string;
  content: WishlistContent;
  created_at: string;
}

export interface CreateWishlistRequest {
  kind: string;
  content_slug: string;
}

export interface SubscriptionPortalResponse {
  portal_url: string;
  message: string;
}

export interface SubscriptionReactivateResponse {
  message: string;
}

export interface SubscriptionRefundResponse {
  refund_id: string;
  status: string;
  refund_amount: number;
  message: string;
}

export interface SubscriptionCancelResponse {
  message: string;
  cancel_at: number;
  current_period_end: number;
}

export interface Player {
  slug: string;
  email: string;
  username: string;
  first_name: string;
  image: string;
  country: string;
  created_at: string;
  updated_at: string;
}

export interface CheckoutRequest {
  coach_uid: string;
}

export interface CheckoutResponse {
  session_id: string;
  checkout_url: string;
}

export interface Subscription {
  uid: string;
  player: Player;
  coach: Player;
  status: string;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  created_at: string;
}

export interface VerifySubscriptionResponse {
  subscription: Subscription;
  message: string;
}

export interface VerifySubscriptionRequest {
  session_id: string;
}

export interface WalletResponse {
  total_balance: string;
  total_earnings: string;
  total_refunds: string;
  current_month_total: string;
  previous_month_total: string;
  percentage_change: string;
}

export interface UpdateAddressRequest {
  address: string;
  street: string;
  apartment?: string;
  kind?: string;
  city?: string;
  country?: string;
  postal_code?: string;
  label?: string;
}

export interface UpdatePaymentRequest {
  status: string;
  cart_uids: string[];
}

export interface Payment {
  uid: string;
  start_time: string;
  end_time: string;
  total: string;
  currency_kind: string;
  kind: string;
  invoice_link?: string;
  status: string;
  player: Player;
  coach: Player;
  is_subscription_completed?: boolean;
  user_subscription?: Subscription;
  is_payment_completed?: boolean;
  order?: Order;
  created_at: string;
  updated_at?: string;
  _id?: string;
}

export interface DashboardEarning {
  month: string;
  amount: number;
  currency: string;
  year?: number;
}

export interface DashboardEngagement {
  day: number;
  value: number;
  date?: string;
}

export interface DashboardNewSubscriber {
  week: string;
  s1: number; // Placeholder for now, assume maybe "direct" vs "organic" or similar
  s2: number;
}

export interface DashboardViews {
  name: string; // e.g., "November"
  value: number;
  fill?: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['User', 'Coach'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api', // Fallback for dev
    prepareHeaders: (headers, { getState, endpoint }) => {
      // Exclude token for public endpoints
      if (
        endpoint === 'login' ||
        endpoint === 'signup' ||
        endpoint === 'sendOtp' ||
        endpoint === 'verifyOtp' ||
        endpoint === 'resetPassword'
      ) {
        return headers;
      }

      // By default, if we have a token in the store, let's include it in the headers
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/accounts/authentications/logins',
        method: 'POST',
        body: {
          ...credentials,
          ...getDeviceInfo(),
          location: 'unknown',
          ip_address: '0.0.0.0', // Ideally fetched from an IP service or ignored by backend
          push_token: 'none',
        },
      }),
      invalidatesTags: ['User'],
    }),
    googleLogin: builder.mutation({
      query: (data: {
        google_access_token: string;
        device_name?: string;
        device_id?: string;
        location?: string;
        ip_address?: string;
      }) => ({
        url: '/accounts/authentications/logins?is_google_auth=true',
        method: 'POST',
        body: {
          ...data,
          ...getDeviceInfo(),
          device_name: data.device_name || getDeviceInfo().device_name,
          device_id: data.device_id || getDeviceInfo().device_id,
          location: data.location || 'unknown',
          ip_address: data.ip_address || '0.0.0.0',
        },
      }),
      invalidatesTags: ['User'],
    }),
    facebookLogin: builder.mutation({
      query: (data: { facebook_access_token: string }) => ({
        url: '/accounts/authentications/logins?is_facebook_auth=true',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    signup: builder.mutation({
      query: (userData) => ({
        url: '/accounts/authentications/registers',
        method: 'POST',
        body: {
          first_name: userData.name,
          email: userData.email,
          password: userData.password,
          role: userData.role || 'PLAYER', // Use provided role or default to PLAYER
          club_slug: userData.club_slug,
          sport_slug: userData.sport_slug,
          playing_style_slug: userData.playing_style_slug,
          professional_level_slug: userData.professional_level_slug,

          ...getDeviceInfo(),
          location: 'unknown',
          ip_address: '0.0.0.0',
          push_token: 'none',
        },
      }),
      invalidatesTags: ['User'],
    }),
    sendOtp: builder.mutation({
      query: (data: { email: string }) => ({
        url: '/accounts/authentications/send-otp',
        method: 'POST',
        body: data,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data: {
        email: string;
        otp: string;
        device_name?: string;
        device_id?: string;
        ip_address?: string;
        push_token?: string;
        location?: string;
      }) => ({
        url: '/accounts/authentications/verify-otp',
        method: 'POST',
        body: {
          ...data,
          ...getDeviceInfo(),
          device_name: data.device_name || getDeviceInfo().device_name,
          device_id: data.device_id || getDeviceInfo().device_id,
          ip_address: data.ip_address || '0.0.0.0',
          location: data.location || 'unknown',
        },
      }),
      invalidatesTags: ['User'],
    }),
    resetPassword: builder.mutation({
      query: (data: { new_password: string }) => ({
        url: '/accounts/authentications/reset-password',
        method: 'POST',
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data: { old_password: string; new_password: string }) => ({
        url: '/accounts/authentications/change-password',
        method: 'POST',
        body: data,
      }),
    }),
    getMe: builder.mutation({
      query: () => ({
        url: '/me',
        method: 'GET',
      }),
      // Using mutation for GET is unusual but keeping existing code pattern if desired, or better switch to query if possible but keeping as mutation for now to minimize diff,
      // ACTUALLY previous code had getMe as mutation. Tags work differently for mutations (invalidates) vs queries (provides).
      // If getMe is mutation, it cannot provide tags for caching in the same way as query.
      // But getNotificationSettings is query.
      // Let's leave getMe as is for now to avoid breaking other things, but add invalidatesTags to updates.
    }),
    retrieveMe: builder.query<Coach, void>({
      query: () => ({
        url: '/me',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    updateMe: builder.mutation({
      query: (data) => ({
        url: '/me',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    createMeContent: builder.mutation<MeContent, CreateMeContentRequest>({
      query: (body) => ({
        url: '/me/contents',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    patchMe: builder.mutation({
      query: (data) => ({
        url: '/me',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    getNotificationSettings: builder.query<NotificationSettings, void>({
      query: () => ({
        url: '/me/notifications/settings',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    updateNotificationSettings: builder.mutation<
      NotificationSettings,
      UpdateNotificationSettingsRequest
    >({
      query: (body) => ({
        url: '/me/notifications/settings',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    patchNotificationSettings: builder.mutation<
      NotificationSettings,
      Partial<UpdateNotificationSettingsRequest>
    >({
      query: (data) => ({
        url: '/me/notifications/settings',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    getNotifications: builder.query<
      GlobalResponse<Notification>,
      { ordering?: string; page?: number; page_size?: number; search?: string } | void
    >({
      query: (params) => ({
        url: '/me/notifications',
        method: 'GET',
        params: params || undefined,
      }),
      providesTags: ['User'],
    }),
    getNotification: builder.query<Notification, string>({
      query: (uid) => ({
        url: `/me/notifications/${uid}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    getWishlists: builder.query<
      GlobalResponse<Wishlist>,
      { ordering?: string; page?: number; page_size?: number; search?: string } | void
    >({
      query: (params) => ({
        url: '/me/wishlists',
        method: 'GET',
        params: params || undefined,
      }),
      providesTags: ['User'],
    }),
    createWishlist: builder.mutation<Wishlist, CreateWishlistRequest>({
      query: (body) => ({
        url: '/me/wishlists',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    deleteWishlist: builder.mutation<void, string>({
      query: (uid) => ({
        url: `/me/wishlists/${uid}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: '/me/logout',
        method: 'POST',
        body: {},
      }),
      invalidatesTags: ['User'],
    }),
    getFollows: builder.query<any, void>({
      query: () => ({
        url: '/me/follows',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    createFollow: builder.mutation<any, any>({
      query: (body) => ({
        url: '/me/follows',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User', 'Coach'],
    }),
    getMeContents: builder.query<
      GlobalResponse<MeContent>,
      { ordering?: string; page?: number; page_size?: number; search?: string } | void
    >({
      query: (params) => ({
        url: '/me/contents',
        method: 'GET',
        params: params || undefined,
      }),
      providesTags: ['User'],
    }),
    getMeContent: builder.query<MeContent, string>({
      query: (uid) => ({
        url: `/me/contents/${uid}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    updateMeContent: builder.mutation<MeContent, { uid: string; data: UpdateMeContentRequest }>({
      query: ({ uid, data }) => ({
        url: `/me/contents/${uid}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    patchMeContent: builder.mutation<
      MeContent,
      { uid: string; data: Partial<UpdateMeContentRequest> }
    >({
      query: ({ uid, data }) => ({
        url: `/me/contents/${uid}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    deleteMeContent: builder.mutation<void, string>({
      query: (uid) => ({
        url: `/me/contents/${uid}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),

    createMeContentSession: builder.mutation<MeContentSession, string>({
      query: (uid) => ({
        url: `/me/contents/${uid}/sessions`,
        method: 'POST',
        body: {},
      }),
      invalidatesTags: ['User'],
    }),

    // Dashboard Endpoints
    getDashboard: builder.query<any, void>({
      query: () => ({
        url: '/me/dashboards',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    getDashboardEarnings: builder.query<GlobalResponse<DashboardEarning>, { year?: number } | void>(
      {
        query: (params) => ({
          url: '/me/dashboards/earnings',
          method: 'GET',
          params: params || undefined,
        }),
        providesTags: ['User'],
      }
    ),
    getDashboardEngagements: builder.query<GlobalResponse<DashboardEngagement>, void>({
      query: () => ({
        url: '/me/dashboards/engagements',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    getDashboardNewSubscribers: builder.query<GlobalResponse<DashboardNewSubscriber>, void>({
      query: () => ({
        url: '/me/dashboards/new-subscribers',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    getDashboardViews: builder.query<GlobalResponse<DashboardViews>, void>({
      query: () => ({
        url: '/me/dashboards/views',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),

    getMeContentSessions: builder.query<
      GlobalResponse<MeContentSession>,
      { ordering?: string; page?: number; page_size?: number; search?: string } | void
    >({
      query: (params) => ({
        url: '/me/contents/sessions',
        method: 'GET',
        params: params || undefined,
      }),
      providesTags: ['User'],
    }),

    getCartItems: builder.query<
      GlobalResponse<CartItem>,
      { ordering?: string; page?: number; page_size?: number; search?: string } | void
    >({
      query: (params) => ({
        url: '/me/carts',
        method: 'GET',
        params: params || undefined,
      }),
      providesTags: ['User'],
    }),
    getCartItemByUid: builder.query<CartItem, string>({
      query: (uid) => ({
        url: `/me/carts/${uid}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    addToCart: builder.mutation<CartItem, AddToCartRequest>({
      query: (body) => ({
        url: '/me/carts',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['User'],
    }),

    getCoachSubscriptions: builder.query<
      GlobalResponse<Subscription>,
      { ordering?: string; page?: number; page_size?: number; search?: string } | void
    >({
      query: (params) => ({
        url: '/me/subscriptions/coach',
        method: 'GET',
        params: params || undefined,
      }),
      providesTags: ['User'],
    }),
    updateCartItem: builder.mutation<
      { product_count: number },
      { uid: string; body: UpdateCartItemRequest }
    >({
      query: ({ uid, body }) => ({
        url: `/me/carts/${uid}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    patchCartItem: builder.mutation<
      { product_count: number },
      { uid: string; body: UpdateCartItemRequest }
    >({
      query: ({ uid, body }) => ({
        url: `/me/carts/${uid}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    deleteCartItem: builder.mutation<void, string>({
      query: (uid) => ({
        url: `/me/carts/${uid}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),

    // Orders
    getOrders: builder.query<
      GlobalResponse<Order>,
      { ordering?: string; page?: number; page_size?: number; search?: string } | void
    >({
      query: (params) => ({
        url: '/me/orders',
        method: 'GET',
        params: params || undefined,
      }),
      providesTags: ['User'],
    }),
    createOrder: builder.mutation<Order, CreateOrderRequest>({
      query: (body) => ({
        url: '/me/orders',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    getOrder: builder.query<Order, string>({
      query: (uid) => ({
        url: `/me/orders/${uid}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    updateOrder: builder.mutation<Order, { uid: string; body: UpdateOrderRequest }>({
      query: ({ uid, body }) => ({
        url: `/me/orders/${uid}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    patchOrder: builder.mutation<Order, { uid: string; body: Partial<UpdateOrderRequest> }>({
      query: ({ uid, body }) => ({
        url: `/me/orders/${uid}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    deleteOrder: builder.mutation<void, string>({
      query: (uid) => ({
        url: `/me/orders/${uid}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),

    // Order Cancellation
    cancelOrder: builder.mutation<Order, { uid: string; body: CancelOrderRequest }>({
      query: ({ uid, body }) => ({
        url: `/me/orders/${uid}/cancel`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    patchCancelOrder: builder.mutation<Order, { uid: string; body: CancelOrderRequest }>({
      query: ({ uid, body }) => ({
        url: `/me/orders/${uid}/cancel`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    // Order Items
    getOrderItems: builder.query<
      GlobalResponse<OrderItem>,
      { uid: string; ordering?: string; page?: number; page_size?: number; search?: string }
    >({
      query: ({ uid, ...params }) => ({
        url: `/me/orders/${uid}/items`,
        method: 'GET',
        params,
      }),
      providesTags: ['User'],
    }),
    createOrderItem: builder.mutation<OrderItem, { uid: string; body: CreateOrderItemRequest }>({
      query: ({ uid, body }) => ({
        url: `/me/orders/${uid}/items`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    updateOrderItem: builder.mutation<
      OrderItem,
      { uid: string; order_item_uid: string; body: UpdateOrderItemRequest }
    >({
      query: ({ uid, order_item_uid, body }) => ({
        url: `/me/orders/${uid}/items/${order_item_uid}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    patchOrderItem: builder.mutation<
      OrderItem,
      { uid: string; order_item_uid: string; body: Partial<UpdateOrderItemRequest> }
    >({
      query: ({ uid, order_item_uid, body }) => ({
        url: `/me/orders/${uid}/items/${order_item_uid}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    deleteOrderItem: builder.mutation<void, { uid: string; order_item_uid: string }>({
      query: ({ uid, order_item_uid }) => ({
        url: `/me/orders/${uid}/items/${order_item_uid}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    getOrderItem: builder.query<OrderItem, { uid: string; order_item_uid: string }>({
      query: ({ uid, order_item_uid }) => ({
        url: `/me/orders/${uid}/items/${order_item_uid}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),

    // Tracking
    getOrderTracking: builder.query<TrackingResponse, string>({
      query: (uid) => ({
        url: `/me/orders/${uid}/tracking`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    getAllOrderTracking: builder.query<
      GlobalResponse<TrackingResponse>,
      { ordering?: string; page?: number; page_size?: number; search?: string } | void
    >({
      query: (params) => ({
        url: '/me/orders/tracking',
        method: 'GET',
        params: params || undefined,
      }),
      providesTags: ['User'],
    }),

    // Refund
    refundOrderItems: builder.mutation<
      { order_item_uids: string[]; item_issue_reason: string; additional_message: string },
      RefundOrderItemsRequest
    >({
      query: (body) => ({
        url: '/me/orders/items/refund',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    // Addresses
    getAddresses: builder.query<GlobalResponse<Address>, void>({
      query: () => ({
        url: '/me/delivery-addresses',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    createAddress: builder.mutation<Address, CreateAddressRequest>({
      query: (body) => ({
        url: '/me/delivery-addresses',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    getAddress: builder.query<Address, string>({
      query: (uid) => ({
        url: `/me/delivery-addresses/${uid}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    updateAddress: builder.mutation<Address, { uid: string; body: UpdateAddressRequest }>({
      query: ({ uid, body }) => ({
        url: `/me/delivery-addresses/${uid}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    patchAddress: builder.mutation<Address, { uid: string; body: Partial<UpdateAddressRequest> }>({
      query: ({ uid, body }) => ({
        url: `/me/delivery-addresses/${uid}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    deleteAddress: builder.mutation<void, string>({
      query: (uid) => ({
        url: `/me/delivery-addresses/${uid}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),

    // Contents

    // Sessions
    getSessions: builder.query<
      GlobalResponse<Session>,
      { ordering?: string; page?: number; page_size?: number; search?: string } | void
    >({
      query: (params) => ({
        url: '/me/sessions',
        method: 'GET',
        params: params || undefined,
      }),
      providesTags: ['User'],
    }),
    createSession: builder.mutation<Session, CreateSessionRequest>({
      query: (body) => ({
        url: '/me/sessions',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    getSession: builder.query<Session, string>({
      query: (uid) => ({
        url: `/me/sessions/${uid}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    updateSession: builder.mutation<Session, { uid: string; body: UpdateSessionRequest }>({
      query: ({ uid, body }) => ({
        url: `/me/sessions/${uid}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    patchSession: builder.mutation<Session, { uid: string; body: Partial<UpdateSessionRequest> }>({
      query: ({ uid, body }) => ({
        url: `/me/sessions/${uid}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    deleteSession: builder.mutation<void, string>({
      query: (uid) => ({
        url: `/me/sessions/${uid}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    bulkDeleteSessions: builder.mutation<SessionBulkDeleteResponse, SessionBulkDeleteRequest>({
      query: (body) => ({
        url: '/me/sessions/bulk-delete',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    // Subscriptions
    getSubscriptions: builder.query<
      GlobalResponse<Subscription>,
      { ordering?: string; page?: number; page_size?: number; search?: string } | void
    >({
      query: (params) => ({
        url: '/me/subscriptions',
        method: 'GET',
        params: params || undefined,
      }),
      providesTags: ['User'],
    }),
    getSubscription: builder.query<Subscription, string>({
      query: (uid) => ({
        url: `/me/subscriptions/${uid}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    createSubscriptionPortal: builder.mutation<SubscriptionPortalResponse, string>({
      query: (subscription_uid) => ({
        url: `/me/subscriptions/portal/${subscription_uid}`,
        method: 'POST',
        body: {},
      }),
      invalidatesTags: ['User'],
    }),
    cancelSubscription: builder.mutation<SubscriptionCancelResponse, string>({
      query: (subscription_uid) => ({
        url: `/me/subscriptions/cancel/${subscription_uid}`,
        method: 'POST',
        body: {},
      }),
      invalidatesTags: ['User'],
    }),
    reactivateSubscription: builder.mutation<SubscriptionReactivateResponse, string>({
      query: (subscription_uid) => ({
        url: `/me/subscriptions/reactivate/${subscription_uid}`,
        method: 'POST',
        body: {},
      }),
      invalidatesTags: ['User'],
    }),
    refundSubscription: builder.mutation<SubscriptionRefundResponse, string>({
      query: (subscription_uid) => ({
        url: `/me/subscriptions/refund/${subscription_uid}`,
        method: 'POST',
        body: {},
      }),
      invalidatesTags: ['User'],
    }),
    createSubscriptionCheckout: builder.mutation<CheckoutResponse, CheckoutRequest>({
      query: (body) => ({
        url: '/me/subscriptions/checkout',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    verifySubscription: builder.mutation<VerifySubscriptionResponse, VerifySubscriptionRequest>({
      query: (body) => ({
        url: '/me/subscriptions/verify',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    getWallet: builder.query<WalletResponse, void>({
      query: () => ({
        url: '/me/subscriptions/wallet',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    getPayments: builder.query<
      GlobalResponse<Payment>,
      { ordering?: string; page?: number; page_size?: number; search?: string } | void
    >({
      query: (params) => ({
        url: '/me/payments',
        method: 'GET',
        params: params || undefined,
      }),
      providesTags: ['User'],
    }),
    getPayment: builder.query<Payment, string>({
      query: (payment_intent_id) => ({
        url: `/me/payments/${payment_intent_id}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    updatePayment: builder.mutation<
      Payment,
      { payment_intent_id: string; body: UpdatePaymentRequest }
    >({
      query: ({ payment_intent_id, body }) => ({
        url: `/me/payments/${payment_intent_id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    patchPayment: builder.mutation<
      Payment,
      { payment_intent_id: string; body: Partial<UpdatePaymentRequest> }
    >({
      query: ({ payment_intent_id, body }) => ({
        url: `/me/payments/${payment_intent_id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useGetMeMutation,
  useRetrieveMeQuery,
  useUpdateMeMutation,
  usePatchMeMutation,
  useGetNotificationSettingsQuery,
  useUpdateNotificationSettingsMutation,
  usePatchNotificationSettingsMutation,
  useGetNotificationsQuery,
  useGetNotificationQuery,
  useGetWishlistsQuery,
  useCreateWishlistMutation,
  useDeleteWishlistMutation,
  useLogoutMutation,
  useGetFollowsQuery,
  useCreateFollowMutation,
  useGoogleLoginMutation,
  useFacebookLoginMutation,
  useGetDashboardQuery,
  useGetDashboardEarningsQuery,
  useGetDashboardEngagementsQuery,
  useGetDashboardNewSubscribersQuery,
  useGetDashboardViewsQuery,
  useGetCartItemsQuery,
  useGetCartItemByUidQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useCreateMeContentMutation,
  usePatchCartItemMutation,
  useDeleteCartItemMutation,
  useGetOrdersQuery,
  useCreateOrderMutation,
  useGetOrderQuery,
  useUpdateOrderMutation,
  usePatchOrderMutation,
  useDeleteOrderMutation,
  useGetAddressesQuery,
  useCreateAddressMutation,
  useCancelOrderMutation,
  usePatchCancelOrderMutation,
  useGetOrderItemsQuery,
  useCreateOrderItemMutation,
  useUpdateOrderItemMutation,
  usePatchOrderItemMutation,
  useDeleteOrderItemMutation,
  useGetOrderItemQuery,
  useGetOrderTrackingQuery,
  useGetAllOrderTrackingQuery,
  useRefundOrderItemsMutation,

  useGetMeContentsQuery,
  useGetMeContentQuery,
  useUpdateMeContentMutation,
  usePatchMeContentMutation,
  useDeleteMeContentMutation,
  useGetSessionsQuery,
  useCreateSessionMutation,
  useGetSessionQuery,
  useUpdateSessionMutation,
  usePatchSessionMutation,
  useDeleteSessionMutation,
  useBulkDeleteSessionsMutation,
  useCreateMeContentSessionMutation,
  useGetMeContentSessionsQuery,
  useGetSubscriptionsQuery,
  useGetSubscriptionQuery,
  useCreateSubscriptionPortalMutation,
  useCancelSubscriptionMutation,
  useReactivateSubscriptionMutation,
  useRefundSubscriptionMutation,
  useCreateSubscriptionCheckoutMutation,
  useVerifySubscriptionMutation,
  useGetCoachSubscriptionsQuery,
  useGetWalletQuery,
  useGetAddressQuery,
  useUpdateAddressMutation,
  usePatchAddressMutation,
  useDeleteAddressMutation,
  useGetPaymentsQuery,
  useGetPaymentQuery,
  useUpdatePaymentMutation,
  usePatchPaymentMutation,
} = authApi;
