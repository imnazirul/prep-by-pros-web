import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export interface GlobalResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Option {
  uid: string;
  slug: string;
  title: string;
  kind?: string;
  created_at?: string;
}

export interface Brand {
  uid: string;
  slug: string;
  title: string;
  description?: string;
  created_at?: string;
}

export interface FileItem {
  slug: string;
  file: string;
  thumbnail: string;
  kind: string;
  status: string;
  link: string;
  duration_count: number;
  created_at: string;
}

export interface Category {
  slug: string;
  title: string;
  description: string;
  file_items?: FileItem[];
  created_at: string;
}

export type ChatStatus =
  | 'OPEN'
  | 'CLOSED'
  | 'DRAFT'
  | 'REMOVED'
  | 'COMPLETED'
  | 'ON_GOING'
  | 'PENDING';

export type ChatKind = 'SUPPORT_AND_TICKET' | 'PRIVATE_CHAT' | 'GROUP_CHAT';

export interface Chat {
  uid: string;
  title: string | null;
  ticket_noumber: string | null;
  status: ChatStatus;
  kind: ChatKind;
  is_seen: string;
  user: string;
  target: string;
  created_at: string;
  updated_at: string;
}

export interface ChatSearchParams {
  ordering?: string;
  page?: number;
  page_size?: number;
  search?: string;
}

export interface UpdateChatRequest {
  status: ChatStatus;
}

export interface ChatThread {
  uid: string;
  kind: string;
  author: {
    uid: string;
    username: string;
    first_name: string;
    image: string;
    created_at: string;
  };
  content: string;
  file_items: FileItem[];
  created_at: string;
  updated_at: string;
}

export interface Coach {
  uid: string;
  slug: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  image: string;
  club: Option[];
  is_subscribed: boolean;
  is_followed: boolean;
  created_at: string;
  updated_at: string;
  referral_code?: string;
  // Details
  username?: string;
  description?: string;
  sports?: Option[];
  Playing_style?: Option[];
  Playing_in?: Option[];
  total_post?: number;
  total_vedios?: number;
  total_subscriber?: number;
  coach_subscription?: any;
  user_subscription?: any;
  position?: Option[];
  age?: number | null;
  content?: {
    slug: string;
    title: string;
    file_items: any[];
    view_count?: number;
    share_count?: number;
    description?: string;
    created_at?: string;
    updated_at?: string;
    is_saved?: boolean;
    wishlist_uid?: string | null;
  };
}

export interface Content {
  slug: string;
  uid: string;
  title: string;
  react_count: number;
  share_count: number;
  view_count: number;
  description: string;
  is_file_item_un_locked: boolean | string;
  file_items: any;
  created_at: string;
  user?: any;
  is_subscribed?: string;
  wishlist_uid?: string;
}

export interface Filter {
  uid: string;
  slug: string;
  title: string;
  code?: string;
  description?: string;
  created_at: string;
}

export interface Product {
  slug: string;
  title: string;
  uid: string;
  sku: string;
  price: string;
  stock_count: number;
  sizes: Option[];
  colours: Filter[];
  styles: Option[];
  brands: Partial<Brand>[];
  file_items: FileItem[];
  created_at: string;
  // Details
  is_countable?: boolean;
  status?: string;
  tax_type?: string;
  tax?: string;
  discount_type?: string;
  discount?: string;
  description?: string;
}

export const globalApi = createApi({
  reducerPath: 'globalApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      console.log('token', token);
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
    },
  }),
  tagTypes: ['Coach'],
  endpoints: (builder) => ({
    // Brands
    getBrands: builder.query<GlobalResponse<Brand>, void>({
      query: () => '/global/brands',
    }),
    createBrand: builder.mutation<Brand, { title: string; product_uid?: string }>({
      query: (body) => ({
        url: '/global/brands',
        method: 'POST',
        body,
      }),
    }),
    getBrandBySlug: builder.query<Brand, string>({
      query: (slug) => `/global/brands/${slug}`,
    }),

    // Category
    getCategories: builder.query<GlobalResponse<Category>, any>({
      query: (params) => ({
        url: '/global/category',
        method: 'GET',
        params,
      }),
    }),
    createCategory: builder.mutation<Category, { title: string; description: string }>({
      query: (body) => ({
        url: '/global/category',
        method: 'POST',
        body,
      }),
    }),

    // Chats
    // Chats
    getChats: builder.query<GlobalResponse<Chat>, ChatSearchParams | void>({
      query: (params) => ({
        url: '/global/chats',
        method: 'GET',
        params: params || undefined,
      }),
    }),
    createChat: builder.mutation<Chat, { title: string; content: string }>({
      query: (body) => ({
        url: '/global/chats',
        method: 'POST',
        body,
      }),
    }),
    getChatByUid: builder.query<Chat, string>({
      query: (uid) => `/global/chats/${uid}`,
    }),
    updateChat: builder.mutation<Chat, { uid: string; body: UpdateChatRequest }>({
      query: ({ uid, body }) => ({
        url: `/global/chats/${uid}`,
        method: 'PUT',
        body,
      }),
    }),
    patchChat: builder.mutation<Chat, { uid: string; body: Partial<UpdateChatRequest> }>({
      query: ({ uid, body }) => ({
        url: `/global/chats/${uid}`,
        method: 'PATCH',
        body,
      }),
    }),
    getChatThreads: builder.query<
      GlobalResponse<ChatThread>,
      {
        uid: string;
        author__uid?: string;
        ordering?: string;
        page?: number;
        page_size?: number;
        search?: string;
      }
    >({
      query: ({ uid, ...params }) => ({
        url: `/global/chats/${uid}/threads`,
        method: 'GET',
        params: params || undefined,
      }),
    }),
    createChatThread: builder.mutation<
      ChatThread,
      { uid: string; body: { content: string; files?: string[] } }
    >({
      query: ({ uid, body }) => ({
        url: `/global/chats/${uid}/threads`,
        method: 'POST',
        body,
      }),
    }),

    // Coaches
    getCoaches: builder.query<GlobalResponse<Coach>, Record<string, any> | void>({
      query: (params) => ({
        url: '/global/coaches',
        params: params || undefined,
      }),
      providesTags: ['Coach'],
    }),
    getCoachBySlug: builder.query<Coach, string>({
      query: (slug) => `/global/coaches/${slug}`,
      providesTags: (result, error, slug) => [{ type: 'Coach', id: slug }],
    }),

    // Contents
    getContents: builder.query<
      GlobalResponse<Content>,
      { ordering?: string; page?: number; page_size?: number; search?: string } | void
    >({
      query: (params) => ({
        url: '/global/contents',
        method: 'GET',
        params: params || undefined,
      }),
    }),
    getContentBySlug: builder.query<Content, string>({
      query: (slug) => `/global/contents/${slug}`,
    }),

    // Files
    getFiles: builder.query<GlobalResponse<FileItem>, void>({
      query: () => '/global/files',
    }),
    uploadFile: builder.mutation<FileItem, any>({
      query: (body) => ({
        url: '/global/files',
        method: 'POST',
        body,
      }),
    }),
    getFileBySlug: builder.query<FileItem, string>({
      query: (slug) => `/global/files/${slug}`,
    }),
    updateFile: builder.mutation<FileItem, { slug: string; body: any }>({
      query: ({ slug, body }) => ({
        url: `/global/files/${slug}`,
        method: 'PUT',
        body,
      }),
    }),
    patchFile: builder.mutation<FileItem, { slug: string; body: any }>({
      query: ({ slug, body }) => ({
        url: `/global/files/${slug}`,
        method: 'PATCH',
        body,
      }),
    }),
    deleteFile: builder.mutation<void, string>({
      query: (slug) => ({
        url: `/global/files/${slug}`,
        method: 'DELETE',
      }),
    }),

    // Filters
    getBrandFilters: builder.query<Filter[], void>({
      query: () => '/global/filters/brands',
    }),
    createBrandFilter: builder.mutation<Filter, { title: string }>({
      query: (body) => ({
        url: '/global/filters/brands',
        method: 'POST',
        body,
      }),
    }),
    getColorFilters: builder.query<Filter[], void>({
      query: () => '/global/filters/colors',
    }),
    createColorFilter: builder.mutation<Filter, { title: string; code: string }>({
      query: (body) => ({
        url: '/global/filters/colors',
        method: 'POST',
        body,
      }),
    }),
    getSizeFilters: builder.query<Filter[], void>({
      query: () => '/global/filters/sizes',
    }),
    createSizeFilter: builder.mutation<
      Filter,
      { title: string; description: string; code: string }
    >({
      query: (body) => ({
        url: '/global/filters/sizes',
        method: 'POST',
        body,
      }),
    }),
    getStyleFilters: builder.query<Filter[], void>({
      query: () => '/global/filters/styles',
    }),
    createStyleFilter: builder.mutation<Filter, { title: string; description: string }>({
      query: (body) => ({
        url: '/global/filters/styles',
        method: 'POST',
        body,
      }),
    }),

    // Products
    getProducts: builder.query<GlobalResponse<Product>, Record<string, any> | void>({
      query: (params) => ({
        url: '/global/products',
        params: params || undefined,
      }),
    }),
    getProductBySlug: builder.query<Product, string>({
      query: (slug) => `/global/products/${slug}`,
    }),
    getTopSliderProducts: builder.query<Product[], void>({
      query: () => '/global/products/top-slider',
    }),

    // Sports
    getSports: builder.query<GlobalResponse<Option>, void>({
      query: () => '/global/sports',
    }),
    getClubs: builder.query<GlobalResponse<Option>, string | void>({
      query: (search) => ({
        url: '/global/sports/clubs',
        params: search ? { search } : undefined,
      }),
    }),
    getPlayingStyles: builder.query<GlobalResponse<Option>, void>({
      query: () => '/global/sports/playing-styles',
    }),
    getProfessionalLevels: builder.query<GlobalResponse<Option>, void>({
      query: () => '/global/sports/professional-levels',
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useCreateBrandMutation,
  useGetBrandBySlugQuery,
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useGetChatsQuery,
  useCreateChatMutation,
  useGetChatByUidQuery,
  useUpdateChatMutation,
  usePatchChatMutation,
  useGetChatThreadsQuery,
  useCreateChatThreadMutation,
  useGetCoachesQuery,
  useGetCoachBySlugQuery,
  useLazyGetCoachBySlugQuery,
  useGetContentsQuery,
  useGetContentBySlugQuery,
  useGetFilesQuery,
  useUploadFileMutation,
  useGetFileBySlugQuery,
  useUpdateFileMutation,
  usePatchFileMutation,
  useDeleteFileMutation,
  useGetBrandFiltersQuery,
  useCreateBrandFilterMutation,
  useGetColorFiltersQuery,
  useCreateColorFilterMutation,
  useGetSizeFiltersQuery,
  useCreateSizeFilterMutation,
  useGetStyleFiltersQuery,
  useCreateStyleFilterMutation,
  useGetProductsQuery,
  useGetProductBySlugQuery,
  useGetTopSliderProductsQuery,
  useGetSportsQuery,
  useGetClubsQuery,
  useGetPlayingStylesQuery,
  useGetProfessionalLevelsQuery,
} = globalApi;
