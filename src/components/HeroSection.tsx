
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Mail } from 'lucide-react';

const TypedText = ({ texts }: { texts: string[] }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  useEffect(() => {
    const text = texts[currentTextIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < text.length) {
          setCurrentText(text.substring(0, currentText.length + 1));
          setTypingSpeed(150);
        } else {
          setIsDeleting(true);
          setTypingSpeed(100);
          setTimeout(() => {}, 1000);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(text.substring(0, currentText.length - 1));
          setTypingSpeed(50);
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((currentTextIndex + 1) % texts.length);
        }
      }
    }, typingSpeed);
    
    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, texts, typingSpeed]);
  
  return (
    <span className="typed-text animate-cursor-blink">
      {currentText}
    </span>
  );
};

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  const typerTexts = [
    "Full-Stack Developer",
    "Cloud Computing Enthusiast",
    "MERN Stack Developer",
    "System Designer",
  ];
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
        }
      },
      { threshold: 0.1 }
    );
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);
  
  const downloadResume = () => {
    // In a real implementation, this would download the actual resume
    alert("Resume download functionality will be implemented");
  };
  
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col justify-center pt-16 bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-black" ref={heroRef}>
      <div className="section-container flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
          <p className="text-lg md:text-xl text-portfolio-blue dark:text-portfolio-cyan mb-3 opacity-0 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            Hello, I'm
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 opacity-0 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            Akshat Bansal
          </h1>
          <div className="text-xl md:text-2xl font-medium mb-6 opacity-0 animate-fadeIn h-12" style={{ animationDelay: '0.6s' }}>
            <div className="type-container">
              <TypedText texts={typerTexts} />
            </div>
          </div>
          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl opacity-0 animate-fadeIn" style={{ animationDelay: '0.8s' }}>
            Building robust web applications and cloud solutions with a focus on performance, 
            scalability, and user experience. Passionate about creating technology that makes a difference.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 opacity-0 animate-fadeIn" style={{ animationDelay: '1s' }}>
            <Button onClick={downloadResume} className="button-blue w-full sm:w-auto">
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
            <Button onClick={scrollToContact} variant="outline" className="button-outline w-full sm:w-auto">
              <Mail className="mr-2 h-4 w-4" />
              Let's Connect
            </Button>
          </div>
        </div>
        
        <div className="md:w-1/2 flex justify-center md:justify-end opacity-0 animate-fadeIn" style={{ animationDelay: '1.2s' }}>
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-portfolio-blue dark:border-portfolio-cyan shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
            {/* Replace with actual profile image */}
            <div className="absolute inset-0 bg-gradient-to-br from-portfolio-blue to-portfolio-purple flex items-center justify-center text-white text-6xl font-bold">
              AB
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-foreground flex items-start justify-center">
          <div className="w-1 h-2 bg-foreground mt-2 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
