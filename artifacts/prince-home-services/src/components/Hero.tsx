import { Phone, MessageCircle, ShoppingBag, CalendarCheck, CheckCircle, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { BUSINESS } from '@/data';
import { useTheme } from '@/components/ThemeProvider';
import { translations } from '@/lib/translations';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Hero() {
  const { language } = useTheme();
  const t = translations[language].hero;
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 pt-16">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-700/30 blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-600/10 blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div {...fadeUp(0)}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-blue-100">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                {t.badge}
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div {...fadeUp(0.1)} className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                {t.headline.start}{' '}
                <span className="relative">
                  <span className="text-orange-400">{t.headline.emphasis}</span>
                </span>{' '}
                {t.headline.end}
              </h1>
              <p className="text-blue-100/80 text-lg sm:text-xl leading-relaxed max-w-xl">
                {t.description}
              </p>
            </motion.div>

            {/* Feature tags */}
            <motion.div {...fadeUp(0.2)} className="flex flex-wrap gap-2">
              {t.features.map((f) => (
                <div key={f} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-full text-sm text-blue-100">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  {f}
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo('booking')}
                className="flex items-center gap-2 px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-2xl shadow-lg shadow-orange-500/30 transition-all hover:scale-105 active:scale-95"
              >
                <CalendarCheck className="w-5 h-5" />
                {t.bookService}
              </button>
              <button
                onClick={() => scrollTo('shop')}
                className="flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/25 text-white font-semibold rounded-2xl transition-all hover:scale-105 active:scale-95"
              >
                <ShoppingBag className="w-5 h-5" />
                {t.shopNow}
              </button>
              <a
                href={BUSINESS.call}
                className="flex items-center gap-2 px-5 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/25 text-white font-semibold rounded-2xl transition-all hover:scale-105 active:scale-95"
              >
                <Phone className="w-5 h-5" />
                {t.callNow}
              </a>
              <a
                href={BUSINESS.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-3.5 bg-green-600/80 hover:bg-green-600 backdrop-blur-sm text-white font-semibold rounded-2xl transition-all hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                {t.whatsapp}
              </a>
            </motion.div>
          </div>

          {/* Right column — visual card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Main card */}
            <div className="relative glass rounded-3xl p-8 shadow-2xl">
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/40">
                <div className="text-white text-center">
                  <p className="text-xl font-black leading-none">4.9</p>
                  <div className="flex justify-center mt-0.5">
                    <Star className="w-3 h-3 fill-white text-white" />
                  </div>
                  <p className="text-[10px] leading-none mt-0.5">{t.rating}</p>
                </div>
              </div>

              {/* Service icons grid */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { icon: '❄️', label: t.serviceIcons[0] },
                  { icon: '🔧', label: t.serviceIcons[1] },
                  { icon: '💡', label: t.serviceIcons[2] },
                  { icon: '🚿', label: t.serviceIcons[3] },
                  { icon: '🌡️', label: t.serviceIcons[4] },
                  { icon: '📺', label: t.serviceIcons[5] },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors cursor-default"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-xs text-white/80 font-medium text-center leading-tight">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Live indicator */}
              <div className="flex items-center justify-between p-4 bg-green-500/20 rounded-2xl border border-green-400/20">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white text-sm font-medium">{t.techniciansAvailable}</span>
                </div>
                <span className="text-green-400 text-sm font-bold">{t.now}</span>
              </div>
            </div>

            {/* Floating mini cards */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-8 top-12 hidden lg:block"
            >
              <div className="bg-white dark:bg-card rounded-2xl shadow-xl p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{t.callUs}</p>
                  <p className="text-sm font-bold text-foreground">{BUSINESS.phone}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [6, -6, 6] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -right-6 bottom-16 hidden lg:block"
            >
              <div className="bg-white dark:bg-card rounded-2xl shadow-xl p-3">
                <p className="text-xs text-muted-foreground">{t.avgResponse}</p>
                <p className="text-lg font-black text-orange-500">2 hrs</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {t.stats.map((stat) => (
            <div key={stat.label} className="text-center p-4 glass rounded-2xl">
              <p className="text-3xl font-black text-white">{stat.value}</p>
              <p className="text-blue-200 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 inset-x-0">
        <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none" style={{ height: 60 }}>
          <path d="M0,60 C480,0 960,0 1440,60 L1440,60 L0,60 Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </div>
  );
}
