import { Link, useRoute } from 'wouter';
import { ArrowLeft, CreditCard, ShieldCheck, Sparkles } from 'lucide-react';
import { getStoreProductBySlug, formatPrice } from '@/data/storeProducts';

export default function CheckoutPage() {
  const [match, params] = useRoute('/checkout/:slug');
  const product = match ? getStoreProductBySlug(params.slug) : undefined;

  if (!product) {
    return (
      <div className="min-h-screen bg-background px-4 py-24 text-foreground">
        <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-10 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-500">Checkout unavailable</p>
          <h1 className="mt-3 text-3xl font-semibold">We could not find the item you want to purchase.</h1>
          <Link href="/store" className="mt-8 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">
            <ArrowLeft className="h-4 w-4" /> Back to store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-24 text-foreground">
      <div className="mx-auto max-w-6xl rounded-[32px] border border-border bg-card/80 p-6 shadow-2xl sm:p-10">
        <Link href={`/store/${product.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
          <ArrowLeft className="h-4 w-4" /> Back to product details
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-background/70 p-6">
              <div className="flex items-center gap-2 text-orange-500">
                <Sparkles className="h-5 w-5" />
                <p className="text-sm font-semibold uppercase tracking-[0.24em]">Checkout summary</p>
              </div>
              <h1 className="mt-4 text-3xl font-semibold">{product.name}</h1>
              <p className="mt-3 text-muted-foreground">{product.description}</p>
              <div className="mt-6 flex items-center justify-between rounded-2xl border border-border bg-card/70 p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Service price</p>
                  <p className="text-xl font-semibold text-foreground">{formatPrice(product.price)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Estimated delivery</p>
                  <p className="font-semibold text-foreground">Same day availability</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-background/70 p-6">
              <div className="flex items-center gap-2 text-blue-500">
                <CreditCard className="h-5 w-5" />
                <h2 className="font-semibold">Secure payment details</h2>
              </div>
              <div className="mt-4 rounded-2xl border border-dashed border-border p-4 text-sm text-muted-foreground">
                This demo checkout is designed for presentation. In a production setup, it would connect to a payment gateway and order management system.
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-green-500" />
                Secure booking and instant confirmation support.
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-background/70 p-6">
            <h2 className="text-xl font-semibold">Complete your booking</h2>
            <form className="mt-6 space-y-4">
              <input className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none ring-0" placeholder="Full name" />
              <input className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none ring-0" placeholder="Phone number" />
              <input className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none ring-0" placeholder="Email address" />
              <textarea className="min-h-28 w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none ring-0" placeholder="Service location or additional notes" />
              <button className="w-full rounded-2xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600">
                Confirm booking
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
