export type StoreProduct = {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  originalPrice: number;
  image?: string;
  images?: string[];
  icon: string;
  features: string[];
  benefits: string[];
  whoFor: string[];
  availability: 'In stock' | 'Low stock' | 'Out of stock' | 'Pre-order';
  rating: number;
  reviews: number;
  faq: Array<{ q: string; a: string }>;
  testimonials: Array<{ name: string; quote: string; rating: number }>;
  brand?: string;
  warranty?: string;
  stock?: number;
  isFeatured?: boolean;
  isHidden?: boolean;
  discountPercent?: number;
  badge?: string;
};

export const STORE_PRODUCTS: StoreProduct[] = [
  {
    id: 1,
    name: 'Premium AC Maintenance Plan',
    slug: 'premium-ac-maintenance-plan',
    description: 'A complete annual service package for split and window AC units with doorstep visits, deep cleaning, and priority support.',
    category: 'Home Comfort',
    price: 2499,
    originalPrice: 3299,
    icon: '❄️',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596075780750-81249df16d19?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    ],
    features: ['2 seasonal visits', 'Deep coil and filter cleaning', 'Gas pressure check', 'Priority booking and support'],
    benefits: ['Better cooling efficiency', 'Reduced breakdown risk', 'Lower electricity bills', 'Hassle-free annual maintenance'],
    whoFor: ['Homeowners with 1–3 AC units', 'Small offices and retail stores', 'Families preparing for summer'],
    availability: 'In stock',
    brand: 'Havells',
    warranty: '1 year service warranty',
    stock: 12,
    isFeatured: true,
    discountPercent: 24,
    rating: 4.8,
    reviews: 184,
    faq: [
      { q: 'Does this include gas refill?', a: 'Gas refill is charged separately only if it is required after inspection.' },
      { q: 'How often are visits scheduled?', a: 'You receive 2 planned visits per year, one in summer and another before the cooling season.' },
    ],
    testimonials: [
      { name: 'Ritika S.', quote: 'The service was prompt and professional. My AC feels like new again.', rating: 5 },
      { name: 'Vivek P.', quote: 'The maintenance plan has saved me from repeated breakdowns.', rating: 5 },
    ],
  },
  {
    id: 2,
    name: 'Smart Water Purifier Installation',
    slug: 'smart-water-purifier-installation',
    description: 'Professional RO and water purifier setup with genuine filter replacement and same-day installation support.',
    category: 'Water Solutions',
    price: 1799,
    originalPrice: 2399,
    icon: '💧',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80',
    ],
    features: ['On-site installation', 'Original filter kit', 'Leak check and water pressure test', 'Warranty-backed setup'],
    benefits: ['Cleaner drinking water', 'Safe and leak-free setup', 'Longer purifier life', 'Expert guidance and support'],
    whoFor: ['New purifier buyers', 'Families switching to a new RO system', 'Office kitchens and shared spaces'],
    availability: 'In stock',
    brand: 'Kent',
    warranty: '6 months',
    stock: 6,
    isFeatured: true,
    discountPercent: 25,
    rating: 4.7,
    reviews: 142,
    faq: [
      { q: 'Can you install any brand?', a: 'Yes, we install most major RO and purifier brands at your location.' },
      { q: 'Is the filter kit included?', a: 'The genuine filter kit is included in the package price.' },
    ],
    testimonials: [
      { name: 'Meera K.', quote: 'Fast installation and the water tastes much better now.', rating: 5 },
      { name: 'Ashok D.', quote: 'Professional, neat, and the pricing was transparent.', rating: 4 },
    ],
  },
  {
    id: 3,
    name: 'Energy Efficient Ceiling Fan Upgrade',
    slug: 'energy-efficient-ceiling-fan-upgrade',
    description: 'Upgrade your home with premium BLDC ceiling fans that reduce electricity usage and deliver quieter airflow.',
    category: 'Electrical Essentials',
    price: 3299,
    originalPrice: 3999,
    icon: '🌀',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1597662598827-f0f8f4cc90f4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=800&q=80',
    ],
    features: ['Premium BLDC motor', 'Low-noise operation', 'Installation included', 'Warranty support'],
    benefits: ['Lower power consumption', 'Modern design upgrade', 'Quiet performance', 'Reliable after-sales support'],
    whoFor: ['Home renovation projects', 'Customers replacing old fans', 'Offices and community spaces'],
    availability: 'Low stock',
    brand: 'Orient',
    warranty: '2 years',
    stock: 3,
    isFeatured: true,
    discountPercent: 17,
    rating: 4.6,
    reviews: 98,
    faq: [
      { q: 'Do you provide installation service?', a: 'Yes, installation is included with every fan upgrade package.' },
      { q: 'How many fan options are available?', a: 'We offer multiple designs and airflow options to suit bedrooms, halls, and offices.' },
    ],
    testimonials: [
      { name: 'Nisha M.', quote: 'The fan is super quiet and the installation was neat.', rating: 5 },
      { name: 'Harish B.', quote: 'Great value for money and the energy savings are noticeable.', rating: 4 },
    ],
  },
  {
    id: 4,
    name: 'Appliance Installation & Setup',
    slug: 'appliance-installation-setup',
    description: 'A professional setup package for refrigerators, washing machines, geysers, and kitchen appliances with safe placement and testing.',
    category: 'Installation Services',
    price: 999,
    originalPrice: 1299,
    icon: '🔧',
    image: 'https://images.unsplash.com/photo-1516946870798-f970a32afc9f?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1516946870798-f970a32afc9f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6c0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80',
    ],
    features: ['Safe appliance placement', 'Water and power connection check', 'First-use testing', 'Cleanup and final walkthrough'],
    benefits: ['Avoid installation errors', 'Protect warranty', 'Save time and effort', 'Peace of mind after setup'],
    whoFor: ['New appliance buyers', 'Families moving into a new home', 'Customers upgrading to new machines'],
    availability: 'In stock',
    brand: 'Prince Home Services',
    warranty: 'Service guarantee',
    stock: 20,
    isFeatured: false,
    discountPercent: 23,
    rating: 4.9,
    reviews: 221,
    faq: [
      { q: 'Can I book this for a refrigerator?', a: 'Yes, the package covers refrigerators, washing machines, geysers, and similar appliances.' },
      { q: 'Is this available on weekends?', a: 'Yes, weekend availability is offered based on your local service slot.' },
    ],
    testimonials: [
      { name: 'Dinesh R.', quote: 'Exactly what we needed after moving into our new home.', rating: 5 },
      { name: 'Pooja T.', quote: 'The technician tested everything thoroughly before leaving.', rating: 5 },
    ],
  },
];

export function getStoreProductBySlug(slug: string) {
  return STORE_PRODUCTS.find((product) => product.slug === slug);
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}
