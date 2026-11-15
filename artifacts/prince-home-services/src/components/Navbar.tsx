import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Search, Phone, Wrench } from 'lucide-react';
import { useLocation } from 'wouter';
import { useTheme } from '@/components/ThemeProvider';
import { cn } from '@/lib/utils';
import { BUSINESS } from '@/data';
import { translations } from '@/lib/translations';

const navLinks = [
  { key: 'home', href: '#home' },
  { key: 'services', href: '#services' },
  { key: 'store', href: '/store', route: true },
  { key: 'about', href: '/about', route: true },
  { key: 'whyUs', href: '#why-us' },
  { key: 'areas', href: '#service-areas' },
  { key: 'reviews', href: '#testimonials' },
  { key: 'faq', href: '#faq' },
  { key: 'contact', href: '#contact' },
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, setTheme, language, setLanguage } = useTheme();
  const t = translations[language].nav;
  const [, setLocation] = useLocation();
  const languageLabel = language === 'en' ? 'English' : 'हिन्दी';
  const [brandPrimary, brandSecondary] = BUSINESS.name.split(/\s+(?=\S+$)/);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);

    if (href.startsWith('/')) {
      setLocation(href);
      return;
    }

    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (window.location.pathname !== '/') {
      setLocation('/');
      window.setTimeout(() => {
        const section = document.querySelector(href);
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  return (
    <>
      {/* Search overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-card rounded-2xl shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                autoFocus
                type="search"
                placeholder={t.searchPlaceholder}
                className="flex-1 bg-transparent outline-none text-foreground text-lg placeholder:text-muted-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={() => setSearchOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            {searchQuery && (
              <p className="text-sm text-muted-foreground">
                {t.searchResults} "<span className="text-foreground font-medium">{searchQuery}</span>"...
              </p>
            )}
            {!searchQuery && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-3">{t.quickLinks}</p>
                {['AC Repair', 'RO Installation', 'Ceiling Fan', 'Refrigerator Repair', 'Electrical Work'].map((s) => (
                  <button
                    key={s}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted text-sm text-foreground transition-colors"
                    onClick={() => { handleNav('#services'); setSearchOpen(false); }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <nav
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-sm'
            : 'bg-transparent',
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <button
              onClick={() => handleNav('#home')}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-foreground leading-tight">{brandPrimary}</p>
                <p className="text-xs text-orange-500 font-semibold leading-tight">{brandSecondary}</p>
              </div>
            </button>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.slice(0, 7).map((link) => (
                <button
                  key={link.key}
                  onClick={() => handleNav(link.href)}
                  className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground rounded-lg hover:bg-muted transition-colors"
                >
                  {t[link.key]}
                </button>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-xl text-foreground/70 hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="px-2.5 py-2 rounded-xl text-foreground/70 hover:text-foreground hover:bg-muted transition-colors text-sm font-semibold"
                aria-label={t.toggleLanguage}
                title={languageLabel}
              >
                {language === 'en' ? 'हिं' : 'EN'}
              </button>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-xl text-foreground/70 hover:text-foreground hover:bg-muted transition-colors"
                aria-label={t.toggleTheme}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => handleNav('/admin')}
                className="px-3 py-2 rounded-xl text-foreground/70 hover:text-foreground hover:bg-muted transition-colors text-sm font-semibold"
                aria-label="Admin"
              >
                Admin
              </button>
              <a
                href={BUSINESS.call}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden md:inline">{BUSINESS.phone}</span>
              </a>
              <button
                onClick={() => handleNav('#booking')}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
              >
                {t.bookService}
              </button>
              <button
                onClick={() => setOpen(!open)}
                className="lg:hidden p-2 rounded-xl text-foreground/70 hover:text-foreground hover:bg-muted transition-colors"
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden bg-card border-t border-border shadow-xl">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => handleNav(link.href)}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  {t[link.key]}
                </button>
              ))}
              <div className="pt-2 grid grid-cols-2 gap-2">
                <a
                  href={BUSINESS.call}
                  className="flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  <Phone className="w-4 h-4" /> {t.callNow}
                </a>
                <button
                  onClick={() => { handleNav('#booking'); setOpen(false); }}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-semibold transition-colors"
                >
                  {t.bookService}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
