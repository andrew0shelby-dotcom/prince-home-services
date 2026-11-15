import { useState } from 'react';
import {
  Wind, Snowflake, Waves, Droplets, Flame, Zap,
  ChefHat, Tv, Lightbulb, CalendarCheck, ChevronDown, X, HelpCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICE_CATEGORIES } from '@/data';
import { useTheme } from '@/components/ThemeProvider';
import { translations } from '@/lib/translations';

const iconMap: Record<string, React.ElementType> = {
  Wind, Snowflake, Waves, Droplets, Flame, Zap, ChefHat, Tv, Lightbulb,
};

const OTHER_ID = '__others__';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [othersText, setOthersText] = useState('');
  const { language } = useTheme();
  const t = translations[language].services;

  const activeCat = SERVICE_CATEGORIES.find((c) => c.id === activeCategory);
  const isOthers = activeCategory === OTHER_ID;

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelect = (id: string) => {
    setActiveCategory((prev) => (prev === id ? null : id));
  };

  return (
    <div className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 mb-4">
            <Zap className="w-4 h-4" />
            {t.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            {t.heading}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.description}
          </p>
        </motion.div>

        {/* Category grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 mb-2">
          {SERVICE_CATEGORIES.map((cat, i) => {
            const Icon = iconMap[cat.icon] ?? Zap;
            const isActive = activeCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                onClick={() => handleSelect(cat.id)}
                className={`group text-left p-5 rounded-2xl border transition-all hover:shadow-lg ${
                  isActive
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md'
                    : 'border-border bg-card hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-3 shadow-sm`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-foreground text-sm sm:text-base mb-1">{cat.name}</h3>
                <p className="text-muted-foreground text-xs hidden sm:block leading-snug">{cat.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">{cat.services.length} services</span>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} />
                </div>
              </motion.button>
            );
          })}

          {/* Others tile */}
          <motion.button
            custom={SERVICE_CATEGORIES.length}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onClick={() => handleSelect(OTHER_ID)}
            className={`group text-left p-5 rounded-2xl border transition-all hover:shadow-lg ${
              isOthers
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-md'
                : 'border-border bg-card hover:border-purple-300 dark:hover:border-purple-700'
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-3 shadow-sm">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-foreground text-sm sm:text-base mb-1">{t.othersTitle}</h3>
            <p className="text-muted-foreground text-xs hidden sm:block leading-snug">{t.othersDescription}</p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">{t.customRequest}</span>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${isOthers ? 'rotate-180' : ''}`} />
            </div>
          </motion.button>
        </div>

        {/* "And many more" note */}
        <p className="text-center text-sm text-muted-foreground mt-4 mb-6">
          + {t.manyMore} — <button onClick={scrollToBooking} className="text-blue-600 dark:text-blue-400 font-medium hover:underline">{t.bookAnyService}</button>.
        </p>

        {/* ── Expanded panel ── */}
        <AnimatePresence mode="wait">
          {(activeCat || isOthers) && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="bg-card border border-border rounded-3xl p-6 mb-6"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-bold text-foreground">
                  {isOthers ? t.othersPanelTitle : `${activeCat!.name} Services`}
                </h3>
                <button
                  onClick={() => setActiveCategory(null)}
                  className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {isOthers ? (
                /* Others panel */
                <div className="max-w-xl">
                  <p className="text-muted-foreground text-sm mb-4">
                    {t.othersPanelDescription}
                  </p>
                  <textarea
                    value={othersText}
                    onChange={(e) => setOthersText(e.target.value)}
                    rows={4}
                    placeholder={t.placeholder}
                    className="w-full px-4 py-3 border border-border rounded-2xl bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-purple-400/40 resize-none text-sm transition"
                  />
                  <div className="flex flex-wrap gap-3 mt-4">
                    <button
                      onClick={scrollToBooking}
                      className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
                    >
                      <CalendarCheck className="w-4 h-4" />
                      {t.bookThisService}
                    </button>
                    <a
                      href="https://wa.me/919793234755"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl transition-colors"
                    >
                      {t.whatsAppUs}
                    </a>
                    <a
                      href="tel:+919793234755"
                      className="flex items-center gap-2 px-5 py-2.5 border border-border text-foreground text-sm font-medium rounded-xl hover:bg-muted transition-colors"
                    >
                      {t.callNow}
                    </a>
                  </div>
                </div>
              ) : (
                /* Standard service cards */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {activeCat!.services.map((service, idx) => {
                    const Icon = iconMap[activeCat!.icon] ?? Zap;
                    return (
                      <motion.div
                        key={service.name}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        className="bg-background border border-border rounded-2xl p-5 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all"
                      >
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${activeCat!.color} flex items-center justify-center mb-3`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="font-semibold text-foreground text-sm mb-1">{service.name}</h4>
                        <p className="text-muted-foreground text-xs mb-4 leading-relaxed">{service.desc}</p>
                        <button
                          onClick={scrollToBooking}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-lg transition-colors w-full justify-center"
                        >
                          <CalendarCheck className="w-3 h-3" />
                          {t.bookNow}
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-center"
        >
          <p className="text-muted-foreground mb-4">{t.needService}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={scrollToBooking}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-2xl shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
            >
              <CalendarCheck className="w-5 h-5" />
              {t.bookAnyServiceNow}
            </button>
            <a
              href="tel:+919793234755"
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-border hover:border-primary text-foreground font-semibold rounded-2xl transition-all hover:scale-105"
            >
              {t.callLabel} +91 97932 34755
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
