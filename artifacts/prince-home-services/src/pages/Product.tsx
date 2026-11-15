import { useState } from 'react';
import { Link, useRoute } from 'wouter';
import { ArrowLeft, CheckCircle2, ShieldCheck, Star, MessageCircle, Phone, PackageOpen, TrendingUp } from 'lucide-react';
import { getStoreProductBySlug, formatPrice } from '@/data/storeProducts';

export default function ProductPage() {
  const [match, params] = useRoute('/store/:slug');
  const product = match ? getStoreProductBySlug(params.slug) : undefined;
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-background px-4 py-24 text-foreground">
        <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-10 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-500">Product unavailable</p>
          <h1 className="mt-3 text-3xl font-semibold">We could not find that product.</h1>
          <p className="mt-4 text-muted-foreground">Please return to the store and pick another solution.</p>
          <Link href="/store" className="mt-8 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">
            <ArrowLeft className="h-4 w-4" /> Browse store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link href="/store" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
            <ArrowLeft className="h-4 w-4" /> Back to shop
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <div className="overflow-hidden rounded-[32px] border border-border bg-card shadow-sm">
                <img src={(product.images?.[activeImage] || product.image) as string} alt={product.name} className="h-80 w-full object-cover sm:h-[420px]" />
                {product.images && product.images.length > 1 ? (
                  <div className="grid grid-cols-3 gap-2 border-t border-border bg-background/60 p-3">
                    {product.images.map((image, index) => (
                      <button key={image} onClick={() => setActiveImage(index)} className={`overflow-hidden rounded-2xl border ${activeImage === index ? 'border-blue-500' : 'border-transparent'}`}>
                        <img src={image} alt={`${product.name} ${index + 1}`} className="h-20 w-full object-cover" />
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="rounded-[32px] border border-border bg-card p-8 shadow-sm">
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-300">
                  {product.category}
                </div>
                <h1 className="mt-5 text-4xl font-semibold tracking-tight">{product.name}</h1>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">{product.description}</p>

                <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-background/60 p-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-semibold text-foreground">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{product.reviews} happy customers</span>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400">{product.availability}</span>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {product.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3 rounded-2xl border border-border bg-background/70 p-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[32px] border border-border bg-card p-8 shadow-sm">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-500">Special offer</p>
                    <p className="mt-2 text-3xl font-semibold text-foreground">{formatPrice(product.price)}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-sm font-semibold ${product.availability === 'Out of stock' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400' : product.availability === 'Low stock' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'}`}>
                    {product.availability}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">Original price {formatPrice(product.originalPrice)}</p>
                <div className="mt-6 grid gap-3">
                  <Link href={`/checkout/${product.slug}`} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600">
                    <TrendingUp className="h-4 w-4" /> Buy Now
                  </Link>
                  <a href="https://wa.me/919793234755?text=Hi%20Prince%20Home%20Services%2C%20I%20would%20like%20to%20place%20an%20order%20for%20this%20product" className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border px-5 py-3 font-semibold text-foreground transition hover:bg-muted">
                    <MessageCircle className="h-4 w-4" /> WhatsApp Order
                  </a>
                  <a href="tel:+919793234755" className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border px-5 py-3 font-semibold text-foreground transition hover:bg-muted">
                    <Phone className="h-4 w-4" /> Call Now
                  </a>
                </div>
              </div>

              <div className="rounded-[32px] border border-border bg-card p-8 shadow-sm">
                <div className="flex items-center gap-2 text-foreground">
                  <ShieldCheck className="h-5 w-5 text-blue-500" />
                  <h2 className="font-semibold">Product details</h2>
                </div>
                <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between rounded-2xl bg-background/70 px-4 py-3"><span>Brand</span><span className="font-semibold text-foreground">{product.brand || 'Prince Home Services'}</span></div>
                  <div className="flex items-center justify-between rounded-2xl bg-background/70 px-4 py-3"><span>Warranty</span><span className="font-semibold text-foreground">{product.warranty || '12 months'}</span></div>
                  <div className="flex items-center justify-between rounded-2xl bg-background/70 px-4 py-3"><span>Stock</span><span className="font-semibold text-foreground">{product.stock ?? 0} units</span></div>
                  <div className="flex items-center justify-between rounded-2xl bg-background/70 px-4 py-3"><span>Availability</span><span className="font-semibold text-foreground">{product.availability}</span></div>
                </div>
              </div>

              <div className="rounded-[32px] border border-border bg-card p-8 shadow-sm">
                <div className="flex items-center gap-2 text-foreground">
                  <PackageOpen className="h-5 w-5 text-blue-500" />
                  <h2 className="font-semibold">Why this works well</h2>
                </div>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  {product.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
