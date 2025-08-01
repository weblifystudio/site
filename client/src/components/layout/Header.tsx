import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export default function Header() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Offres', href: '/offres' },
    { name: 'Réalisations', href: '/realisations' },
    { name: 'Blog', href: '/blog' },
    { name: 'À propos', href: '/a-propos' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md border-b border-border z-40 transition-all duration-300 ${isScrolled ? 'header-compact' : ''}`}>
      <div className={`container mx-auto px-6 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center" onClick={scrollToTop}>
            <svg 
              viewBox="0 0 280 45" 
              className="h-8 sm:h-10 w-auto text-foreground dark:text-white transition-colors"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <style>{`
                  .logo-text { 
                    font-family: 'Inter', 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                    font-weight: 700; 
                    font-size: 28px;
                    fill: currentColor;
                    letter-spacing: -0.5px;
                  }
                  .logo-icon { 
                    fill: #4c82ee; 
                  }
                `}</style>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor:"#4c82ee", stopOpacity:1}} />
                  <stop offset="100%" style={{stopColor:"#2563eb", stopOpacity:1}} />
                </linearGradient>
              </defs>
              
              <g className="logo-icon">
                <rect x="3" y="6" width="32" height="32" rx="6" fill="url(#logoGradient)"/>
                <path d="M 10 16 L 14 28 L 18 20 L 22 28 L 26 16" 
                      stroke="white" 
                      strokeWidth="2.5" 
                      fill="none" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"/>
                <circle cx="30" cy="14" r="2.5" fill="#4c82ee"/>
              </g>
              
              <text x="42" y="30" className="logo-text">Weblify Studio</text>
            </svg>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={scrollToTop}
                className={`header-link transition-colors duration-200 ${
                  location === item.href
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="h-10 w-10"
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-3 pt-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    scrollToTop();
                  }}
                  className={`header-link py-2 transition-colors duration-200 ${
                    location === item.href
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
