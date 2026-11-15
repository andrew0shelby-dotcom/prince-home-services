# Prince Home Services

A polished, mobile-first website for a local home services business. The app is built with React, TypeScript, Vite, Tailwind CSS, and shadcn-style UI components.

## Features

- Service overview and hero section
- Booking and contact sections
- Product/shop experience for service items
- FAQ, testimonials, and service-area information
- Admin page for editing the product catalog locally

## Local development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open the URL shown in the terminal (usually http://localhost:5173).

## Production build

```bash
npm run build
```

## Environment variables

No external API keys are required for the standard local experience. If you want to customize the site, you can optionally create a .env file with:

```env
PORT=5173
BASE_PATH=/
```

## Notes

- The site is fully client-side and runs without a Replit backend or database.
- The admin page edits the local product data in the browser session.
