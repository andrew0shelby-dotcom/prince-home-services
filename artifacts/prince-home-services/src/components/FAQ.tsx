import { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQS, BUSINESS } from '@/data';
import { useTheme } from '@/components/ThemeProvider';
import { translations } from '@/lib/translations';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const { language } = useTheme();
  const t = translations[language].faq;

  return (
    <div className="py-20 lg:py-28 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 mb-4">
            <HelpCircle className="w-4 h-4" />
            {t.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            {t.heading}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.description}
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`border rounded-2xl overflow-hidden transition-all ${
                open === i
                  ? 'border-blue-300 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-900/10'
                  : 'border-border bg-card'
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-semibold text-foreground pr-4 text-sm sm:text-base">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 text-muted-foreground transition-transform duration-300 ${open === i ? 'rotate-180 text-primary' : ''}`}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5">
                      <div className="h-px bg-border mb-4" />
                      <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center p-8 bg-muted/50 rounded-3xl border border-border"
        >
          <h3 className="text-xl font-bold text-foreground mb-2">{t.stillHaveQuestions}</h3>
          <p className="text-muted-foreground mb-6">{t.teamMessage}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={BUSINESS.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-2xl transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              {t.chatOnWhatsApp}
            </a>
            <a
              href={BUSINESS.call}
              className="flex items-center gap-2 px-6 py-3 border-2 border-border hover:border-primary bg-card text-foreground font-semibold rounded-2xl transition-colors"
            >
              {t.callUs} {BUSINESS.phone}
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
