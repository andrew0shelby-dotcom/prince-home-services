import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Shop from '@/components/Shop';
import Booking from '@/components/Booking';
import WhyChooseUs from '@/components/WhyChooseUs';
import WorkGallery from '@/components/WorkGallery';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import ServiceAreas from '@/components/ServiceAreas';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <section id="home"><Hero /></section>
        <section id="services"><Services /></section>
        <section id="gallery"><WorkGallery /></section>
        <section id="shop"><Shop /></section>
        <section id="booking"><Booking /></section>
        <section id="why-us"><WhyChooseUs /></section>
        <section id="testimonials"><Testimonials /></section>
        <section id="faq"><FAQ /></section>
        <section id="service-areas"><ServiceAreas /></section>
        <section id="contact"><Contact /></section>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
