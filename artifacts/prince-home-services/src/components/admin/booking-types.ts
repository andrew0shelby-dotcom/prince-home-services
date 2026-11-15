export type BookingStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export type Booking = {
  id: number;
  customerName: string;
  phone: string;
  address: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
  status: BookingStatus;
  timestamp: string;
};

export type BookingFilters = {
  search: string;
  status: BookingStatus | 'All';
};
