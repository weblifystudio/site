import { Switch, Route } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "@/components/ui/theme-provider";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Services from "@/pages/services";
import Portfolio from "@/pages/portfolio";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";

import About from "@/pages/about";
import FAQ from "@/pages/faq";
import Contact from "@/pages/contact-simple";
import Legal from "@/pages/legal";
import CGV from "@/pages/cgv";
import Privacy from "@/pages/privacy";
import Cookies from "@/pages/cookies";
import NewsletterAdmin from "@/pages/newsletter-admin";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/back-to-top";
import CookieBanner from "@/components/ui/cookie-banner";

import ReadingProgress from "@/components/ReadingProgress";
import { initGA } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";

function Router() {
  // Track page views when routes change
  useAnalytics();
  
  // Optimisations performance au démarrage
  useEffect(() => {
    // Précharge des images critiques (hero section)
    const criticalImages = [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop&q=80'
    ];
    
    criticalImages.forEach((url) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      document.head.appendChild(link);
    });
  }, []);
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/offres" component={Services} />
      <Route path="/realisations" component={Portfolio} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/a-propos" component={About} />
      <Route path="/faq" component={FAQ} />
      <Route path="/contact" component={Contact} />
      <Route path="/mentions-legales" component={Legal} />
      <Route path="/cgv" component={CGV} />
      <Route path="/politique-confidentialite" component={Privacy} />
      <Route path="/cookies" component={Cookies} />
      <Route path="/newsletter-admin" component={NewsletterAdmin} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Initialize Google Analytics when app loads
  useEffect(() => {
    // Check if analytics cookies are enabled
    const cookiePrefs = localStorage.getItem('cookiePreferences');
    const analyticsEnabled = cookiePrefs ? JSON.parse(cookiePrefs).analytics : false;
    
    // Verify required environment variable is present
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    } else if (analyticsEnabled) {
      initGA();
    }

    // Listen for cookie preference changes
    const handleCookieUpdate = (event: CustomEvent) => {
      if (event.detail.analytics && import.meta.env.VITE_GA_MEASUREMENT_ID) {
        initGA();
      }
    };

    window.addEventListener('cookiePreferencesUpdated', handleCookieUpdate as EventListener);
    
    // Enregistrer le service worker pour la mise en cache
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker enregistré:', registration.scope);
        })
        .catch(error => {
          console.log('Échec Service Worker:', error);
        });
    }
    
    return () => {
      window.removeEventListener('cookiePreferencesUpdated', handleCookieUpdate as EventListener);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="min-h-screen flex flex-col">
          <ReadingProgress />
          <Header />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
          <BackToTop />
          <CookieBanner />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
