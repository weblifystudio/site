import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-30 ${
        isVisible ? 'scale-100' : 'scale-0'
      }`}
      size="icon"
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  );
}
