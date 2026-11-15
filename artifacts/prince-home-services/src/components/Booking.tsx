import { useState } from 'react';
import { CalendarCheck, CheckCircle2, User, Phone, MapPin, Settings, Clock, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { SERVICE_CATEGORIES } from '@/data';
import { useTheme } from '@/components/ThemeProvider';
import { translations } from '@/lib/translations';

const allServices = SERVICE_CATEGORIES.flatMap((c) => c.services.map((s) => `${c.name} — ${s.name}`));
const timeSlots = ['Morning (8 AM – 12 PM)', 'Afternoon (12 PM – 4 PM)', 'Evening (4 PM – 8 PM)'];

export default function Booking() {
  const { language } = useTheme();
  const t = translations[language].booking;
  const [form, setForm] = useState({
    name: '', phone: '', address: '', service: '', date: '', time: '', problem: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const today = new Date().toISOString().split('T')[0];

  if (submitted) {
    return (
      <div className="py-20 lg:py-28 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800">
        <div className="max-w-lg mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
          >
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/40">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-3xl font-extrabold text-white mb-3">{t.bookingConfirmed}</h3>
            <p className="text-blue-100 text-lg mb-2">
              Thank you for choosing <span className="font-bold text-white">{form.name}</span>.
            </p>
            <p className="text-blue-200 text-base mb-8">
              Your service request has been received successfully. Our team will contact you shortly on <span className="text-white font-semibold">{form.phone}</span>.
            </p>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 text-left mb-8 space-y-2">
              {form.service && <div className="flex justify-between text-sm"><span className="text-blue-200">{t.service}:</span><span className="text-white font-medium">{form.service}</span></div>}
              {form.date && <div className="flex justify-between text-sm"><span className="text-blue-200">{t.date}:</span><span className="text-white font-medium">{form.date}</span></div>}
              {form.time && <div className="flex justify-between text-sm"><span className="text-blue-200">{t.time}:</span><span className="text-white font-medium">{form.time}</span></div>}
            </div>
            <button
              onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', address: '', service: '', date: '', time: '', problem: '' }); }}
              className="px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-2xl transition-colors"
            >
              {t.bookAnotherService}
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 lg:py-28 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium text-blue-100 mb-4">
            <CalendarCheck className="w-4 h-4" />
            {t.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            {t.heading}
          </h2>
          <p className="text-blue-100/80 text-lg">
            {t.description}
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-sm font-medium text-blue-100">
                  <User className="w-4 h-4" /> {t.fullName} *
                </label>
                <input
                  required
                  type="text"
                  placeholder={t.placeholderName}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-blue-200/60 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-sm font-medium text-blue-100">
                  <Phone className="w-4 h-4" /> {t.phoneNumber} *
                </label>
                <input
                  required
                  type="tel"
                  placeholder={t.placeholderPhone}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-blue-200/60 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition"
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-sm font-medium text-blue-100">
                <MapPin className="w-4 h-4" /> {t.fullAddress} *
              </label>
              <input
                required
                type="text"
                placeholder={t.placeholderAddress}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-blue-200/60 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition"
              />
            </div>

            {/* Service */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-sm font-medium text-blue-100">
                <Settings className="w-4 h-4" /> {t.serviceRequired} *
              </label>
              <select
                required
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition appearance-none"
              >
                <option value="" className="text-gray-800">{t.selectService}</option>
                {allServices.slice(0, 40).map((s) => (
                  <option key={s} value={s} className="text-gray-800">{s}</option>
                ))}
              </select>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {/* Date */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-sm font-medium text-blue-100">
                  <CalendarCheck className="w-4 h-4" /> {t.preferredDate} *
                </label>
                <input
                  required
                  type="date"
                  min={today}
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition"
                />
              </div>

              {/* Time */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-sm font-medium text-blue-100">
                  <Clock className="w-4 h-4" /> {t.preferredTime} *
                </label>
                <select
                  required
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition appearance-none"
                >
                  <option value="" className="text-gray-800">{t.selectTime}</option>
                  {timeSlots.map((t) => (
                    <option key={t} value={t} className="text-gray-800">{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Problem */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-sm font-medium text-blue-100">
                <FileText className="w-4 h-4" /> {t.problemDescription}
              </label>
              <textarea
                rows={4}
                placeholder={t.placeholderProblem}
                value={form.problem}
                onChange={(e) => setForm({ ...form, problem: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-blue-200/60 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-4 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold text-lg rounded-2xl shadow-lg shadow-orange-500/30 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <CalendarCheck className="w-6 h-6" />
              )}
              {loading ? t.booking : t.bookServiceNow}
            </button>

            <p className="text-blue-200/70 text-xs text-center">
              {t.terms}
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
