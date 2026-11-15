import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { PRODUCTS } from '@/data';
import { STORE_PRODUCTS, type StoreProduct } from '@/data/storeProducts';

export type ProductAvailability = 'In stock' | 'Low stock' | 'Out of stock' | 'Pre-order';

export type Product = {
  id: number;
  slug?: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  desc: string;
  badge: string;
  image?: string; // URL or base64
  images?: string[];
  brand?: string;
  warranty?: string;
  stock?: number;
  availability?: ProductAvailability;
  isFeatured?: boolean;
  isHidden?: boolean;
  discountPercent?: number;
};

type ProductContextType = {
  products: Product[];
  addProduct: (p: Omit<Product, 'id'>) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: number) => void;
  resetToDefaults: () => void;
};

const ProductContext = createContext<ProductContextType | null>(null);
const STORAGE_KEY = 'phs_products_v1';

function createSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'product';
}

function normalizeProduct(product: Partial<Product> & Pick<Product, 'name' | 'category' | 'price' | 'originalPrice' | 'rating' | 'reviews' | 'desc' | 'badge'> & { id?: number }): Product {
  const images = Array.isArray(product.images) && product.images.length
    ? product.images.filter(Boolean)
    : (product.image ? [product.image] : []);
  const mainImage = product.image || images[0] || '';
  const stock = typeof product.stock === 'number' ? product.stock : 10;
  let availability = product.availability;
  if (!availability) {
    availability = stock <= 0 ? 'Out of stock' : stock <= 3 ? 'Low stock' : 'In stock';
  }
  const price = typeof product.price === 'number' ? product.price : 0;
  const originalPrice = typeof product.originalPrice === 'number' ? product.originalPrice : price;
  const discountPercent = typeof product.discountPercent === 'number'
    ? product.discountPercent
    : originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  return {
    id: product.id ?? Date.now(),
    slug: product.slug || createSlug(product.name),
    name: product.name || 'Untitled product',
    category: product.category || 'General',
    price,
    originalPrice,
    rating: typeof product.rating === 'number' ? product.rating : 5,
    reviews: typeof product.reviews === 'number' ? product.reviews : 0,
    desc: product.desc || '',
    badge: product.badge || '',
    image: mainImage,
    images,
    brand: product.brand || 'Prince Home Services',
    warranty: product.warranty || '12 months',
    stock,
    availability,
    isFeatured: Boolean(product.isFeatured),
    isHidden: Boolean(product.isHidden),
    discountPercent,
  };
}

function createSeedProducts(): Product[] {
  return STORE_PRODUCTS.map((item: StoreProduct, index: number) => normalizeProduct({
    ...item,
    id: index + 1,
    slug: item.slug,
    name: item.name,
    category: item.category,
    price: item.price,
    originalPrice: item.originalPrice,
    rating: item.rating,
    reviews: item.reviews,
    desc: item.description,
    badge: item.badge || '',
    image: item.image,
    images: item.images?.length ? item.images : (item.image ? [item.image] : []),
    brand: item.brand,
    warranty: item.warranty,
    stock: item.stock,
    availability: item.availability,
    isFeatured: item.isFeatured,
    isHidden: item.isHidden,
    discountPercent: item.discountPercent,
  }));
}

function readStoredProducts(): Product[] {
  if (typeof window === 'undefined') return createSeedProducts();

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return createSeedProducts();
    const parsed = JSON.parse(stored) as Array<Partial<Product>>;
    return Array.isArray(parsed) ? parsed.map((item) => normalizeProduct(item as Partial<Product> & Pick<Product, 'name' | 'category' | 'price' | 'originalPrice' | 'rating' | 'reviews' | 'desc' | 'badge'>)) : createSeedProducts();
  } catch {
    return createSeedProducts();
  }
}

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => readStoredProducts());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch {
      // localStorage full (base64 images take space)
      console.warn('localStorage full — product images may not save');
    }
  }, [products]);

  const addProduct = (p: Omit<Product, 'id'>) => {
    setProducts(prev => [normalizeProduct({ ...p, id: Date.now() }), ...prev]);
  };

  const updateProduct = (p: Product) => {
    setProducts(prev => prev.map(x => x.id === p.id ? normalizeProduct(p) : x));
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(x => x.id !== id));
  };

  const resetToDefaults = () => {
    const defaults = createSeedProducts();
    setProducts(defaults);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, resetToDefaults }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProducts must be used within ProductProvider');
  return ctx;
}
