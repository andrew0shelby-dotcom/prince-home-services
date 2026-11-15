export const BUSINESS = {
  name: "Prince Home Services",
  tagline: "Your Trusted Home Service & Electronics Partner",
  description:
    "Professional doorstep repair, installation, maintenance, and genuine electronic products—all in one place.",
  phone: "+91 9793234755",
  phoneRaw: "9793234755",
  whatsappRaw: "9793234755",
  email: "pm9719826@gmail.com",
  address: "Mahadeva Bazar, Gorakhpur, Uttar Pradesh, India",
  whatsapp: "https://wa.me/919793234755",
  call: "tel:+919793234755",
  maps: "https://www.google.com/maps/search/?api=1&query=Mahadeva+Bazar+Gorakhpur+Uttar+Pradesh+India",
  // Replace these public profile URLs with the real business handles before launch.
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    twitter: "https://x.com/",
    youtube: "https://www.youtube.com/",
  },
  hours: {
    weekdays: "Mon–Sat: 8:00 AM – 8:00 PM",
    sunday: "Sunday: 10:00 AM – 6:00 PM",
  },
};

const BUSINESS_SETTINGS_KEY = 'phs-business-settings';

const normalizePhoneNumber = (value: string) => value.trim();
const normalizeWhatsAppNumber = (value: string) => {
  const digits = (value || '').replace(/\D/g, '');
  return digits;
};
const toWhatsAppUrl = (value: string) => {
  const digits = normalizeWhatsAppNumber(value);
  return digits ? `https://wa.me/91${digits}` : BUSINESS.whatsapp;
};

const syncBusinessDerivedLinks = () => {
  const phoneDigits = normalizePhoneNumber(BUSINESS.phone).replace(/\D/g, '');
  BUSINESS.phoneRaw = phoneDigits;
  BUSINESS.call = `tel:+91${phoneDigits}`;
  BUSINESS.whatsappRaw = normalizeWhatsAppNumber(BUSINESS.whatsappRaw || BUSINESS.phoneRaw);
  BUSINESS.whatsapp = toWhatsAppUrl(BUSINESS.whatsappRaw);
};

const applyBusinessSettings = (saved: Partial<typeof BUSINESS> | null) => {
  if (!saved) return;

  BUSINESS.name = saved.name ?? BUSINESS.name;
  BUSINESS.phone = normalizePhoneNumber(saved.phone ?? BUSINESS.phone);
  BUSINESS.email = saved.email ?? BUSINESS.email;
  BUSINESS.address = saved.address ?? BUSINESS.address;
  BUSINESS.maps = saved.maps ?? BUSINESS.maps;
  BUSINESS.social = {
    ...BUSINESS.social,
    ...(saved.social ?? {}),
  };
  BUSINESS.hours = {
    ...BUSINESS.hours,
    ...(saved.hours ?? {}),
  };

  if (saved.whatsapp) {
    BUSINESS.whatsappRaw = normalizeWhatsAppNumber(saved.whatsapp as string);
    BUSINESS.whatsapp = toWhatsAppUrl(BUSINESS.whatsappRaw);
  }

  syncBusinessDerivedLinks();
};

if (typeof window !== 'undefined') {
  try {
    const stored = localStorage.getItem(BUSINESS_SETTINGS_KEY);
    if (stored) {
      applyBusinessSettings(JSON.parse(stored) as Partial<typeof BUSINESS>);
    }
  } catch {
    // Ignore malformed stored settings and fall back to the defaults.
  }
}

export const saveBusinessSettings = (next: Partial<typeof BUSINESS>) => {
  applyBusinessSettings(next);

  if (typeof window !== 'undefined') {
    localStorage.setItem(
      BUSINESS_SETTINGS_KEY,
      JSON.stringify({
        name: BUSINESS.name,
        phone: BUSINESS.phone,
        whatsapp: BUSINESS.whatsappRaw,
        email: BUSINESS.email,
        address: BUSINESS.address,
        maps: BUSINESS.maps,
        social: BUSINESS.social,
        hours: BUSINESS.hours,
      }),
    );
  }
};

export const SERVICE_CATEGORIES = [
  {
    id: "ac",
    name: "Air Conditioning",
    icon: "Wind",
    color: "from-blue-500 to-cyan-400",
    description: "Complete AC solutions — service, repair & installation",
    services: [
      { name: "Split AC Service", price: "₹399", desc: "Full cleaning and performance check for split ACs" },
      { name: "Window AC Service", price: "₹349", desc: "Complete window AC servicing and tune-up" },
      { name: "AC Installation", price: "₹999", desc: "Professional AC installation with warranty" },
      { name: "AC Uninstallation", price: "₹599", desc: "Safe removal and packing of your AC unit" },
      { name: "AC Gas Refilling", price: "₹1,499", desc: "Refrigerant gas refill for optimal cooling" },
      { name: "AC Maintenance", price: "₹499", desc: "Annual maintenance contract servicing" },
      { name: "AC Deep Cleaning", price: "₹699", desc: "Deep foam wash and full sanitization" },
    ],
  },
  {
    id: "refrigerator",
    name: "Refrigerator",
    icon: "Snowflake",
    color: "from-cyan-500 to-teal-400",
    description: "Expert refrigerator repair and maintenance services",
    services: [
      { name: "Refrigerator Repair", price: "₹399", desc: "Diagnosis and repair for all refrigerator faults" },
      { name: "Refrigerator Installation", price: "₹599", desc: "Safe installation and leveling of your fridge" },
      { name: "Gas Charging", price: "₹1,299", desc: "Refrigerant gas recharge for better cooling" },
      { name: "Compressor Repair", price: "₹1,999", desc: "Compressor diagnosis and repair/replacement" },
    ],
  },
  {
    id: "washing",
    name: "Washing Machine",
    icon: "Waves",
    color: "from-indigo-500 to-blue-400",
    description: "All washing machine types repaired at your doorstep",
    services: [
      { name: "Fully Automatic Repair", price: "₹449", desc: "Repair for front-load and top-load fully automatic machines" },
      { name: "Semi Automatic Repair", price: "₹349", desc: "Repair for twin-tub and semi-automatic machines" },
      { name: "Installation", price: "₹499", desc: "Washing machine installation and waterline setup" },
      { name: "Maintenance", price: "₹299", desc: "Regular cleaning and maintenance service" },
    ],
  },
  {
    id: "water-purifier",
    name: "Water Purifier",
    icon: "Droplets",
    color: "from-sky-500 to-blue-400",
    description: "RO installation, repair and filter replacement",
    services: [
      { name: "RO Installation", price: "₹799", desc: "Complete RO system installation and setup" },
      { name: "RO Repair", price: "₹349", desc: "Diagnosis and repair of all RO issues" },
      { name: "Filter Replacement", price: "₹499", desc: "Replacement of all filters and membranes" },
      { name: "Annual Maintenance", price: "₹1,299", desc: "Complete annual servicing contract" },
    ],
  },
  {
    id: "geyser",
    name: "Geyser",
    icon: "Flame",
    color: "from-orange-500 to-amber-400",
    description: "Geyser installation, repair and maintenance",
    services: [
      { name: "Geyser Installation", price: "₹499", desc: "Safe geyser installation with plumbing" },
      { name: "Geyser Repair", price: "₹349", desc: "Repair of all heating and electrical faults" },
      { name: "Maintenance", price: "₹299", desc: "Annual checkup and preventive maintenance" },
    ],
  },
  {
    id: "cooler",
    name: "Air Cooler",
    icon: "Zap",
    color: "from-green-500 to-emerald-400",
    description: "Cooler repair, motor and pump replacement",
    services: [
      { name: "Cooler Repair", price: "₹349", desc: "Full diagnostic and repair of air coolers" },
      { name: "Motor Replacement", price: "₹699", desc: "Replacement of cooler blower motor" },
      { name: "Pump Replacement", price: "₹499", desc: "Water pump replacement and testing" },
      { name: "Seasonal Maintenance", price: "₹299", desc: "Pre-summer cleaning and servicing" },
    ],
  },
  {
    id: "kitchen",
    name: "Kitchen Appliances",
    icon: "ChefHat",
    color: "from-rose-500 to-pink-400",
    description: "Mixer grinders, microwaves, chimneys & more",
    services: [
      { name: "Mixer Grinder Repair", price: "₹299", desc: "Repair of all mixer grinder brands and models" },
      { name: "Microwave Repair", price: "₹449", desc: "All microwave issues diagnosed and repaired" },
      { name: "Induction Cooktop Repair", price: "₹399", desc: "Complete induction cooktop repair service" },
      { name: "Electric Kettle Repair", price: "₹249", desc: "Fast repair for electric kettles" },
      { name: "Chimney Service", price: "₹599", desc: "Kitchen chimney deep cleaning and repair" },
    ],
  },
  {
    id: "electronics",
    name: "Home Electronics",
    icon: "Tv",
    color: "from-violet-500 to-purple-400",
    description: "TV, fans, inverter, water pump & more",
    services: [
      { name: "Television Repair", price: "₹499", desc: "LCD, LED, OLED TV repair at home" },
      { name: "Ceiling Fan Repair", price: "₹249", desc: "Fan repair and speed regulator replacement" },
      { name: "Exhaust Fan Repair", price: "₹199", desc: "Bathroom and kitchen exhaust fan repair" },
      { name: "Water Pump Repair", price: "₹599", desc: "Submersible and surface pump repair" },
      { name: "Inverter Service", price: "₹449", desc: "Home inverter servicing and repair" },
      { name: "Battery Replacement", price: "₹349", desc: "Inverter battery check and replacement" },
    ],
  },
  {
    id: "electrical",
    name: "Electrical Services",
    icon: "Lightbulb",
    color: "from-yellow-500 to-amber-400",
    description: "All electrical work for your home",
    services: [
      { name: "Switch Board Repair", price: "₹299", desc: "Switchboard diagnosis and repair" },
      { name: "House Wiring", price: "₹999", desc: "New wiring and rewiring services" },
      { name: "Socket Installation", price: "₹199", desc: "New socket/plug point installation" },
      { name: "MCB Replacement", price: "₹349", desc: "MCB and circuit breaker replacement" },
      { name: "Doorbell Installation", price: "₹199", desc: "Wired and wireless doorbell fitting" },
      { name: "Light Installation", price: "₹149", desc: "Ceiling, wall and outdoor light fitting" },
      { name: "Electrical Fault Diagnosis", price: "₹299", desc: "Complete home electrical fault finding" },
    ],
  },
];

export const PRODUCTS = [
  { id: 1, slug: 'premium-ac-maintenance-plan', name: "Havells Stealth Air Ceiling Fan", category: "Ceiling Fans", price: 2499, originalPrice: 3200, rating: 4.5, reviews: 128, desc: "1200mm premium BLDC energy-saving ceiling fan", badge: "Bestseller", image: "https://images.unsplash.com/photo-1617375407361-b37685a4e0a9?auto=format&fit=crop&w=400&h=300&q=80" },
  { id: 2, slug: 'smart-water-purifier-installation', name: "Crompton Aura Prime Ceiling Fan", category: "Ceiling Fans", price: 1899, originalPrice: 2400, rating: 4.3, reviews: 89, desc: "High-speed decorative ceiling fan with 3 years warranty", badge: "", image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=400&h=300&q=80" },
  { id: 3, slug: 'energy-efficient-ceiling-fan-upgrade', name: "Philips HL7756 Mixer Grinder", category: "Mixer Grinders", price: 3299, originalPrice: 4200, rating: 4.6, reviews: 212, desc: "750W mixer with 3 jars and stainless steel blades", badge: "Top Rated", image: "https://images.unsplash.com/photo-1585515656692-c4fdaef41ecb?auto=format&fit=crop&w=400&h=300&q=80" },
  { id: 4, slug: 'appliance-installation-setup', name: "Bajaj Rex 500W Mixer Grinder", category: "Mixer Grinders", price: 1799, originalPrice: 2500, rating: 4.2, reviews: 156, desc: "Compact 500W mixer grinder for everyday use", badge: "", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400&h=300&q=80" },
  { id: 5, slug: 'premium-ac-maintenance-plan', name: "HUL Pureit Eco Water Purifier", category: "Water Purifiers", price: 6999, originalPrice: 8999, rating: 4.7, reviews: 304, desc: "7-stage RO+UV purification, 7L tank capacity", badge: "Popular", image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=400&h=300&q=80" },
  { id: 6, slug: 'smart-water-purifier-installation', name: "Kent RO Filter Set (Original)", category: "RO Filters", price: 1299, originalPrice: 1800, rating: 4.4, reviews: 67, desc: "Genuine Kent sediment, carbon and RO membrane kit", badge: "Genuine", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&h=300&q=80" },
  { id: 7, slug: 'energy-efficient-ceiling-fan-upgrade', name: "Voltas AC Service Kit", category: "AC Spare Parts", price: 899, originalPrice: 1200, rating: 4.3, reviews: 45, desc: "Cleaning foam, fin comb, and coil cleaner bundle", badge: "", image: "https://images.unsplash.com/photo-1581275233290-f0c7a8e77e75?auto=format&fit=crop&w=400&h=300&q=80" },
  { id: 8, slug: 'appliance-installation-setup', name: "Whirlpool Drain Pump Motor", category: "Washing Machine Parts", price: 1499, originalPrice: 2100, rating: 4.1, reviews: 38, desc: "Compatible with all Whirlpool front-load machines", badge: "", image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=400&h=300&q=80" },
  { id: 9, slug: 'premium-ac-maintenance-plan', name: "Bajaj New Shakti 15L Geyser", category: "Geysers", price: 4499, originalPrice: 5999, rating: 4.5, reviews: 187, desc: "15-litre storage water heater with 5-star rating", badge: "Energy Star", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=400&h=300&q=80" },
  { id: 10, slug: 'energy-efficient-ceiling-fan-upgrade', name: "Anchor 6-Plug Extension Board", category: "Extension Boards", price: 599, originalPrice: 899, rating: 4.4, reviews: 234, desc: "6-socket surge-protected 1.5m extension cord", badge: "Bestseller", image: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&w=400&h=300&q=80" },
  { id: 11, slug: 'appliance-installation-setup', name: "Philips 9W LED Bulb (Pack of 4)", category: "LED Bulbs", price: 299, originalPrice: 499, rating: 4.6, reviews: 412, desc: "Cool daylight 9W LED bulbs with 2-year warranty", badge: "Value Pack", image: "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?auto=format&fit=crop&w=400&h=300&q=80" },
  { id: 12, slug: 'smart-water-purifier-installation', name: "Anchor Roma 6A Switch (Pack of 8)", category: "Switches", price: 449, originalPrice: 700, rating: 4.5, reviews: 98, desc: "Premium modular white switches, ISI marked", badge: "", image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=400&h=300&q=80" },
  { id: 13, slug: 'energy-efficient-ceiling-fan-upgrade', name: "V-Guard VG 400 Voltage Stabilizer", category: "Electrical Accessories", price: 1899, originalPrice: 2500, rating: 4.4, reviews: 156, desc: "For 1.5-ton ACs, up to 4kVA capacity", badge: "Popular", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&h=300&q=80" },
  { id: 14, slug: 'appliance-installation-setup', name: "Prestige Induction Cooktop PIC 3.1", category: "Small Home Appliances", price: 2299, originalPrice: 3000, rating: 4.5, reviews: 267, desc: "2000W induction cooktop with 7 preset functions", badge: "Top Rated", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400&h=300&q=80" },
];

export const TESTIMONIALS = [
  { name: "Ramesh Verma", area: "Civil Lines", rating: 5, text: "My split AC stopped cooling during peak summer. Prince Home Services sent a technician within 2 hours. He cleaned the filter, recharged the gas, and now it works perfectly. Very professional service!", avatar: "RV" },
  { name: "Sunita Gupta", area: "Rapti Nagar", rating: 5, text: "Excellent washing machine repair service. The technician diagnosed the drain pump issue immediately and had the spare part ready. Back to working in the same visit. Highly recommended!", avatar: "SG" },
  { name: "Manoj Kumar", area: "Mohaddipur", rating: 4, text: "Called them for my Samsung refrigerator that was not cooling. Very transparent about pricing before starting work. Fixed the thermostat and it's been running fine for 3 months now.", avatar: "MK" },
  { name: "Priya Singh", area: "Padri Bazar", rating: 5, text: "Ordered a ceiling fan and they delivered and installed it the same day! Price was reasonable and the installation was done neatly. Will definitely order more products from them.", avatar: "PS" },
  { name: "Amit Sharma", area: "Taramandal", rating: 5, text: "Best electrical services in Gorakhpur. Got complete rewiring done for 3 rooms. The team was professional, clean, and finished on time. No mess left behind!", avatar: "AS" },
  { name: "Kavita Yadav", area: "Shahpur", rating: 4, text: "My RO water purifier was leaking and making noise. The technician replaced the pressure valve and two filters. Very honest — told me I didn't need to replace things that were still fine.", avatar: "KY" },
  { name: "Deepak Tiwari", area: "Rustampur", rating: 5, text: "Used their AC deep cleaning service. What a difference! The cooling improved so much after the foam wash. Also took an AMC which gives me peace of mind for the whole year.", avatar: "DT" },
  { name: "Anjali Mishra", area: "Golghar", rating: 5, text: "Quick geyser installation done in under an hour. The technician was polite, wore shoe covers, and cleaned up after finishing. This is exactly the kind of service you want at home.", avatar: "AM" },
];

export const FAQS = [
  {
    q: "Which areas do you cover?",
    a: "We serve customers within approximately 25 km of Mahadeva Bazar, Gorakhpur. This includes Civil Lines, Golghar, Mohaddipur, Rapti Nagar, Shahpur, Taramandal, Padri Bazar, Rustampur, Maheva, and surrounding localities.",
  },
  {
    q: "How quickly can a technician arrive?",
    a: "In most cases, we offer same-day service. After booking, you can typically expect a technician within 2–4 hours. For urgent cases, we do our best to respond even faster.",
  },
  {
    q: "Which brands do you repair?",
    a: "We repair all major brands including LG, Samsung, Whirlpool, Voltas, Daikin, Haier, Godrej, IFB, Carrier, Hitachi, Blue Star, Lloyd, and many more. Our technicians are trained for both Indian and international brands.",
  },
  {
    q: "Do you provide genuine spare parts?",
    a: "Yes, we use only genuine OEM-compatible spare parts. We do not use cheap Chinese substitutes. If we need to order a part, we will inform you in advance and provide a receipt.",
  },
  {
    q: "Do you offer installation services?",
    a: "Yes, we provide installation for all appliances including ACs, geysers, water purifiers, ceiling fans, washing machines, and more. Installation comes with a workmanship warranty.",
  },
  {
    q: "Can I order products online?",
    a: "Yes! Browse our Shop section and place an order. We deliver within 25 km of Gorakhpur, usually the same day or next day. We also offer installation for purchased products.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept Cash, UPI (Google Pay, PhonePe, Paytm, BHIM), Net Banking, and Credit/Debit cards. All transactions are secure and you receive a proper invoice.",
  },
];

export const SERVICE_AREAS = [
  "Golghar", "Civil Lines", "Mohaddipur", "Rapti Nagar", "Shahpur",
  "Taramandal", "Padri Bazar", "Rustampur", "Maheva", "Jungle Dharamshala",
  "Betiahata", "Gorakhpur Cantt", "Medical College Road", "Devaria",
  "Kushinagar Road",
];

export const WHY_CHOOSE = [
  { icon: "Clock", title: "Same Day Service", desc: "Book before noon and get a technician at your door the same day" },
  { icon: "Award", title: "Certified Technicians", desc: "All our technicians are trained, verified, and background-checked" },
  { icon: "IndianRupee", title: "Affordable Pricing", desc: "Transparent pricing with no hidden charges — you know the cost upfront" },
  { icon: "ShieldCheck", title: "Genuine Spare Parts", desc: "Only original OEM-compatible parts — never cheap substitutes" },
  { icon: "MapPin", title: "Doorstep Service", desc: "We come to you — no need to carry heavy appliances anywhere" },
  { icon: "Zap", title: "Fast Response", desc: "Average response time under 30 minutes from booking to confirmation" },
  { icon: "Users", title: "Trusted Local Business", desc: "Serving Gorakhpur families since 2018 — 5,000+ happy customers" },
  { icon: "ThumbsUp", title: "100% Satisfaction", desc: "Not happy? We come back and fix it free — no questions asked" },
];
