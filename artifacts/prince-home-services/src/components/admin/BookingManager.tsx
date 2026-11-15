import { useMemo, useState } from 'react';
import { CalendarDays, CheckCircle2, Clock3, Search, Trash2, PencilLine, X, Save } from 'lucide-react';
import type { Booking, BookingFilters, BookingStatus } from './booking-types';
import { createBookingDraft, getBookingStats, readBookings, updateBookingStatus, writeBookings } from './booking-data';

const STATUS_OPTIONS: BookingStatus[] = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];

function formatDate(value: string) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatTimestamp(value: string) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
}

function Badge({ status }: { status: BookingStatus }) {
  const styles: Record<BookingStatus, string> = {
    Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    Confirmed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    Completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    Cancelled: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
  };

  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status]}`}>{status}</span>;
}

export function BookingManager() {
  const [bookings, setBookings] = useState<Booking[]>(() => readBookings());
  const [filters, setFilters] = useState<BookingFilters>({ search: '', status: 'All' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState<Omit<Booking, 'id' | 'timestamp'>>(createBookingDraft());
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const stats = useMemo(() => getBookingStats(bookings), [bookings]);

  const filtered = useMemo(() => {
    const search = filters.search.toLowerCase();
    return bookings.filter((booking) => {
      const matchesStatus = filters.status === 'All' || booking.status === filters.status;
      const haystack = `${booking.customerName} ${booking.phone} ${booking.service} ${booking.address}`.toLowerCase();
      const matchesSearch = search.length === 0 || haystack.includes(search);
      return matchesStatus && matchesSearch;
    });
  }, [bookings, filters]);

  const startEdit = (booking: Booking) => {
    setEditingId(booking.id);
    setDraft({
      customerName: booking.customerName,
      phone: booking.phone,
      address: booking.address,
      service: booking.service,
      preferredDate: booking.preferredDate,
      preferredTime: booking.preferredTime,
      notes: booking.notes,
      status: booking.status,
    });
    setShowForm(true);
  };

  const saveEdit = () => {
    if (!editingId) return;
    const next = bookings.map((booking) =>
      booking.id === editingId
        ? { ...booking, ...draft, timestamp: booking.timestamp }
        : booking,
    );
    setBookings(next);
    writeBookings(next);
    setEditingId(null);
    setShowForm(false);
    setDraft(createBookingDraft());
  };

  const addBooking = () => {
    const nextBooking: Booking = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...draft,
    };

    const next = [nextBooking, ...bookings];
    setBookings(next);
    writeBookings(next);
    setDraft(createBookingDraft());
    setShowForm(false);
  };

  const removeBooking = (id: number) => {
    const next = bookings.filter((booking) => booking.id !== id);
    setBookings(next);
    writeBookings(next);
    setDeleteId(null);
  };

  const updateStatus = (id: number, status: BookingStatus) => {
    const next = updateBookingStatus(bookings, id, status);
    setBookings(next);
    writeBookings(next);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-4">
        {[
          { label: 'Pending', value: stats.pending, icon: Clock3, tone: 'amber' },
          { label: 'Confirmed', value: stats.confirmed, icon: CheckCircle2, tone: 'blue' },
          { label: 'Completed', value: stats.completed, icon: CalendarDays, tone: 'emerald' },
          { label: 'Cancelled', value: stats.cancelled, icon: X, tone: 'rose' },
        ].map((item) => {
          const Icon = item.icon;
          const toneClasses = {
            amber: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/40 dark:bg-amber-900/20 dark:text-amber-300',
            blue: 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/40 dark:bg-blue-900/20 dark:text-blue-300',
            emerald: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-300',
            rose: 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/40 dark:bg-rose-900/20 dark:text-rose-300',
          }[item.tone as 'amber' | 'blue' | 'emerald' | 'rose'];

          return (
            <div key={item.label} className={`rounded-2xl border p-4 ${toneClasses}`}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{item.label}</p>
                <Icon className="h-4 w-4" />
              </div>
              <p className="mt-4 text-3xl font-semibold">{item.value}</p>
            </div>
          );
        })}
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Booking Management</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Track, update, and organize all service bookings.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
              <Search className="h-4 w-4" />
              <input
                value={filters.search}
                onChange={(event) => setFilters((prev) => ({ ...prev, search: event.target.value }))}
                className="w-full bg-transparent outline-none"
                placeholder="Search bookings"
              />
            </label>
            <select
              value={filters.status}
              onChange={(event) => setFilters((prev) => ({ ...prev, status: event.target.value as BookingStatus | 'All' }))}
              className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            >
              <option value="All">All statuses</option>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => {
              setDraft(createBookingDraft());
              setEditingId(null);
              setShowForm(true);
            }}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Add booking
          </button>
          <button
            onClick={() => setFilters({ search: '', status: 'All' })}
            className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Clear filters
          </button>
        </div>

        {showForm && (
          <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{editingId ? 'Edit booking' : 'New booking'}</h3>
              <button onClick={() => { setShowForm(false); setEditingId(null); setDraft(createBookingDraft()); }} className="rounded-full p-2 text-gray-500 hover:bg-white hover:text-gray-700 dark:hover:bg-gray-700">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="text-sm text-gray-600 dark:text-gray-300">
                <span className="mb-1 block font-medium">Customer Name</span>
                <input value={draft.customerName} onChange={(event) => setDraft((prev) => ({ ...prev, customerName: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 outline-none dark:border-gray-700 dark:bg-gray-900" />
              </label>
              <label className="text-sm text-gray-600 dark:text-gray-300">
                <span className="mb-1 block font-medium">Phone</span>
                <input value={draft.phone} onChange={(event) => setDraft((prev) => ({ ...prev, phone: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 outline-none dark:border-gray-700 dark:bg-gray-900" />
              </label>
              <label className="text-sm text-gray-600 dark:text-gray-300 md:col-span-2">
                <span className="mb-1 block font-medium">Address</span>
                <input value={draft.address} onChange={(event) => setDraft((prev) => ({ ...prev, address: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 outline-none dark:border-gray-700 dark:bg-gray-900" />
              </label>
              <label className="text-sm text-gray-600 dark:text-gray-300">
                <span className="mb-1 block font-medium">Service</span>
                <input value={draft.service} onChange={(event) => setDraft((prev) => ({ ...prev, service: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 outline-none dark:border-gray-700 dark:bg-gray-900" />
              </label>
              <label className="text-sm text-gray-600 dark:text-gray-300">
                <span className="mb-1 block font-medium">Status</span>
                <select value={draft.status} onChange={(event) => setDraft((prev) => ({ ...prev, status: event.target.value as BookingStatus }))} className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 outline-none dark:border-gray-700 dark:bg-gray-900">
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </label>
              <label className="text-sm text-gray-600 dark:text-gray-300">
                <span className="mb-1 block font-medium">Preferred Date</span>
                <input type="date" value={draft.preferredDate} onChange={(event) => setDraft((prev) => ({ ...prev, preferredDate: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 outline-none dark:border-gray-700 dark:bg-gray-900" />
              </label>
              <label className="text-sm text-gray-600 dark:text-gray-300">
                <span className="mb-1 block font-medium">Preferred Time</span>
                <input value={draft.preferredTime} onChange={(event) => setDraft((prev) => ({ ...prev, preferredTime: event.target.value }))} className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 outline-none dark:border-gray-700 dark:bg-gray-900" />
              </label>
              <label className="text-sm text-gray-600 dark:text-gray-300 md:col-span-2">
                <span className="mb-1 block font-medium">Notes</span>
                <textarea value={draft.notes} onChange={(event) => setDraft((prev) => ({ ...prev, notes: event.target.value }))} className="min-h-24 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 outline-none dark:border-gray-700 dark:bg-gray-900" />
              </label>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <button onClick={editingId ? saveEdit : addBooking} className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
                <span className="inline-flex items-center gap-2"><Save className="h-4 w-4" /> {editingId ? 'Save changes' : 'Create booking'}</span>
              </button>
              <button onClick={() => { setShowForm(false); setEditingId(null); setDraft(createBookingDraft()); }} className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-white dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700">
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm dark:divide-gray-700">
              <thead className="bg-gray-50 text-left text-xs uppercase tracking-[0.2em] text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                <tr>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Service</th>
                  <th className="px-4 py-3">Date & Time</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white text-gray-700 dark:divide-gray-700 dark:bg-gray-900 dark:text-gray-200">
                {filtered.map((booking) => (
                  <tr key={booking.id} className="align-top">
                    <td className="px-4 py-4">
                      <div className="font-semibold">{booking.customerName}</div>
                      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{booking.phone}</div>
                      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{booking.address}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-medium">{booking.service}</div>
                      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{booking.notes || 'No notes provided'}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-medium">{formatDate(booking.preferredDate)}</div>
                      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{booking.preferredTime}</div>
                      <div className="mt-1 text-xs text-gray-400">{formatTimestamp(booking.timestamp)}</div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge status={booking.status} />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        <select
                          value={booking.status}
                          onChange={(event) => updateStatus(booking.id, event.target.value as BookingStatus)}
                          className="rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-xs outline-none dark:border-gray-700 dark:bg-gray-800"
                        >
                          {STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                        <button onClick={() => startEdit(booking)} className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:border-blue-300 hover:text-blue-600 dark:border-gray-700 dark:text-gray-300">
                          <PencilLine className="h-4 w-4" />
                        </button>
                        <button onClick={() => setDeleteId(booking.id)} className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:border-rose-300 hover:text-rose-600 dark:border-gray-700 dark:text-gray-300">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="border-t border-gray-200 bg-gray-50 px-4 py-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-400">
              No bookings match your current filters.
            </div>
          )}
        </div>
      </div>

      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Delete booking?</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">This action cannot be undone.</p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => removeBooking(deleteId)} className="flex-1 rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700">
                Delete
              </button>
              <button onClick={() => setDeleteId(null)} className="flex-1 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
