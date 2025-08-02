import React from "react";
import { Route, Switch } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

// Import pages
import Home from "@/pages/home";
import Services from "@/pages/services";
import Portfolio from "@/pages/portfolio";
import About from "@/pages/about";
import FAQ from "@/pages/faq";
import Contact from "@/pages/contact";
import Blog from "@/pages/blog";
import Legal from "@/pages/legal";
import Privacy from "@/pages/privacy";
import CGV from "@/pages/cgv";
import Cookies from "@/pages/cookies";
import NotFound from "@/pages/not-found";

// Import components
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/ui/cookie-banner";
import BackToTop from "@/components/ui/back-to-top";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/offres" component={Services} />
            <Route path="/realisations" component={Portfolio} />
            <Route path="/a-propos" component={About} />
            <Route path="/faq" component={FAQ} />
            <Route path="/contact" component={Contact} />
            <Route path="/blog" component={Blog} />
            <Route path="/mentions-legales" component={Legal} />
            <Route path="/politique-confidentialite" component={Privacy} />
            <Route path="/cgv" component={CGV} />
            <Route path="/cookies" component={Cookies} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
        <BackToTop />
        <CookieBanner />
      </div>
    </QueryClientProvider>
  );
}

export default App;