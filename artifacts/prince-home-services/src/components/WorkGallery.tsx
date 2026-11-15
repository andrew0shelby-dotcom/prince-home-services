import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { translations } from '@/lib/translations';

// ─── Gallery photos of technicians at work ────────────────────────────────────
// Replace src values with your own photos to personalize this section.
const PHOTOS = [
  {
    src: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=700&h=500&q=80',
    caption: 'Electrical wiring & switchboard repair',
    tag: 'Electrical',
  },
  {
    src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=700&h=500&q=80',
    caption: 'Precision appliance diagnostics',
    tag: 'Diagnostics',
  },
  {
    src: 'https://images.unsplash.com/photo-1504222490345-c075b6008014?auto=format&fit=crop&w=700&h=500&q=80',
    caption: 'Doorstep repair — no hassle for you',
    tag: 'Repairs',
  },
  {
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=700&h=500&q=80',
    caption: 'Professional tools — always ready',
    tag: 'Equipment',
  },
  {
    src: 'https://images.unsplash.com/photo-1581093804475-577d72e38aa0?auto=format&fit=crop&w=700&h=500&q=80',
    caption: 'AC servicing & gas refilling',
    tag: 'AC Service',
  },
  {
    src: 'https://images.unsplash.com/photo-1563189996-ec72e9c3e2f0?auto=format&fit=crop&w=700&h=500&q=80',
    caption: 'Washing machine repair at home',
    tag: 'Appliances',
  },
];

// ─── YouTube videos ───────────────────────────────────────────────────────────
// Replace `videoId` with your own YouTube video IDs.
// To find the ID: open a YouTube video → copy the part after "?v=" in the URL.
const VIDEOS = [
  {
    videoId: 'YBGgGR3JZSA',
    title: 'How we service your AC — step by step',
    desc: 'Watch our certified technician perform a full AC deep-clean and gas check.',
  },
  {
    videoId: 'dJu4CXNkqC4',
    title: 'Washing machine repair in under an hour',
    desc: 'See how we diagnose and fix a faulty drain pump — same-day service.',
  },
];

function PhotoLightbox({
  photos, index, onClose, onPrev, onNext,
}: {
  photos: typeof PHOTOS;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition">
        <X className="w-6 h-6" />
      </button>
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition">
        <ChevronRight className="w-6 h-6" />
      </button>
      <div onClick={(e) => e.stopPropagation()} className="max-w-4xl w-full">
        <img
          src={photos[index].src}
          alt={photos[index].caption}
          className="w-full max-h-[75vh] object-contain rounded-2xl"
        />
        <div className="text-center mt-4">
          <span className="px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">{photos[index].tag}</span>
          <p className="text-white mt-2 font-medium">{photos[index].caption}</p>
          <p className="text-white/50 text-sm">{index + 1} / {photos.length}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkGallery() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  const { language } = useTheme();
  const t = translations[language].workGallery;

  const openLightbox = (i: number) => setLightboxIdx(i);
  const closeLightbox = () => setLightboxIdx(null);
  const prevPhoto = () => setLightboxIdx((p) => (p! - 1 + PHOTOS.length) % PHOTOS.length);
  const nextPhoto = () => setLightboxIdx((p) => (p! + 1) % PHOTOS.length);

  return (
    <div className="py-20 lg:py-28 bg-muted/30">
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
            <Camera className="w-4 h-4" />
            {t.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            {t.heading}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.description}
          </p>
        </motion.div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-16">
          {PHOTOS.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              onClick={() => !imgErrors[i] && openLightbox(i)}
              className={`group relative overflow-hidden rounded-2xl aspect-[4/3] bg-muted ${!imgErrors[i] ? 'cursor-pointer' : ''}`}
            >
              {imgErrors[i] ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 text-white gap-2">
                  <Camera className="w-8 h-8 opacity-60" />
                  <p className="text-xs font-medium opacity-80 text-center px-4">{photo.caption}</p>
                </div>
              ) : (
                <>
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={() => setImgErrors((e) => ({ ...e, [i]: true }))}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">{photo.tag}</span>
                    <p className="text-white text-sm font-medium mt-0.5 leading-snug">{photo.caption}</p>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Camera className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </>
              )}

              {/* Tag badge */}
              {!imgErrors[i] && (
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full">{photo.tag}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Videos section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 rounded-full text-sm font-medium text-red-700 dark:text-red-300 mb-4">
            <Play className="w-4 h-4" />
            {t.videoEyebrow}
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{t.videoHeading}</h3>
          <p className="text-muted-foreground">{t.videoDescription}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VIDEOS.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl overflow-hidden"
            >
              <div className="relative aspect-video bg-gray-900">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${v.videoId}?rel=0&modestbranding=1`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <div className="p-4">
                <h4 className="font-bold text-foreground mb-1">{v.title}</h4>
                <p className="text-muted-foreground text-sm">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-4">{t.likeWhatYouSee}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-7 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-2xl transition-all hover:scale-105 shadow-lg shadow-orange-500/20"
            >
              {t.bookService}
            </button>
            <a
              href="https://wa.me/919793234755"
              target="_blank"
              rel="noreferrer"
              className="px-7 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-2xl transition-all hover:scale-105"
            >
              {t.whatsappUs}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <PhotoLightbox
            photos={PHOTOS}
            index={lightboxIdx}
            onClose={closeLightbox}
            onPrev={prevPhoto}
            onNext={nextPhoto}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
