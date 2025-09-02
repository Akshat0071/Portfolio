
import React, { Suspense, useEffect, lazy, useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';

// Lazy load below-the-fold components
const AboutSection = lazy(() => import('@/components/AboutSection'));
const ProjectsSection = lazy(() => import('@/components/ProjectsSection'));
const SkillsSection = lazy(() => import('@/components/SkillsSection'));
const AchievementsSection = lazy(() => import('@/components/AchievementsSection'));
const ContactSection = lazy(() => import('@/components/ContactSection'));
const Footer = lazy(() => import('@/components/Footer'));

// Loading component for Suspense fallback
const SectionLoadingFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-portfolio-blue dark:border-portfolio-cyan"></div>
  </div>
);

const Index = () => {
  useEffect(() => {
    // Set page title
    document.title = "Akshat Bansal | Full-Stack Developer & Cloud Computing Enthusiast";
    
    // Add smooth scroll behavior for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const href = this.getAttribute('href');
        if (href) {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      });
    });
    
    // Add scroll animation
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => {
      el.classList.add('opacity-0');
    });
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    elements.forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      elements.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);
  
  const [isVisible, setIsVisible] = useState({
    about: false,
    projects: false,
    skills: false,
    achievements: false,
    contact: false,
    footer: false
  });

  // Set up intersection observers for lazy loading
  useEffect(() => {
    const sections = {
      about: document.getElementById('about'),
      projects: document.getElementById('projects'),
      skills: document.getElementById('skills'),
      achievements: document.getElementById('achievements'),
      contact: document.getElementById('contact'),
      footer: document.querySelector('footer')
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sectionId) {
              setIsVisible(prev => ({
                ...prev,
                [sectionId]: true
              }));
              // Stop observing once the section is loaded
              observer.unobserve(entry.target);
            } else if (entry.target.tagName === 'FOOTER') {
              setIsVisible(prev => ({
                ...prev,
                footer: true
              }));
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        rootMargin: '200px', // Start loading when within 200px of viewport
        threshold: 0.1
      }
    );

    // Start observing all sections
    Object.values(sections).forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      Object.values(sections).forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        
        {/* About Section */}
        <div id="about">
          <Suspense fallback={<SectionLoadingFallback />}>
            {isVisible.about && <AboutSection />}
          </Suspense>
        </div>
        
        {/* Projects Section */}
        <div id="projects">
          <Suspense fallback={<SectionLoadingFallback />}>
            {isVisible.projects && <ProjectsSection />}
          </Suspense>
        </div>
        
        {/* Skills Section */}
        <div id="skills">
          <Suspense fallback={<SectionLoadingFallback />}>
            {isVisible.skills && <SkillsSection />}
          </Suspense>
        </div>
        
        {/* Achievements Section */}
        <div id="achievements">
          <Suspense fallback={<SectionLoadingFallback />}>
            {isVisible.achievements && <AchievementsSection />}
          </Suspense>
        </div>
        
        {/* Contact Section */}
        <div id="contact">
          <Suspense fallback={<SectionLoadingFallback />}>
            {isVisible.contact && <ContactSection />}
          </Suspense>
        </div>
      </main>
      
      {/* Footer */}
      <Suspense fallback={null}>
        {isVisible.footer && <Footer />}
      </Suspense>
    </div>
  );
};

export default Index;
