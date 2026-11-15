import { Wrench, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { BUSINESS } from '@/data';
import { useTheme } from '@/components/ThemeProvider';
import { translations } from '@/lib/translations';

const quickLinks = [
  { key: 'home', href: '/', route: true },
  { key: 'services', href: '#services' },
  { key: 'store', href: '/store', route: true },
  { key: 'about', href: '/about', route: true },
  { key: 'bookService', href: '#booking' },
  { key: 'whyUs', href: '#why-us' },
  { key: 'reviews', href: '#testimonials' },
  { key: 'contact', href: '#contact' },
] as const;

const scrollTo = (href: string) => {
  const el = document.querySelector(href);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  if (window.location.pathname !== '/') {
    window.location.href = `/#${href.replace('#', '')}`;
  }
};

export default function Footer() {
  const [, setLocation] = useLocation();
  const { language } = useTheme();
  const t = translations[language].footer;

  const goToSection = (href: string) => {
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
    <footer className="bg-gray-950 text-gray-300">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-bold leading-tight">{BUSINESS.name.split(/\s+(?=\S+$)/)[0]}</p>
                <p className="text-orange-400 text-sm font-semibold leading-tight">{BUSINESS.name.split(/\s+(?=\S+$)/)[1]}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              {t.brandTagline}
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: Facebook, href: BUSINESS.social.facebook, label: t.socialLabels[0] },
                { Icon: Instagram, href: BUSINESS.social.instagram, label: t.socialLabels[1] },
                { Icon: Twitter, href: BUSINESS.social.twitter, label: t.socialLabels[2] },
                { Icon: Youtube, href: BUSINESS.social.youtube, label: t.socialLabels[3] },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-blue-600 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">{t.quickLinks}</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  {link.route ? (
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors hover:translate-x-1 transform inline-block"
                    >
                      {t.quickLinkItems[quickLinks.findIndex((item) => item.key === link.key)]}
                    </Link>
                  ) : (
                    <button
                      onClick={() => goToSection(link.href)}
                      className="text-gray-400 hover:text-white text-sm transition-colors hover:translate-x-1 transform inline-block"
                    >
                      {t.quickLinkItems[quickLinks.findIndex((item) => item.key === link.key)]}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">{t.services}</h4>
            <ul className="space-y-2.5">
              {t.serviceLinks.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollTo('#services')}
                    className="text-gray-400 hover:text-white text-sm transition-colors hover:translate-x-1 transform inline-block"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">{t.contact}</h4>
            <ul className="space-y-4">
              <li>
                <a href={BUSINESS.call} className="flex items-start gap-3 group">
                  <Phone className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0 group-hover:text-blue-300" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">{t.phone}</p>
                    <p className="text-gray-300 group-hover:text-white text-sm transition-colors">{BUSINESS.phone}</p>
                  </div>
                </a>
              </li>
              <li>
                <a href={`mailto:${BUSINESS.email}`} className="flex items-start gap-3 group">
                  <Mail className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0 group-hover:text-orange-300" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">{t.email}</p>
                    <p className="text-gray-300 group-hover:text-white text-sm transition-colors break-all">{BUSINESS.email}</p>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">{t.address}</p>
                    <p className="text-gray-300 text-sm leading-snug">{BUSINESS.address}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} Prince Home Services. {t.rights}
          </p>
          <div className="flex items-center gap-4">
            <a href="https://example.com/privacy-policy-placeholder" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">{t.privacy}</a>
            <span className="text-gray-700">|</span>
            <a href="https://example.com/terms-conditions-placeholder" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">{t.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
