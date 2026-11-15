import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, BadgeCheck, Sparkles, MessageCircle, Phone, Star, ShieldCheck, PackageOpen, TrendingUp, Search } from 'lucide-react';
import { STORE_PRODUCTS, formatPrice } from '@/data/storeProducts';
import { useProducts } from '@/contexts/ProductContext';

export default function StorePage() {
  const { products } = useProducts();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();
    return products.filter((product) => {
      const matchesCategory = category === 'All' || product.category === category;
      const matchesQuery = !normalizedQuery || [product.name, product.category, product.desc, product.brand].filter(Boolean).join(' ').toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery && !product.isHidden;
    });
  }, [category, products, query]);

  const categories = useMemo(() => ['All', ...Array.from(new Set(products.map((product) => product.category)))], [products]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-300">
                <Sparkles className="h-4 w-4" />
                Premium home service solutions
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  Shop trusted home essentials and service plans.
                </h1>
                <p className="max-w-2xl text-lg text-muted-foreground">
                  From AC maintenance to purifier setup and installation support, our store helps you book reliable services in one place.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600">
                  Back to homepage <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="/#contact" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 font-semibold text-foreground hover:bg-muted">
                  Contact us
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card/80 p-8 shadow-xl backdrop-blur">
              <div className="flex items-center gap-3 text-sm font-semibold text-foreground">
                <BadgeCheck className="h-5 w-5 text-green-500" />
                Why customers choose Prince Home Services
              </div>
              <div className="mt-6 space-y-4">
                {[
                  'Same-day support in and around Mahadeva Bazar',
                  'Transparent pricing and genuine parts',
                  'Expert technicians with warranty-backed service',
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-border/70 bg-background/70 p-4 text-sm text-muted-foreground">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-500">Featured offers</p>
              <h2 className="text-2xl font-semibold">Premium products and service plans</h2>
            </div>
            <p className="text-sm text-muted-foreground">Every listing is designed for quick decisions, strong trust, and future-ready store management.</p>
          </div>

          <div className="mb-8 flex flex-col gap-4 rounded-[28px] border border-border bg-card/80 p-4 shadow-sm md:flex-row md:items-center md:justify-between md:p-6">
            <label className="flex flex-1 items-center gap-2 rounded-2xl border border-border bg-background/70 px-4 py-3 text-sm text-muted-foreground">
              <Search className="h-4 w-4" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by product, brand or category" className="w-full bg-transparent outline-none" />
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((item) => (
                <button key={item} onClick={() => setCategory(item)} className={`rounded-full px-3 py-2 text-sm font-medium transition ${category === item ? 'bg-blue-600 text-white' : 'border border-border text-muted-foreground hover:bg-muted'}`}>
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {visibleProducts.map((product) => (
              <article key={product.id} className="group flex flex-col overflow-hidden rounded-[28px] border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative overflow-hidden">
                  <img src={product.image || ''} alt={product.name} className="h-48 w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/60 bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
                    {product.category}
                  </div>
                  {product.discountPercent ? (
                    <div className="absolute right-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                      {product.discountPercent}% OFF
                    </div>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-blue-600">
                        <ShieldCheck className="h-3.5 w-3.5" /> {product.brand || 'Prince Home Services'}
                      </div>
                      <h3 className="mt-2 text-lg font-semibold text-foreground">{product.name}</h3>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${product.availability === 'Out of stock' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400' : product.availability === 'Low stock' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'}`}>
                      {product.availability}
                    </span>
                  </div>
                  <p className="mb-4 text-sm leading-6 text-muted-foreground">{product.desc}</p>
                  <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1 font-semibold text-foreground"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {product.rating}</span>
                    <span>• {product.reviews} reviews</span>
                    <span>• {product.stock ?? 0} in stock</span>
                  </div>
                  <div className="mb-6 flex items-end gap-2">
                    <span className="text-2xl font-semibold text-foreground">{formatPrice(product.price)}</span>
                    {product.originalPrice > product.price && (<span className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>)}
                  </div>
                  <div className="mt-auto flex flex-col gap-2 sm:flex-row">
                    <Link href={`/store/${product.slug}`} className="flex-1 rounded-2xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700">
                      View details
                    </Link>
                    <a href="https://wa.me/919793234755?text=Hi%20Prince%20Home%20Services%2C%20I%20would%20like%20to%20place%20an%20order%20for%20this%20product" className="flex items-center justify-center gap-2 rounded-2xl border border-border px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-muted">
                      <MessageCircle className="h-4 w-4" /> WhatsApp
                    </a>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a href="tel:+919793234755" className="flex items-center gap-2 rounded-2xl border border-border px-3 py-2 text-sm font-semibold text-foreground transition hover:bg-muted">
                      <Phone className="h-4 w-4" /> Call Now
                    </a>
                    <Link href={`/checkout/${product.slug}`} className="flex items-center gap-2 rounded-2xl bg-orange-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-orange-600">
                      <TrendingUp className="h-4 w-4" /> Buy Now
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
