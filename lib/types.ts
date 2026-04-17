export interface PostCardProp {
  id: number | string;
  uid?: string;
  title: string;
  description: string;
  views: string;
  share: string;
  media:
    | {
        type: 'image';
        images: string[];
      }
    | {
        type: 'video';
        src: string;
        duration: string;
      };
  profile: {
    image?: string;
    name: string;
    last_active: Date;
    slug?: string;
    uid?: string;
  };
  category: string;
  has_subscribe?: boolean;
  tags?: string[];
  is_lock?: boolean;
  is_saved?: boolean;
  wishlist_uid?: string;
}

export interface InstructorCardProp {
  id: number | string;
  slug: string;
  name: string;
  image: string;
  country: string;
  verified: boolean;
  sports: string;
  age: number;
  position: string;
}

export interface ProductCardProp {
  id: number | string;
  slug?: string;
  name: string;
  price: number;
  images: { src: string }[];
  description: string;
}
export interface CategoryProp {
  slug: string;
  value: string;
  image: string;
}

export interface ActivityProp {
  id: number;
  category: string;
  views: string;
  image: string;
}

interface BaseHistoryCard {
  id: number | string;
  title: string;
  items: {
    image: string;
    name: string;
    price?: number;
    quantity?: number;
    attributes?: string;
    product_uid?: string;
    size_uid?: string;
    colour_uid?: string;
    style_uid?: string;
  }[];
  price: number;
  date: Date;
  shipping_address: {
    name: string;
    email: string;
    location: string;
  };
  payment_details: {
    payment_method: string;
    trx_id: string;
  };
  type: 'ORDER' | 'PAYMENT';
  is_subscription?: boolean;
}

export type HistoryCardProp = BaseHistoryCard;

export interface TrackingCardProp {
  id: string;
  status: 'ongoing' | 'completed' | 'cancelled';
  from: string;
  to: string;
  fromDate: string;
  toDate: string;
  progress: 1 | 2 | 3 | 4;
  sender: string;
  receiver: string;
}
