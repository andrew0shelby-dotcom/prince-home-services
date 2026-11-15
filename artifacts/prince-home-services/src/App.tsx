import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import Home from '@/pages/Home';
import Admin from '@/pages/Admin';
import AboutPage from '@/pages/About';
import StorePage from '@/pages/Store';
import ProductPage from '@/pages/Product';
import CheckoutPage from '@/pages/Checkout';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { useEffect } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ProductProvider } from '@/contexts/ProductContext';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={AboutPage} />
      <Route path="/store" component={StorePage} />
      <Route path="/store/:slug" component={ProductPage} />
      <Route path="/checkout/:slug" component={CheckoutPage} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="phs-theme">
      <QueryClientProvider client={queryClient}>
        <ProductProvider>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </ProductProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
