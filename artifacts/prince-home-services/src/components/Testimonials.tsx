import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS } from '@/data';
import { useTheme } from '@/components/ThemeProvider';
import { translations } from '@/lib/translations';

const avatarColors = [
  'bg-blue-600', 'bg-purple-600', 'bg-green-600', 'bg-orange-600',
  'bg-rose-600', 'bg-teal-600', 'bg-indigo-600', 'bg-amber-600',
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const { language } = useTheme();
  const t = translations[language].testimonials;

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const go = (dir: number) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const visibleCount = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 3 : typeof window !== 'undefined' && window.innerWidth >= 640 ? 2 : 1;
  const visible = Array.from({ length: Math.min(3, TESTIMONIALS.length) }, (_, i) => TESTIMONIALS[(current + i) % TESTIMONIALS.length]);

  return (
    <div className="py-20 lg:py-28 bg-muted/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 dark:bg-orange-900/20 rounded-full text-sm font-medium text-orange-700 dark:text-orange-300 mb-4">
            <Star className="w-4 h-4 fill-orange-500" />
            {t.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            {t.heading}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.description}
          </p>

          {/* Stars summary */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {[1,2,3,4,5].map((s) => (
              <Star key={s} className="w-6 h-6 fill-orange-400 text-orange-400" />
            ))}
            <span className="ml-2 text-xl font-bold text-foreground">4.9</span>
            <span className="text-muted-foreground text-sm">{t.reviews}</span>
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((t, i) => (
                <motion.div
                  key={t.name + current + i}
                  initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-card border border-border rounded-2xl p-6 relative hover:shadow-lg transition-shadow"
                >
                  <Quote className="absolute top-5 right-5 w-8 h-8 text-blue-100 dark:text-blue-900" />
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${avatarColors[TESTIMONIALS.indexOf(t) % avatarColors.length]} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{t.name}</p>
                      <p className="text-muted-foreground text-xs">{t.area}, Gorakhpur</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`w-4 h-4 ${j < t.rating ? 'fill-orange-400 text-orange-400' : 'text-gray-300 dark:text-gray-600'}`} />
                    ))}
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed">{t.text}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => go(-1)}
              className="w-10 h-10 rounded-full border border-border bg-card hover:bg-muted flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`h-2 rounded-full transition-all ${i === current ? 'bg-primary w-6' : 'bg-muted-foreground/30 w-2'}`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              className="w-10 h-10 rounded-full border border-border bg-card hover:bg-muted flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
