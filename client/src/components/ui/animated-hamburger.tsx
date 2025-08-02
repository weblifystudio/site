// import { motion } from 'framer-motion';

interface AnimatedHamburgerProps {
  isOpen: boolean;
  className?: string;
}

export default function AnimatedHamburger({ isOpen, className = "" }: AnimatedHamburgerProps) {
  return (
    <div className={`w-6 h-6 flex flex-col justify-center items-center ${className}`}>
      <div className="w-6 h-6 relative flex flex-col justify-center items-center">
        {/* Hamburger simplifié sans framer-motion */}
        <div
          className={`w-5 h-0.5 bg-current absolute rounded-full origin-center transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-0' : 'rotate-0 -translate-y-1.5'
          }`}
        />
        
        <div
          className={`w-5 h-0.5 bg-current absolute rounded-full origin-center transition-all duration-300 ${
            isOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
          }`}
        />
        
        <div
          className={`w-5 h-0.5 bg-current absolute rounded-full origin-center transition-all duration-300 ${
            isOpen ? '-rotate-45 translate-y-0' : 'rotate-0 translate-y-1.5'
          }`}
        />
      </div>
    </div>
  );
}