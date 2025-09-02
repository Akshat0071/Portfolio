import { Suspense, lazy } from 'react';
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';
import { reportWebVitals, trackPageView, trackWebVitals } from "@/lib/performance";
import SEO from "./components/seo/SEO";
import PortfolioStructuredData from "./components/seo/PortfolioStructuredData";

// Lazy load pages
const Index = lazy(() => import('./pages/Index'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading component for Suspense fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-portfolio-blue dark:border-portfolio-cyan"></div>
  </div>
);

const queryClient = new QueryClient();

// Track page views and performance metrics
const AppContent = () => {
  const location = useLocation();

  // Track page views and performance metrics
  useEffect(() => {
    trackPageView(location.pathname);
    
    // Report Web Vitals
    reportWebVitals((metric) => {
      trackWebVitals(metric);
    });
  }, [location]);

  return (
    <>
      <SEO />
      <PortfolioStructuredData />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <AppContent />
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
