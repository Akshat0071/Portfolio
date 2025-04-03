
import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check user preference
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
      toast({
        title: "Light mode activated!",
        description: "The portfolio is now in light mode.",
      });
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
      toast({
        title: "Dark mode activated!",
        description: "The portfolio is now in dark mode.",
      });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Offset for header height
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between py-4 md:py-6">
          <div className="flex items-center">
            <a href="#" className="text-2xl font-heading font-bold text-foreground">
              <span className="text-portfolio-blue dark:text-portfolio-cyan">A</span>kshat
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('about')} className="nav-link">About</button>
            <button onClick={() => scrollToSection('projects')} className="nav-link">Projects</button>
            <button onClick={() => scrollToSection('skills')} className="nav-link">Skills</button>
            <button onClick={() => scrollToSection('achievements')} className="nav-link">Achievements</button>
            <button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button>
          </nav>
          
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme} 
              className="rounded-full"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu} 
              className="md:hidden ml-2 p-2 rounded-md focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <div className="relative w-6 h-5">
                <span className={`absolute block w-full h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'} top-0`}></span>
                <span className={`absolute block w-full h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45' : ''} top-2`}></span>
                <span className={`absolute block w-full h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45' : ''} top-2`}></span>
                <span className={`absolute block w-full h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'} bottom-0`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div className={`md:hidden absolute w-full bg-background/95 backdrop-blur-md shadow-md transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 invisible'}`}>
        <div className="px-4 py-2">
          <button onClick={() => scrollToSection('about')} className="block w-full text-left py-3 border-b border-gray-200 dark:border-gray-700">About</button>
          <button onClick={() => scrollToSection('projects')} className="block w-full text-left py-3 border-b border-gray-200 dark:border-gray-700">Projects</button>
          <button onClick={() => scrollToSection('skills')} className="block w-full text-left py-3 border-b border-gray-200 dark:border-gray-700">Skills</button>
          <button onClick={() => scrollToSection('achievements')} className="block w-full text-left py-3 border-b border-gray-200 dark:border-gray-700">Achievements</button>
          <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-3">Contact</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
