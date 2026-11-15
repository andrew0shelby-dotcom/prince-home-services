import { MapPin, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { SERVICE_AREAS } from '@/data';
import { useTheme } from '@/components/ThemeProvider';
import { translations } from '@/lib/translations';

export default function ServiceAreas() {
  const { language } = useTheme();
  const t = translations[language].serviceAreas;

  return (
    <div className="py-20 lg:py-28 bg-muted/40">
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
            <MapPin className="w-4 h-4" />
            {t.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            {t.heading}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden shadow-xl border border-border h-[400px] lg:h-[480px]"
          >
            <iframe
              title="Prince Home Services Location"
              src="https://maps.google.com/maps?q=Mahadeva+Bazar,+Gorakhpur,+Uttar+Pradesh,+India&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              className="border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          {/* Areas list */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-foreground">{t.serviceRadius}</p>
                  <p className="text-muted-foreground text-sm">{t.radiusDescription}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SERVICE_AREAS.map((area, i) => (
                  <motion.div
                    key={area}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="flex items-center gap-2 px-3 py-2 bg-muted/60 rounded-xl"
                  >
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-foreground font-medium truncate">{area}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Coverage note */}
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">{t.coverageNoteTitle}</p>
                  <p className="text-muted-foreground text-sm">
                    {t.coverageNoteDescription}{' '}
                    <a href="tel:+919793234755" className="text-orange-600 dark:text-orange-400 font-medium hover:underline">
                      +91 9793234755
                    </a>{' '}
                    {t.checkAvailability}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '25 km', label: t.radius },
                { value: '15+', label: t.areas },
                { value: '2 hrs', label: t.avgResponse },
              ].map((stat) => (
                <div key={stat.label} className="bg-card border border-border rounded-2xl p-4 text-center">
                  <p className="text-2xl font-black text-primary">{stat.value}</p>
                  <p className="text-muted-foreground text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
