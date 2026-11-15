import { useState, ChangeEvent, useEffect } from 'react';
import { useProducts, Product } from '@/contexts/ProductContext';
import { BookingManager } from '@/components/admin/BookingManager';
import { getBookingStats, readBookings } from '@/components/admin/booking-data';
import { BUSINESS, saveBusinessSettings } from '@/data';
import { Plus, Pencil, Trash2, X, Save, RotateCcw, Upload, ImageOff, ShieldCheck, LogOut, ArrowLeft, Star, LayoutDashboard, Boxes, CalendarDays, Eye, EyeOff, Sparkles, ArrowUp, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'wouter';

// ── Change this password whenever you want ──────────────────────
const ADMIN_PASSWORD = 'prince@123';
const ADMIN_AUTH_KEY = 'phs-admin-auth';
// ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  'Ceiling Fans', 'Mixer Grinders', 'Water Purifiers', 'RO Filters',
  'AC Spare Parts', 'Washing Machine Parts', 'Geysers', 'Extension Boards',
  'LED Bulbs', 'Switches', 'Electrical Accessories', 'Small Home Appliances',
  'Other',
];

type FormState = Omit<Product, 'id'>;

const emptyForm: FormState = {
  name: '', category: 'Ceiling Fans', price: 0, originalPrice: 0,
  rating: 5, reviews: 0, desc: '', badge: '', image: '', images: [],
  brand: 'Prince Home Services', warranty: '12 months', stock: 10,
  availability: 'In stock', isFeatured: false, isHidden: false,
};

function ImageGalleryEditor({
  images,
  mainImage,
  onChange,
  onSelectMain,
}: {
  images: string[];
  mainImage?: string;
  onChange: (images: string[]) => void;
  onSelectMain: (value: string) => void;
}) {
  const [urlInput, setUrlInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const syncImages = (next: string[]) => {
    const normalized = next.filter(Boolean);
    onChange(normalized);
  };

  const addImage = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    syncImages([...images, trimmed]);
    setUrlInput('');
  };

  const handleFiles = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;
    setIsUploading(true);
    const results = await Promise.all(files.map((file) => new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = (ev) => resolve(ev.target?.result as string);
      reader.readAsDataURL(file);
    })));
    syncImages([...images, ...results.filter(Boolean)]);
    setIsUploading(false);
    event.target.value = '';
  };

  const removeImage = (index: number) => {
    const next = images.filter((_, itemIndex) => itemIndex !== index);
    syncImages(next);
    if (mainImage && next.length && !next.includes(mainImage)) {
      onSelectMain(next[0]);
    }
  };

  const moveImage = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= images.length) return;
    const next = [...images];
    const [item] = next.splice(index, 1);
    next.splice(targetIndex, 0, item);
    syncImages(next);
  };

  return (
    <div className="space-y-3 rounded-2xl border border-border bg-background/70 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">Product gallery</p>
          <p className="text-xs text-muted-foreground">Upload multiple images and choose the primary cover image.</p>
        </div>
        <div className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-300">
          {images.length} image{images.length === 1 ? '' : 's'}
        </div>
      </div>

      {images.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <div key={`${image}-${index}`} className="rounded-2xl border border-border bg-card p-2">
              <img src={image} alt={`gallery-${index + 1}`} className="h-28 w-full rounded-xl object-cover" />
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <button type="button" onClick={() => onSelectMain(image)} className={`rounded-full px-2.5 py-1 text-xs font-semibold ${mainImage === image ? 'bg-blue-600 text-white' : 'bg-muted text-foreground'}`}>
                  {mainImage === image ? 'Primary' : 'Set main'}
                </button>
                <button type="button" onClick={() => moveImage(index, -1)} className="rounded-full border border-border p-1 text-muted-foreground hover:bg-muted">
                  <ArrowUp className="h-3.5 w-3.5" />
                </button>
                <button type="button" onClick={() => moveImage(index, 1)} className="rounded-full border border-border p-1 text-muted-foreground hover:bg-muted">
                  <ArrowDown className="h-3.5 w-3.5" />
                </button>
                <button type="button" onClick={() => removeImage(index)} className="rounded-full border border-red-200 p-1 text-red-600 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/30">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-24 items-center justify-center rounded-2xl border border-dashed border-border bg-card text-center text-sm text-muted-foreground">
          <div>
            <ImageOff className="mx-auto mb-2 h-6 w-6 opacity-50" />
            <p>No gallery images yet.</p>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2 sm:flex-row">
        <input type="url" value={urlInput} onChange={(event) => setUrlInput(event.target.value)} placeholder="https://example.com/image.jpg" className="flex-1 rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none" />
        <button type="button" onClick={addImage} className="rounded-xl border border-border px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted">
          Add URL
        </button>
        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
          <Upload className="h-4 w-4" />
          {isUploading ? 'Uploading...' : 'Upload files'}
          <input type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
        </label>
      </div>
    </div>
  );
}

function ProductForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: FormState;
  onSave: (f: FormState) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<FormState>(initial);

  const set = (k: keyof FormState, v: string | number | boolean | string[]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price) return;
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product Name *</label>
          <input
            required
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="e.g. Havells Stealth Ceiling Fan"
            className="w-full px-3 py-2 border border-border rounded-xl bg-card text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40 text-sm"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category *</label>
          <select
            value={form.category}
            onChange={(e) => set('category', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-xl bg-card text-foreground outline-none focus:ring-2 focus:ring-primary/40 text-sm"
          >
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Badge */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Badge (optional)</label>
          <input
            value={form.badge}
            onChange={(e) => set('badge', e.target.value)}
            placeholder="e.g. Bestseller, Top Rated"
            className="w-full px-3 py-2 border border-border rounded-xl bg-card text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40 text-sm"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Selling Price (₹) *</label>
          <input
            required
            type="number"
            min={0}
            value={form.price || ''}
            onChange={(e) => set('price', Number(e.target.value))}
            placeholder="1999"
            className="w-full px-3 py-2 border border-border rounded-xl bg-card text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40 text-sm"
          />
        </div>

        {/* Original price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Original / MRP (₹)</label>
          <input
            type="number"
            min={0}
            value={form.originalPrice || ''}
            onChange={(e) => set('originalPrice', Number(e.target.value))}
            placeholder="2500 (for discount %)"
            className="w-full px-3 py-2 border border-border rounded-xl bg-card text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40 text-sm"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rating (1–5)</label>
          <input
            type="number"
            min={1}
            max={5}
            step={0.1}
            value={form.rating}
            onChange={(e) => set('rating', Number(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-xl bg-card text-foreground outline-none focus:ring-2 focus:ring-primary/40 text-sm"
          />
        </div>

        {/* Reviews */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of Reviews</label>
          <input
            type="number"
            min={0}
            value={form.reviews}
            onChange={(e) => set('reviews', Number(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-xl bg-card text-foreground outline-none focus:ring-2 focus:ring-primary/40 text-sm"
          />
        </div>

        {/* Description */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Short Description</label>
          <textarea
            rows={2}
            value={form.desc}
            onChange={(e) => set('desc', e.target.value)}
            placeholder="Brief description of the product..."
            className="w-full px-3 py-2 border border-border rounded-xl bg-card text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40 text-sm resize-none"
          />
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Brand</label>
          <input
            value={form.brand || ''}
            onChange={(e) => set('brand', e.target.value)}
            placeholder="Prince Home Services"
            className="w-full px-3 py-2 border border-border rounded-xl bg-card text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40 text-sm"
          />
        </div>

        {/* Warranty */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Warranty</label>
          <input
            value={form.warranty || ''}
            onChange={(e) => set('warranty', e.target.value)}
            placeholder="12 months"
            className="w-full px-3 py-2 border border-border rounded-xl bg-card text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40 text-sm"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stock</label>
          <input
            type="number"
            min={0}
            value={form.stock ?? 0}
            onChange={(e) => set('stock', Number(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-xl bg-card text-foreground outline-none focus:ring-2 focus:ring-primary/40 text-sm"
          />
        </div>

        {/* Availability */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Availability</label>
          <input
            value={form.availability || ''}
            onChange={(e) => set('availability', e.target.value)}
            placeholder="In stock"
            className="w-full px-3 py-2 border border-border rounded-xl bg-card text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40 text-sm"
          />
        </div>

        {/* Visibility toggles */}
        <div className="sm:col-span-2 flex flex-wrap gap-3 rounded-2xl border border-border bg-background/60 p-3">
          <label className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm text-foreground">
            <input type="checkbox" checked={!!form.isFeatured} onChange={(e) => set('isFeatured', e.target.checked)} />
            <Sparkles className="h-4 w-4 text-amber-500" />
            Featured product
          </label>
          <label className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm text-foreground">
            <input type="checkbox" checked={!!form.isHidden} onChange={(e) => set('isHidden', e.target.checked)} />
            {form.isHidden ? <EyeOff className="h-4 w-4 text-slate-500" /> : <Eye className="h-4 w-4 text-emerald-500" />}
            Hidden from store
          </label>
        </div>

        {/* Image */}
        <div className="sm:col-span-2">
          <ImageGalleryEditor
            images={form.images ?? []}
            mainImage={form.image}
            onChange={(images) => {
              set('images', images);
              if (images.length) {
                set('image', images[0]);
              } else {
                set('image', '');
              }
            }}
            onSelectMain={(value) => set('image', value)}
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 transition"
        >
          <Save className="w-4 h-4" />
          Save Product
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 border border-border rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function Admin() {
  const { products, addProduct, updateProduct, deleteProduct, resetToDefaults } = useProducts();
  const [authed, setAuthed] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  });
  const [pwInput, setPwInput] = useState('');
  const [pwError, setPwError] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [activeView, setActiveView] = useState<'dashboard' | 'products' | 'settings'>('dashboard');
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [settingsDraft, setSettingsDraft] = useState(() => ({
    name: BUSINESS.name,
    phone: BUSINESS.phone,
    whatsapp: BUSINESS.whatsappRaw,
    email: BUSINESS.email,
    address: BUSINESS.address,
    maps: BUSINESS.maps,
    social: { ...BUSINESS.social },
    hours: { ...BUSINESS.hours },
  }));
  const [, setLocation] = useLocation();
  const bookingStats = getBookingStats(readBookings());

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (authed) {
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
    }
  }, [authed]);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwInput === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
      setAuthed(true);
      setPwError(false);
      setPwInput('');
      setLocation('/admin');
    } else {
      setPwError(true);
    }
  };

  const logout = () => {
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
    setAuthed(false);
    setPwInput('');
    setPwError(false);
    setLocation('/');
  };

  const saveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveBusinessSettings(settingsDraft);
    setSettingsSaved(true);
    window.setTimeout(() => setSettingsSaved(false), 1800);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-900 rounded-3xl p-8 w-full max-w-sm shadow-2xl"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Prince Home Services</p>
          </div>
          <form onSubmit={login} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <input
                type="password"
                value={pwInput}
                onChange={(e) => { setPwInput(e.target.value); setPwError(false); }}
                placeholder="Enter admin password"
                className={`w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none transition text-sm ${pwError ? 'border-red-400 focus:ring-2 focus:ring-red-300' : 'border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-300'}`}
              />
              {pwError && <p className="text-red-500 text-xs mt-1">Incorrect password. Try again.</p>}
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition text-sm"
            >
              Sign In
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to website
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const editingProduct = products.find((p) => p.id === editingId);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Top bar */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">Admin Dashboard</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">Prince Home Services Operations</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/">
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Website</span>
              </button>
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-red-300 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Operations Center</p>
              <h2 className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">Keep your service business moving.</h2>
              <p className="mt-2 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Monitor bookings, update request status, and manage your product catalog in one place.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveView('dashboard')}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${activeView === 'dashboard' ? 'bg-blue-600 text-white shadow-sm' : 'border border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800'}`}
              >
                <LayoutDashboard className="h-4 w-4" /> Overview
              </button>
              <button
                onClick={() => setActiveView('products')}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${activeView === 'products' ? 'bg-blue-600 text-white shadow-sm' : 'border border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800'}`}
              >
                <Boxes className="h-4 w-4" /> Products
              </button>
              <button
                onClick={() => setActiveView('settings')}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${activeView === 'settings' ? 'bg-blue-600 text-white shadow-sm' : 'border border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800'}`}
              >
                <ShieldCheck className="h-4 w-4" /> Settings
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/60">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Products</p>
                <Boxes className="h-4 w-4 text-blue-600" />
              </div>
              <p className="mt-4 text-3xl font-semibold text-gray-900 dark:text-white">{products.length}</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/60">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</p>
                <CalendarDays className="h-4 w-4 text-amber-600" />
              </div>
              <p className="mt-4 text-3xl font-semibold text-gray-900 dark:text-white">{bookingStats.pending}</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/60">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed</p>
                <CalendarDays className="h-4 w-4 text-emerald-600" />
              </div>
              <p className="mt-4 text-3xl font-semibold text-gray-900 dark:text-white">{bookingStats.completed}</p>
            </div>
          </div>
        </div>

        {activeView === 'dashboard' ? (
          <BookingManager />
        ) : activeView === 'settings' ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Business Settings</p>
                <h2 className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">Update your public contact details</h2>
              </div>
              {settingsSaved && (
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-300">Saved</span>
              )}
            </div>

            <form onSubmit={saveSettings} className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <span>Business Name</span>
                <input
                  value={settingsDraft.name}
                  onChange={(e) => setSettingsDraft((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none dark:border-gray-700 dark:bg-gray-800"
                />
              </label>
              <label className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <span>Phone Number</span>
                <input
                  value={settingsDraft.phone}
                  onChange={(e) => setSettingsDraft((prev) => ({ ...prev, phone: e.target.value }))}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none dark:border-gray-700 dark:bg-gray-800"
                />
              </label>
              <label className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <span>WhatsApp Number</span>
                <input
                  value={settingsDraft.whatsapp}
                  onChange={(e) => setSettingsDraft((prev) => ({ ...prev, whatsapp: e.target.value }))}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none dark:border-gray-700 dark:bg-gray-800"
                />
              </label>
              <label className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <span>Email</span>
                <input
                  value={settingsDraft.email}
                  onChange={(e) => setSettingsDraft((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none dark:border-gray-700 dark:bg-gray-800"
                />
              </label>
              <label className="space-y-1 text-sm text-gray-700 dark:text-gray-300 md:col-span-2">
                <span>Address</span>
                <input
                  value={settingsDraft.address}
                  onChange={(e) => setSettingsDraft((prev) => ({ ...prev, address: e.target.value }))}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none dark:border-gray-700 dark:bg-gray-800"
                />
              </label>
              <label className="space-y-1 text-sm text-gray-700 dark:text-gray-300 md:col-span-2">
                <span>Google Maps Link</span>
                <input
                  value={settingsDraft.maps}
                  onChange={(e) => setSettingsDraft((prev) => ({ ...prev, maps: e.target.value }))}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none dark:border-gray-700 dark:bg-gray-800"
                />
              </label>
              <label className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <span>Business Hours (Weekdays)</span>
                <input
                  value={settingsDraft.hours.weekdays}
                  onChange={(e) => setSettingsDraft((prev) => ({ ...prev, hours: { ...prev.hours, weekdays: e.target.value } }))}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none dark:border-gray-700 dark:bg-gray-800"
                />
              </label>
              <label className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <span>Business Hours (Sunday)</span>
                <input
                  value={settingsDraft.hours.sunday}
                  onChange={(e) => setSettingsDraft((prev) => ({ ...prev, hours: { ...prev.hours, sunday: e.target.value } }))}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none dark:border-gray-700 dark:bg-gray-800"
                />
              </label>
              <label className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <span>Facebook</span>
                <input
                  value={settingsDraft.social.facebook}
                  onChange={(e) => setSettingsDraft((prev) => ({ ...prev, social: { ...prev.social, facebook: e.target.value } }))}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none dark:border-gray-700 dark:bg-gray-800"
                />
              </label>
              <label className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <span>Instagram</span>
                <input
                  value={settingsDraft.social.instagram}
                  onChange={(e) => setSettingsDraft((prev) => ({ ...prev, social: { ...prev.social, instagram: e.target.value } }))}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none dark:border-gray-700 dark:bg-gray-800"
                />
              </label>
              <label className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <span>Twitter</span>
                <input
                  value={settingsDraft.social.twitter}
                  onChange={(e) => setSettingsDraft((prev) => ({ ...prev, social: { ...prev.social, twitter: e.target.value } }))}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none dark:border-gray-700 dark:bg-gray-800"
                />
              </label>
              <label className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <span>YouTube</span>
                <input
                  value={settingsDraft.social.youtube}
                  onChange={(e) => setSettingsDraft((prev) => ({ ...prev, social: { ...prev.social, youtube: e.target.value } }))}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none dark:border-gray-700 dark:bg-gray-800"
                />
              </label>

              <div className="md:col-span-2 flex items-center justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  <Save className="h-4 w-4" /> Save Changes
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm">
                  <span className="font-bold text-blue-600 text-lg">{products.length}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1.5">products</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setConfirmReset(true)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-600 dark:text-gray-400 hover:border-orange-300 hover:text-orange-600 transition"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset to defaults
                </button>
                <button
                  onClick={() => { setShowAdd(true); setEditingId(null); }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Product
                </button>
              </div>
            </div>

            <AnimatePresence>
              {showAdd && (
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="bg-white dark:bg-gray-900 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 shadow-sm"
                >
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5">Add New Product</h2>
                  <ProductForm
                    initial={emptyForm}
                    onSave={(f) => { addProduct(f); setShowAdd(false); }}
                    onCancel={() => setShowAdd(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {confirmReset && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                >
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">Reset all products?</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">This will replace all your products with the original defaults. This cannot be undone.</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => { resetToDefaults(); setConfirmReset(false); }}
                        className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold transition"
                      >
                        Yes, reset
                      </button>
                      <button
                        onClick={() => setConfirmReset(false)}
                        className="flex-1 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 gap-4">
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, delay: i * 0.03 }}
                  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden"
                >
                  {editingId === product.id ? (
                    <div className="p-6">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-5">Editing: {product.name}</h3>
                      <ProductForm
                        initial={product}
                        onSave={(f) => { updateProduct({ ...f, id: product.id }); setEditingId(null); }}
                        onCancel={() => setEditingId(null)}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-4 p-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl">📦</div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-0.5">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">{product.name}</h3>
                          {product.badge && (
                            <span className="px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs rounded-full font-medium">{product.badge}</span>
                          )}
                          {product.isFeatured && (
                            <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs rounded-full font-medium">Featured</span>
                          )}
                          {product.isHidden && (
                            <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded-full font-medium">Hidden</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{product.category} • {product.brand || 'Prince Home Services'}</p>
                        <div className="flex flex-wrap items-center gap-3 mt-1">
                          <span className="text-sm font-bold text-gray-900 dark:text-white">₹{product.price.toLocaleString('en-IN')}</span>
                          {product.originalPrice > product.price && (
                            <span className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                          )}
                          <span className="flex items-center gap-0.5 text-xs text-amber-500">
                            <Star className="w-3 h-3 fill-amber-400" /> {product.rating}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">Stock: {product.stock ?? 0}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{product.availability || 'In stock'}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => { setEditingId(product.id); setShowAdd(false); }}
                          className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:border-blue-300 transition"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setConfirmDelete(product.id)}
                          className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-red-600 hover:border-red-300 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  <AnimatePresence>
                    {confirmDelete === product.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 px-4 py-3 flex items-center justify-between gap-4"
                      >
                        <p className="text-sm text-red-700 dark:text-red-400">Delete <strong>{product.name}</strong>?</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => { deleteProduct(product.id); setConfirmDelete(null); }}
                            className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-xs font-semibold transition"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => setConfirmDelete(null)}
                            className="px-4 py-1.5 border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800 transition"
                          >
                            Cancel
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
