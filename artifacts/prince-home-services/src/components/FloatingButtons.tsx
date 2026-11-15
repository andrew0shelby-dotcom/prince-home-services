import { useState, useEffect } from 'react';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BUSINESS } from '@/data';

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      {/* WhatsApp — bottom right */}
      <motion.a
        href={BUSINESS.whatsapp}
        target="_blank"
        rel="noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', bounce: 0.4 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 transition-colors"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30" />
      </motion.a>

      {/* Call — bottom left (mobile) */}
      <motion.a
        href={BUSINESS.call}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.2, type: 'spring', bounce: 0.4 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-6 z-50 sm:hidden w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-2xl shadow-blue-600/40 transition-colors"
        aria-label="Call Now"
      >
        <Phone className="w-7 h-7 text-white" />
      </motion.a>

      {/* Scroll to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollTop}
            className="fixed bottom-24 right-6 z-50 w-12 h-12 bg-card border border-border hover:bg-muted rounded-full flex items-center justify-center shadow-lg transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 text-foreground" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
