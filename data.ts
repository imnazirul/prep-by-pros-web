import {
  CategoryProp,
  HistoryCardProp,
  PostCardProp,
  ProductCardProp,
  TrackingCardProp,
} from './lib/types';

export const categories: CategoryProp[] = [
  { slug: 'jersey', value: 'Jersey', image: '/images/category/jersey.svg' },
  {
    slug: 'football',
    value: 'Football',
    image: '/images/category/football.svg',
  },
  {
    slug: 'track-suit',
    value: 'Track suit',
    image: '/images/category/suit.png',
  },
  {
    slug: 'shorts',
    value: 'Shorts',
    image: '/images/category/sports.png',
  },
];

export const orderList: HistoryCardProp[] = [
  {
    id: 1,
    title: 'Subscribed to J. Parker',
    price: 58.0,
    type: 'ORDER',
    date: new Date('24 May 2025'),
    items: [
      {
        image:
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Signed  Sweatshirt (3x)',
      },
      {
        image:
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Fan Made Cap (2x)',
      },
      {
        image:
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Vintage Tracksuit',
      },
    ],
    shipping_address: {
      name: 'Andrew Whierholze',
      email: 'andrewhierholze@gmail.com',
      location: 'New York',
    },
    payment_details: {
      payment_method: 'Cash on Delivery',
      trx_id: '93DJ2231ADD35672D',
    },
  },
  {
    id: 2,
    title: 'Subscribed to J. Parker',
    price: 58.0,
    type: 'ORDER',
    date: new Date('24 May 2025'),
    items: [
      {
        image:
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Signed  Sweatshirt (3x)',
      },
    ],
    shipping_address: {
      name: 'Andrew Whierholze',
      email: 'andrewhierholze@gmail.com',
      location: 'New York',
    },
    payment_details: {
      payment_method: 'Cash on Delivery',
      trx_id: '93DJ2231ADD35672D',
    },
  },
  {
    id: 3,
    title: 'Subscribed to J. Parker',
    price: 58.0,
    type: 'ORDER',
    date: new Date('24 May 2025'),
    items: [
      {
        image:
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Signed  Sweatshirt (3x)',
      },
    ],
    shipping_address: {
      name: 'Andrew Whierholze',
      email: 'andrewhierholze@gmail.com',
      location: 'New York',
    },
    payment_details: {
      payment_method: 'Cash on Delivery',
      trx_id: '93DJ2231ADD35672D',
    },
  },
  {
    id: 4,
    title: 'Subscribed to J. Parker',
    price: 58.0,
    type: 'ORDER',
    date: new Date('24 May 2025'),
    items: [
      {
        image:
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Signed  Sweatshirt (3x)',
      },
    ],
    shipping_address: {
      name: 'Andrew Whierholze',
      email: 'andrewhierholze@gmail.com',
      location: 'New York',
    },
    payment_details: {
      payment_method: 'Cash on Delivery',
      trx_id: '93DJ2231ADD35672D',
    },
  },
  {
    id: 5,
    title: 'Subscribed to J. Parker',
    price: 58.0,
    type: 'ORDER',
    date: new Date('24 May 2025'),
    items: [
      {
        image:
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Signed  Sweatshirt (3x)',
      },
    ],
    shipping_address: {
      name: 'Andrew Whierholze',
      email: 'andrewhierholze@gmail.com',
      location: 'New York',
    },
    payment_details: {
      payment_method: 'Cash on Delivery',
      trx_id: '93DJ2231ADD35672D',
    },
  },
  {
    id: 6,
    title: 'Subscribed to J. Parker',
    price: 58.0,
    type: 'ORDER',
    date: new Date('24 May 2025'),
    items: [
      {
        image:
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Signed  Sweatshirt (3x)',
      },
    ],
    shipping_address: {
      name: 'Andrew Whierholze',
      email: 'andrewhierholze@gmail.com',
      location: 'New York',
    },
    payment_details: {
      payment_method: 'Cash on Delivery',
      trx_id: '93DJ2231ADD35672D',
    },
  },
  {
    id: 7,
    title: 'Subscribed to J. Parker',
    price: 58.0,
    type: 'ORDER',
    date: new Date('24 May 2025'),
    items: [
      {
        image:
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Signed  Sweatshirt (3x)',
      },
    ],
    shipping_address: {
      name: 'Andrew Whierholze',
      email: 'andrewhierholze@gmail.com',
      location: 'New York',
    },
    payment_details: {
      payment_method: 'Cash on Delivery',
      trx_id: '93DJ2231ADD35672D',
    },
  },
  {
    id: 8,
    title: 'Subscribed to J. Parker',
    price: 58.0,
    type: 'ORDER',
    date: new Date('24 May 2025'),
    items: [
      {
        image:
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Signed  Sweatshirt (3x)',
      },
    ],
    shipping_address: {
      name: 'Andrew Whierholze',
      email: 'andrewhierholze@gmail.com',
      location: 'New York',
    },
    payment_details: {
      payment_method: 'Cash on Delivery',
      trx_id: '93DJ2231ADD35672D',
    },
  },
];

export const paymentList: HistoryCardProp[] = [
  {
    id: 1,
    title: 'Subscribed to J. Parker',
    price: 58.0,
    type: 'PAYMENT',
    date: new Date('24 May 2025'),
    items: [
      {
        image:
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Signed  Sweatshirt (3x)',
      },
      {
        image:
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Fan Made Cap (2x)',
      },
      {
        image:
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Vintage Tracksuit',
      },
    ],
    shipping_address: {
      name: 'Andrew Whierholze',
      email: 'andrewhierholze@gmail.com',
      location: 'New York',
    },
    payment_details: {
      payment_method: 'Cash on Delivery',
      trx_id: '93DJ2231ADD35672D',
    },
  },
  {
    id: 2,
    title: 'Subscribed to J. Parker',
    price: 58.0,
    type: 'PAYMENT',
    date: new Date('24 May 2025'),
    items: [
      {
        image:
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Signed  Sweatshirt (3x)',
      },
    ],
    shipping_address: {
      name: 'Andrew Whierholze',
      email: 'andrewhierholze@gmail.com',
      location: 'New York',
    },
    payment_details: {
      payment_method: 'Cash on Delivery',
      trx_id: '93DJ2231ADD35672D',
    },
  },
  {
    id: 3,
    title: 'Subscribed to J. Parker',
    price: 58.0,
    type: 'PAYMENT',
    date: new Date('24 May 2025'),
    items: [
      {
        image:
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Signed  Sweatshirt (3x)',
      },
    ],
    shipping_address: {
      name: 'Andrew Whierholze',
      email: 'andrewhierholze@gmail.com',
      location: 'New York',
    },
    payment_details: {
      payment_method: 'Cash on Delivery',
      trx_id: '93DJ2231ADD35672D',
    },
  },
  {
    id: 4,
    title: 'Subscribed to J. Parker',
    price: 58.0,
    type: 'PAYMENT',
    date: new Date('24 May 2025'),
    items: [
      {
        image:
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Signed  Sweatshirt (3x)',
      },
    ],
    shipping_address: {
      name: 'Andrew Whierholze',
      email: 'andrewhierholze@gmail.com',
      location: 'New York',
    },
    payment_details: {
      payment_method: 'Cash on Delivery',
      trx_id: '93DJ2231ADD35672D',
    },
  },
  {
    id: 5,
    title: 'Subscribed to J. Parker',
    price: 58.0,
    type: 'PAYMENT',
    date: new Date('24 May 2025'),
    items: [
      {
        image:
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Signed  Sweatshirt (3x)',
      },
    ],
    shipping_address: {
      name: 'Andrew Whierholze',
      email: 'andrewhierholze@gmail.com',
      location: 'New York',
    },
    payment_details: {
      payment_method: 'Cash on Delivery',
      trx_id: '93DJ2231ADD35672D',
    },
  },
  {
    id: 6,
    title: 'Subscribed to J. Parker',
    price: 58.0,
    type: 'PAYMENT',
    date: new Date('24 May 2025'),
    items: [
      {
        image:
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Signed  Sweatshirt (3x)',
      },
    ],
    shipping_address: {
      name: 'Andrew Whierholze',
      email: 'andrewhierholze@gmail.com',
      location: 'New York',
    },
    payment_details: {
      payment_method: 'Cash on Delivery',
      trx_id: '93DJ2231ADD35672D',
    },
  },
  {
    id: 7,
    title: 'Subscribed to J. Parker',
    price: 58.0,
    type: 'PAYMENT',
    date: new Date('24 May 2025'),
    items: [
      {
        image:
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Signed  Sweatshirt (3x)',
      },
    ],
    shipping_address: {
      name: 'Andrew Whierholze',
      email: 'andrewhierholze@gmail.com',
      location: 'New York',
    },
    payment_details: {
      payment_method: 'Cash on Delivery',
      trx_id: '93DJ2231ADD35672D',
    },
  },
  {
    id: 8,
    title: 'Subscribed to J. Parker',
    price: 58.0,
    type: 'PAYMENT',
    date: new Date('24 May 2025'),
    items: [
      {
        image:
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: 'Signed  Sweatshirt (3x)',
      },
    ],
    shipping_address: {
      name: 'Andrew Whierholze',
      email: 'andrewhierholze@gmail.com',
      location: 'New York',
    },
    payment_details: {
      payment_method: 'Cash on Delivery',
      trx_id: '93DJ2231ADD35672D',
    },
  },
];

export const orders: TrackingCardProp[] = [
  {
    id: '#492KILAP2',
    status: 'ongoing' as const,
    from: 'Mongolia',
    to: 'Nepal',
    fromDate: '15 May 2025',
    toDate: '24 May 2025',
    progress: 3,
    sender: 'Balla Daniella',
    receiver: 'Vincze Nikolett',
  },
  {
    id: '#492KILAP2',
    status: 'completed' as const,
    from: 'Mongolia',
    to: 'Nepal',
    fromDate: '15 May 2025',
    toDate: '24 May 2025',
    progress: 4,
    sender: 'Balla Daniella',
    receiver: 'Vincze Nikolett',
  },
  {
    id: '#492KILAP2',
    status: 'cancelled' as const,
    from: 'Mongolia',
    to: 'Nepal',
    fromDate: '15 May 2025',
    toDate: '24 May 2025',
    progress: 2,
    sender: 'Balla Daniella',
    receiver: 'Vincze Nikolett',
  },
  {
    id: '#492KILAP2',
    status: 'ongoing' as const,
    from: 'Mongolia',
    to: 'Nepal',
    fromDate: '15 May 2025',
    toDate: '24 May 2025',
    progress: 1,
    sender: 'Balla Daniella',
    receiver: 'Vincze Nikolett',
  },
];

export const feedPost: PostCardProp[] = [
  {
    id: 1,
    title: 'Forehand domination at a pitch drill',
    description:
      'Learn essential tennis techniques as a pro coach breaks down form, footwork, and swing tips to boost your game. Perfect for beginners and intermediate players! 🎾️',
    views: '1.2k',
    media: {
      type: 'image',
      images: [
        '/images/posts/1.png',
        'https://images.unsplash.com/photo-1570498839593-e565b39455fc?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
    },
    profile: {
      image:
        'https://images.unsplash.com/photo-1695203063441-9042bcecbdf3?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Brooke Mason',
      last_active: new Date(new Date().getTime() - 23 * 60 * 1000),
    },
    category: 'Tennis',
    share: '36',
  },
  {
    id: 2,
    title: 'Forehand domination at a pitch drill',
    description:
      'Learn essential tennis techniques as a pro coach breaks down form, footwork, and swing tips to boost your game. Perfect for beginners and intermediate players! 🎾️',
    views: '1.2k',
    media: {
      type: 'image',
      images: [
        '/images/posts/2.png',
        'https://images.unsplash.com/photo-1570498839593-e565b39455fc?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
    },
    profile: {
      image:
        'https://images.unsplash.com/photo-1695203063441-9042bcecbdf3?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Brooke Mason',
      last_active: new Date(new Date().getTime() - 23 * 60 * 1000),
    },
    category: 'Tennis',
    share: '36',
  },
  {
    id: 3,
    title: 'Forehand domination at a pitch drill',
    description:
      'Learn essential tennis techniques as a pro coach breaks down form, footwork, and swing tips to boost your game. Perfect for beginners and intermediate players! 🎾️',
    views: '1.2k',
    media: {
      type: 'image',
      images: [
        '/images/posts/3.png',
        'https://images.unsplash.com/photo-1570498839593-e565b39455fc?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
    },
    profile: {
      image:
        'https://images.unsplash.com/photo-1695203063441-9042bcecbdf3?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Brooke Mason',
      last_active: new Date(new Date().getTime() - 23 * 60 * 1000),
    },
    category: 'Tennis',
    share: '36',
  },
  {
    id: 4,
    title: "Explosive Q's and power at its pitch lab",
    description: 'Shape your core 6 times 🔥',
    tags: ['football', 'EPL', 'derby', 'Turkish', 'kl8'],
    views: '1k',
    media: {
      type: 'video',
      src: '/videos/video.mp4',
      duration: '5:34',
    },
    profile: {
      image:
        'https://images.unsplash.com/photo-1695203063441-9042bcecbdf3?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Jonathan Baker',
      last_active: new Date(new Date().getTime() - 2 * 60 * 60 * 1000),
    },
    category: 'Basketball',
    share: '36',
  },
  {
    id: 5,
    title: 'Learn the rhythm in every mid-tempo strike',
    description: 'Strike the right rhythm 🎾',
    views: '1k',
    media: {
      type: 'video',
      src: '/videos/movie.mp4',
      duration: '5:34',
    },
    profile: {
      image:
        'https://images.unsplash.com/photo-1695203063441-9042bcecbdf3?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Jasmine Bell',
      last_active: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000),
    },
    category: 'Soccer',
    share: '36',
  },

  {
    id: 6,
    title: 'Learn how to ignite power at a beach',
    description: 'Key drills to quick on 5 waves',
    views: '1.5k',
    media: {
      type: 'video',
      src: '/videos/video-2.mp4',
      duration: '5:34',
    },
    profile: {
      image:
        'https://images.unsplash.com/photo-1695203063441-9042bcecbdf3?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Michelle James',
      last_active: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000),
    },
    category: 'Fitness',
    share: '36',
  },
  {
    id: 7,
    title: "Explosive Q's and power at its pitch lab",
    description: 'Shape your core 6 times 🔥',
    tags: ['football', 'EPL', 'derby', 'Turkish', 'kl8'],
    views: '1k',
    media: {
      type: 'video',
      src: '/videos/video.mp4',
      duration: '5:34',
    },
    profile: {
      image:
        'https://images.unsplash.com/photo-1695203063441-9042bcecbdf3?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Jonathan Baker',
      last_active: new Date(new Date().getTime() - 2 * 60 * 60 * 1000),
    },
    category: 'Basketball',
    share: '36',
  },
  {
    id: 8,
    title: "Explosive Q's and power at its pitch lab",
    description: 'Shape your core 6 times 🔥',
    tags: ['football', 'EPL', 'derby', 'Turkish', 'kl8'],
    views: '1k',
    media: {
      type: 'video',
      src: '/videos/video.mp4',
      duration: '5:34',
    },
    profile: {
      image:
        'https://images.unsplash.com/photo-1695203063441-9042bcecbdf3?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Jonathan Baker',
      last_active: new Date(new Date().getTime() - 2 * 60 * 60 * 1000),
    },
    category: 'Basketball',
    share: '36',
  },
  {
    id: 9,
    title: 'Forehand domination at a pitch drill',
    description:
      'Learn essential tennis techniques as a pro coach breaks down form, footwork, and swing tips to boost your game. Perfect for beginners and intermediate players! 🎾️',
    views: '1.2k',
    media: {
      type: 'image',
      images: [
        'https://images.unsplash.com/photo-1695203063441-9042bcecbdf3?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1570498839593-e565b39455fc?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
    },
    profile: {
      image:
        'https://images.unsplash.com/photo-1695203063441-9042bcecbdf3?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Brooke Mason',
      last_active: new Date(new Date().getTime() - 23 * 60 * 1000),
    },
    category: 'Tennis',
    share: '36',
    is_lock: true,
  },
  {
    id: 10,
    title: "Explosive Q's and power at its pitch lab",
    description: 'Shape your core 6 times 🔥',
    tags: ['football', 'EPL', 'derby', 'Turkish', 'kl8'],
    views: '1k',
    media: {
      type: 'video',
      src: '/videos/video.mp4',
      duration: '5:34',
    },
    profile: {
      image:
        'https://images.unsplash.com/photo-1695203063441-9042bcecbdf3?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Jonathan Baker',
      last_active: new Date(new Date().getTime() - 2 * 60 * 60 * 1000),
    },
    category: 'Basketball',
    share: '36',
  },
  {
    id: 11,
    title: 'Learn the rhythm in every mid-tempo strike',
    description: 'Strike the right rhythm 🎾',
    views: '1k',
    media: {
      type: 'video',
      src: '/videos/movie.mp4',
      duration: '5:34',
    },
    profile: {
      image:
        'https://images.unsplash.com/photo-1695203063441-9042bcecbdf3?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Jasmine Bell',
      last_active: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000),
    },
    category: 'Soccer',
    share: '36',
  },
  {
    id: 12,
    title: 'Learn how to ignite power at a beach',
    description: 'Key drills to quick on 5 waves',
    views: '1.5k',
    media: {
      type: 'video',
      src: '/videos/video-2.mp4',
      duration: '5:34',
    },
    profile: {
      image:
        'https://images.unsplash.com/photo-1695203063441-9042bcecbdf3?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Michelle James',
      last_active: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000),
    },
    category: 'Fitness',
    share: '36',
  },
  {
    id: 13,
    title: "Explosive Q's and power at its pitch lab",
    description: 'Shape your core 6 times 🔥',
    tags: ['football', 'EPL', 'derby', 'Turkish', 'kl8'],
    views: '1k',
    media: {
      type: 'video',
      src: '/videos/video.mp4',
      duration: '5:34',
    },
    profile: {
      image:
        'https://images.unsplash.com/photo-1695203063441-9042bcecbdf3?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Jonathan Baker',
      last_active: new Date(new Date().getTime() - 2 * 60 * 60 * 1000),
    },
    category: 'Basketball',
    share: '36',
  },
  {
    id: 14,
    title: "Explosive Q's and power at its pitch lab",
    description: 'Shape your core 6 times 🔥',
    tags: ['football', 'EPL', 'derby', 'Turkish', 'kl8'],
    views: '1k',
    media: {
      type: 'video',
      src: '/videos/video.mp4',
      duration: '5:34',
    },
    profile: {
      image:
        'https://images.unsplash.com/photo-1695203063441-9042bcecbdf3?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Jonathan Baker',
      last_active: new Date(new Date().getTime() - 2 * 60 * 60 * 1000),
    },
    category: 'Basketball',
    share: '36',
  },
  {
    id: 15,
    title: 'Forehand domination at a pitch drill',
    description:
      'Learn essential tennis techniques as a pro coach breaks down form, footwork, and swing tips to boost your game. Perfect for beginners and intermediate players! 🎾️',
    views: '1.2k',
    media: {
      type: 'image',
      images: [
        'https://images.unsplash.com/photo-1695203063441-9042bcecbdf3?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1570498839593-e565b39455fc?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
    },
    profile: {
      image:
        'https://images.unsplash.com/photo-1695203063441-9042bcecbdf3?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Brooke Mason',
      last_active: new Date(new Date().getTime() - 23 * 60 * 1000),
    },
    category: 'Tennis',
    share: '36',
  },
  {
    id: 16,
    title: "Explosive Q's and power at its pitch lab",
    description: 'Shape your core 6 times 🔥',
    tags: ['football', 'EPL', 'derby', 'Turkish', 'kl8'],
    views: '1k',
    media: {
      type: 'video',
      src: '/videos/video.mp4',
      duration: '5:34',
    },
    profile: {
      image:
        'https://images.unsplash.com/photo-1695203063441-9042bcecbdf3?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Jonathan Baker',
      last_active: new Date(new Date().getTime() - 2 * 60 * 60 * 1000),
    },
    category: 'Basketball',
    share: '36',
  },
  {
    id: 17,
    title: 'Learn the rhythm in every mid-tempo strike',
    description: 'Strike the right rhythm 🎾',
    views: '1k',
    media: {
      type: 'video',
      src: '/videos/movie.mp4',
      duration: '5:34',
    },
    profile: {
      image:
        'https://images.unsplash.com/photo-1695203063441-9042bcecbdf3?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Jasmine Bell',
      last_active: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000),
    },
    category: 'Soccer',
    share: '36',
  },
];

export const products: ProductCardProp[] = [
  {
    id: 1,
    name: 'Oversized Sport Jersey (Limited Addition)',
    price: 299,
    images: [
      {
        src: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        src: 'https://images.unsplash.com/photo-1759572095384-1a7e646d0d4f?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        src: 'https://images.unsplash.com/photo-1759572095317-3a96f9a98e2b?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        src: 'https://images.unsplash.com/photo-1713881604560-085594ed2c3d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        src: 'https://images.unsplash.com/photo-1713881649391-a1c8ddaf83cd?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        src: 'https://images.unsplash.com/photo-1740711152088-88a009e877bb?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
    description:
      'Step up your game in style with this premium oversized jersey, designed for ultimate comfort and a bold, street-ready look. Crafted from breathable, high-performance fabric, it blends athletic function with everyday fashion. Featuring exclusive limited-edition detailing, this jersey is a must-have for true fans and trendsetters alike.',
  },
  {
    id: 2,
    name: 'Hoodie',
    price: 320,
    images: [
      {
        src: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
    description: 'Drop Shoulder Full White T-Shirt',
  },
  {
    id: 3,
    name: 'Jacket',
    price: 320,
    images: [
      {
        src: 'https://images.unsplash.com/photo-1759572095384-1a7e646d0d4f?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
    description: 'Drop Shoulder Full White T-Shirt',
  },
  {
    id: 4,
    name: 'Cap',
    price: 320,
    images: [
      {
        src: 'https://images.unsplash.com/photo-1713881604560-085594ed2c3d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
    description: 'Drop Shoulder Full White T-Shirt',
  },
  {
    id: 5,
    name: 'Jersey',
    price: 320,
    images: [
      {
        src: 'https://images.unsplash.com/photo-1713881649391-a1c8ddaf83cd?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
    description: 'Drop Shoulder Full White T-Shirt',
  },
  {
    id: 6,
    name: 'Bag',
    price: 320,
    images: [
      {
        src: 'https://images.unsplash.com/photo-1740711152088-88a009e877bb?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
    description: 'Drop Shoulder Full White T-Shirt',
  },
  {
    id: 7,
    name: 'Outfit',
    price: 320,
    images: [
      {
        src: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
    description: 'Drop Shoulder Full White T-Shirt',
  },
  {
    id: 8,
    name: 'Outfit',
    price: 320,
    images: [
      {
        src: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
    description: 'Drop Shoulder Full White T-Shirt',
  },
  {
    id: 9,
    name: 'Outfit',
    price: 320,
    images: [
      {
        src: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
    description: 'Drop Shoulder Full White T-Shirt',
  },
];

export const SEARCH_ITEMS = [
  'Football',
  'Cricket',
  'Badminton',
  'Basketball',
  'Volleyball',
  'Table Tennis',
  'Tennis',
  'Hockey',
  'Rugby',
  'Baseball',

  'Swimming',
  'Swimming Coach',
  'Diving',
  'Water Polo',
  'Surfing',
  'Rowing',
  'Kayaking',
  'Canoeing',
  'Sailing',
  'Snorkeling',

  'Gym Trainer',
  'Personal Trainer',
  'Fitness Coach',
  'Strength Training',
  'Weight Lifting',
  'Bodybuilding',
  'CrossFit',
  'Functional Training',
  'HIIT Training',
  'Cardio Training',

  'Yoga',
  'Yoga Coach',
  'Power Yoga',
  'Hatha Yoga',
  'Vinyasa Yoga',
  'Ashtanga Yoga',
  'Pilates',
  'Meditation',
  'Mindfulness Training',
  'Breathing Exercises',

  'Martial Arts',
  'Karate',
  'Taekwondo',
  'Judo',
  'Kickboxing',
  'Muay Thai',
  'Boxing',
  'Wrestling',
  'Brazilian Jiu-Jitsu',
  'Self Defense',

  'Running',
  'Marathon Training',
  'Sprint Training',
  'Cycling',
  'Indoor Cycling',
  'Mountain Biking',
  'Skating',
  'Roller Skating',
  'Ice Skating',
  'Skateboarding',

  'Dance Fitness',
  'Zumba',
  'Aerobics',
  'Stretching',
  'Flexibility Training',
  'Rehabilitation Training',
  'Physiotherapy',
  'Sports Massage',
  'Athletic Conditioning',
  'Agility Training',
];
