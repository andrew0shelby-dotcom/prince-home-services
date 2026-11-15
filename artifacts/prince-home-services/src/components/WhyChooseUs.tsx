import { Clock, Award, IndianRupee, ShieldCheck, MapPin, Zap, Users, ThumbsUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { WHY_CHOOSE } from '@/data';
import { useTheme } from '@/components/ThemeProvider';
import { translations } from '@/lib/translations';

const iconMap: Record<string, React.ElementType> = {
  Clock, Award, IndianRupee, ShieldCheck, MapPin, Zap, Users, ThumbsUp,
};

export default function WhyChooseUs() {
  const { language } = useTheme();
  const t = translations[language].whyChoose;

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
            <ShieldCheck className="w-4 h-4" />
            {t.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            {t.heading}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.description}
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE.map((item, i) => {
            const Icon = iconMap[item.icon] ?? ShieldCheck;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="group relative bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all cursor-default overflow-hidden"
              >
                {/* Background decoration */}
                <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-blue-50 dark:bg-blue-900/20 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors" />

                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center mb-4 shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-foreground text-base mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl" />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-2xl font-extrabold mb-2">{t.bannerTitle}</h3>
            <p className="text-blue-100/80">{t.bannerDescription}</p>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/30 transition-all hover:scale-105 whitespace-nowrap"
            >
              {t.bookButton}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
