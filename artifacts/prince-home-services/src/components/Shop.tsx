import { useState } from 'react';
import { ShoppingCart, Zap, Star, Search, ImageOff } from 'lucide-react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { useProducts } from '@/contexts/ProductContext';

const productColors = [
  'from-blue-500 to-blue-600',
  'from-orange-500 to-amber-500',
  'from-purple-500 to-violet-600',
  'from-green-500 to-emerald-500',
  'from-rose-500 to-pink-500',
  'from-teal-500 to-cyan-500',
  'from-indigo-500 to-blue-600',
  'from-yellow-500 to-orange-500',
];

const productIcons = ['🌀', '⚡', '💧', '🔧', '❄️', '💡', '🔌', '🏠', '🌡️', '📦', '⭐', '🛠️', '🔋', '🍽️'];

function ProductImage({ image, name, colorClass, icon }: { image?: string; name: string; colorClass: string; icon: string }) {
  const [imgError, setImgError] = useState(false);

  if (image && !imgError) {
    return (
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover"
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div className={`w-full h-full bg-gradient-to-br ${colorClass} flex items-center justify-center`}>
      <span className="text-6xl opacity-80">{icon}</span>
    </div>
  );
}

export default function Shop() {
  const { products } = useProducts();
  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const addToCart = (id: number, name: string) => {
    setCartItems((prev) => [...prev, id]);
    setNotification(`"${name}" added to cart!`);
    setTimeout(() => setNotification(null), 2500);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < Math.floor(rating) ? 'fill-orange-400 text-orange-400' : 'text-gray-300 dark:text-gray-600'}`}
      />
    ));
  };

  return (
    <div className="py-20 lg:py-28 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Toast notification */}
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-2xl shadow-xl text-sm font-medium"
          >
            {notification}
          </motion.div>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 dark:bg-orange-900/20 rounded-full text-sm font-medium text-orange-700 dark:text-orange-300 mb-4">
            <ShoppingCart className="w-4 h-4" />
            Online Shop
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            Genuine Products Delivered
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Order quality electronics and spare parts online. Delivered within 25 km of Gorakhpur, same or next day.
          </p>
        </motion.div>

        {/* Search & filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 space-y-4"
        >
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-2xl text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40 transition"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cart badge */}
        {cartItems.length > 0 && (
          <div className="flex justify-end mb-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-semibold shadow-lg">
              <ShoppingCart className="w-4 h-4" />
              {cartItems.length} item{cartItems.length > 1 ? 's' : ''} in cart
            </div>
          </div>
        )}

        {/* Products grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm mt-1">Try a different search or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 8) * 0.06 }}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all"
              >
                {/* Product image area */}
                <div className="relative h-44 overflow-hidden">
                  <ProductImage
                    image={product.image}
                    name={product.name}
                    colorClass={productColors[i % productColors.length]}
                    icon={productIcons[i % productIcons.length]}
                  />
                  {product.badge && (
                    <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 dark:bg-black/60 rounded-lg text-xs font-bold text-orange-600 dark:text-orange-400 shadow-sm">
                      {product.badge}
                    </div>
                  )}
                  {product.originalPrice > product.price && (
                    <div className="absolute top-3 right-3 px-2 py-1 bg-green-600/90 rounded-lg text-xs font-semibold text-white shadow-sm">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{product.category}</span>
                    <h3 className="font-semibold text-foreground text-sm mt-2 leading-snug line-clamp-2">{product.name}</h3>
                    <p className="text-muted-foreground text-xs mt-1 line-clamp-2">{product.desc}</p>
                  </div>

                  <div className="flex items-center gap-1">
                    {renderStars(product.rating)}
                    <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
                  </div>

                  <div className="flex items-end gap-2">
                    <span className="text-xl font-black text-foreground">₹{product.price.toLocaleString('en-IN')}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => addToCart(product.id, product.name)}
                      className="flex items-center justify-center gap-1.5 py-2 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Add Cart
                    </button>
                    <Link
                      href={product.slug ? `/checkout/${product.slug}` : '/store'}
                      className="flex items-center justify-center gap-1.5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold transition-colors"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      Buy Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground text-sm mt-10"
        >
          Delivery within 25 km of Gorakhpur. Call{' '}
          <a href="tel:+919793234755" className="text-primary font-medium hover:underline">+91 9793234755</a>{' '}
          to place a custom order.
        </motion.p>
      </div>
    </div>
  );
}
