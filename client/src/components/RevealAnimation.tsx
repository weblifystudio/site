import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ReactNode } from 'react';

interface RevealAnimationProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function RevealAnimation({ children, delay = 0, className = '' }: RevealAnimationProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`reveal-animation ${isVisible ? 'revealed' : ''} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}