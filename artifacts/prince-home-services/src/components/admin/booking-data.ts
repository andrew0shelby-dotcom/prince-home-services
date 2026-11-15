import type { Booking, BookingStatus } from './booking-types';

const storageKey = 'phs-bookings-v1';

const defaultBookings: Booking[] = [
  {
    id: 1,
    customerName: 'Ravi Sharma',
    phone: '9876543210',
    address: 'Civil Lines, Gorakhpur',
    service: 'AC Installation',
    preferredDate: '2026-08-10',
    preferredTime: '10:00 AM',
    notes: 'Need installation before noon.',
    status: 'Pending',
    timestamp: '2026-08-01T09:00:00.000Z',
  },
  {
    id: 2,
    customerName: 'Anita Singh',
    phone: '9123456780',
    address: 'Rajendra Nagar',
    service: 'Water Purifier Repair',
    preferredDate: '2026-08-08',
    preferredTime: '03:30 PM',
    notes: 'Water leakage near inlet valve.',
    status: 'Confirmed',
    timestamp: '2026-08-01T11:30:00.000Z',
  },
  {
    id: 3,
    customerName: 'Manoj Gupta',
    phone: '9998887776',
    address: 'Mahadeva Bazar',
    service: 'Geyser Service',
    preferredDate: '2026-08-06',
    preferredTime: '06:00 PM',
    notes: 'No heating issue from last 2 days.',
    status: 'Completed',
    timestamp: '2026-07-31T17:20:00.000Z',
  },
  {
    id: 4,
    customerName: 'Pooja Verma',
    phone: '8899776655',
    address: 'Shahpur',
    service: 'Washing Machine Repair',
    preferredDate: '2026-08-12',
    preferredTime: '01:00 PM',
    notes: 'Spin cycle not working.',
    status: 'Cancelled',
    timestamp: '2026-07-30T15:10:00.000Z',
  },
];

export function readBookings(): Booking[] {
  if (typeof window === 'undefined') return defaultBookings;

  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return defaultBookings;
    const parsed = JSON.parse(raw) as Booking[];
    return Array.isArray(parsed) && parsed.length ? parsed : defaultBookings;
  } catch {
    return defaultBookings;
  }
}

export function writeBookings(bookings: Booking[]) {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(storageKey, JSON.stringify(bookings));
}

export function createBookingDraft(): Omit<Booking, 'id' | 'timestamp'> {
  return {
    customerName: '',
    phone: '',
    address: '',
    service: '',
    preferredDate: '',
    preferredTime: '',
    notes: '',
    status: 'Pending',
  };
}

export function getBookingStats(bookings: Booking[]) {
  const pending = bookings.filter((b) => b.status === 'Pending').length;
  const confirmed = bookings.filter((b) => b.status === 'Confirmed').length;
  const completed = bookings.filter((b) => b.status === 'Completed').length;
  const cancelled = bookings.filter((b) => b.status === 'Cancelled').length;

  return { pending, confirmed, completed, cancelled };
}

export function updateBookingStatus(bookings: Booking[], id: number, status: BookingStatus) {
  return bookings.map((booking) => (booking.id === id ? { ...booking, status } : booking));
}
