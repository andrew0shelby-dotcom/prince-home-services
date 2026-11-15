import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'wouter';
import { useTheme } from '@/components/ThemeProvider';
import { translations } from '@/lib/translations';

export default function AboutPage() {
  const { language } = useTheme();
  const t = translations[language].about;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-sm font-medium text-orange-600 dark:text-orange-300">
                <Sparkles className="h-4 w-4" />
                {t.eyebrow}
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                {t.heading}
              </h1>
              <p className="max-w-2xl text-lg text-muted-foreground">
                {t.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/store" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">
                  {t.exploreOffers} <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="/#contact" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 font-semibold text-foreground hover:bg-muted">
                  {t.getInTouch}
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-8 shadow-xl">
              <div className="flex items-center gap-3 text-foreground">
                <ShieldCheck className="h-5 w-5 text-green-500" />
                <h2 className="text-xl font-semibold">{t.sectionTitle}</h2>
              </div>
              <div className="mt-6 space-y-4">
                {t.bullets.map((item) => (
                  <div key={item} className="rounded-2xl border border-border/70 bg-background/70 p-4 text-sm text-muted-foreground">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
