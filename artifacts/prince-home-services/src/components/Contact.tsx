import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { BUSINESS } from '@/data';
import { useTheme } from '@/components/ThemeProvider';
import { translations } from '@/lib/translations';

export default function Contact() {
  const { language } = useTheme();
  const t = translations[language].contact;

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
            <Phone className="w-4 h-4" />
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
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            {/* Cards */}
            {[
              {
                icon: Phone,
                label: t.phone,
                value: BUSINESS.phone,
                sub: t.phoneSub,
                href: BUSINESS.call,
                color: 'from-blue-600 to-blue-700',
              },
              {
                icon: MessageCircle,
                label: t.whatsapp,
                value: BUSINESS.phone,
                sub: t.whatsappSub,
                href: BUSINESS.whatsapp,
                color: 'from-green-600 to-green-700',
              },
              {
                icon: Mail,
                label: t.email,
                value: BUSINESS.email,
                sub: t.emailSub,
                href: `mailto:${BUSINESS.email}`,
                color: 'from-orange-500 to-orange-600',
              },
              {
                icon: MapPin,
                label: t.address,
                value: BUSINESS.address,
                sub: t.addressSub,
                href: BUSINESS.maps,
                color: 'from-purple-600 to-purple-700',
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="group flex items-center gap-4 p-5 bg-card border border-border rounded-2xl hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground font-medium mb-0.5">{item.label}</p>
                  <p className="font-semibold text-foreground text-sm truncate">{item.value}</p>
                  <p className="text-muted-foreground text-xs">{item.sub}</p>
                </div>
              </a>
            ))}

            {/* Hours */}
            <div className="p-5 bg-card border border-border rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <p className="font-bold text-foreground">{t.businessHours}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t.mondaySaturday}</span>
                  <span className="font-medium text-foreground">8:00 AM – 8:00 PM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t.sunday}</span>
                  <span className="font-medium text-foreground">10:00 AM – 6:00 PM</span>
                </div>
                <div className="flex items-center gap-2 mt-3 p-2.5 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-green-700 dark:text-green-400 text-xs font-medium">{t.currentlyAccepting}</span>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={BUSINESS.call}
                className="flex items-center justify-center gap-2 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-2xl shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                {t.callNow}
              </a>
              <a
                href={BUSINESS.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-2xl shadow-lg shadow-green-500/20 transition-all hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl overflow-hidden shadow-xl border border-border h-[500px] lg:h-full min-h-[480px]"
          >
            <iframe
              title="Contact Map"
              src="https://maps.google.com/maps?q=Mahadeva+Bazar,+Gorakhpur,+Uttar+Pradesh,+India&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              className="border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
