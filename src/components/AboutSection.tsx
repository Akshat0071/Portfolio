
import React, { useEffect, useRef } from 'react';
import { Award, Calendar, Code, Cpu, GraduationCap, Map } from 'lucide-react';

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
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
    
    const animatedElements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    animatedElements?.forEach((el) => observer.observe(el));
    
    return () => {
      animatedElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900" ref={sectionRef}>
      <div className="section-container">
        <h2 className="section-title mb-12 opacity-0 animate-on-scroll">
          About <span className="gradient-text">Me</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="opacity-0 animate-on-scroll">
            <h3 className="text-2xl font-bold mb-4 text-portfolio-blue dark:text-portfolio-cyan">
              My Story
            </h3>
            <div className="space-y-4 text-base lg:text-lg">
              <p>
                Hello! I'm Akshat Bansal, a passionate Full-Stack Developer with expertise in JavaScript and the MERN stack. 
                I'm deeply interested in Cloud Computing and System Design, constantly exploring new technologies and methodologies.
              </p>
              <p>
                My journey in technology began during my undergraduate studies, where I developed a strong foundation in computer science fundamentals. 
                Since then, I've been building web applications that are not only functional but also provide exceptional user experiences.
              </p>
              <p>
                I believe in writing clean, maintainable code and following best practices in software development. 
                My approach involves understanding the business requirements thoroughly and then crafting elegant solutions that meet those needs.
              </p>
            </div>
          </div>
          
          <div className="opacity-0 animate-on-scroll" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl font-bold mb-4 text-portfolio-blue dark:text-portfolio-cyan">
              Education & Interests
            </h3>
            
            <div className="mb-8">
              <div className="flex items-start mb-4">
                <div className="mt-1 mr-4 p-2 bg-portfolio-blue/10 dark:bg-portfolio-blue/20 rounded-full">
                  <GraduationCap className="h-6 w-6 text-portfolio-blue dark:text-portfolio-cyan" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">B.Tech, Computer Science & Engineering</h4>
                  <p className="text-muted-foreground">Chitkara University, Baddi</p>
                </div>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-4 text-portfolio-blue dark:text-portfolio-cyan">
              Key Focus Areas
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <div className="p-2 mr-3 bg-portfolio-blue/10 dark:bg-portfolio-blue/20 rounded-full">
                  <Code className="h-5 w-5 text-portfolio-blue dark:text-portfolio-cyan" />
                </div>
                <span>Full-Stack Development</span>
              </div>
              
              <div className="flex items-center">
                <div className="p-2 mr-3 bg-portfolio-blue/10 dark:bg-portfolio-blue/20 rounded-full">
                  <Cpu className="h-5 w-5 text-portfolio-blue dark:text-portfolio-cyan" />
                </div>
                <span>Cloud Computing</span>
              </div>
              
              <div className="flex items-center">
                <div className="p-2 mr-3 bg-portfolio-blue/10 dark:bg-portfolio-blue/20 rounded-full">
                  <Map className="h-5 w-5 text-portfolio-blue dark:text-portfolio-cyan" />
                </div>
                <span>System Design</span>
              </div>
              
              <div className="flex items-center">
                <div className="p-2 mr-3 bg-portfolio-blue/10 dark:bg-portfolio-blue/20 rounded-full">
                  <Award className="h-5 w-5 text-portfolio-blue dark:text-portfolio-cyan" />
                </div>
                <span>Competitive Programming</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
