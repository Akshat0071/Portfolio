import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail, MapPin, MessageSquare, Phone, Twitter } from 'lucide-react';
import { toast } from 'sonner';

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        toast('Message Sent!', {
          description: "Thank you for contacting me. I'll get back to you soon.",
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        setIsSubmitting(false);
      }, 1500);
    }
  };
  
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
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900" ref={sectionRef}>
      <div className="section-container">
        <h2 className="section-title mb-12 opacity-0 animate-on-scroll">
          Get in <span className="gradient-text">Touch</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-10">
          <div className="opacity-0 animate-on-scroll">
            <h3 className="text-2xl font-bold mb-6 text-portfolio-blue dark:text-portfolio-cyan">
              Contact Information
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="mr-4 p-3 bg-portfolio-blue/10 dark:bg-portfolio-blue/20 rounded-full">
                  <Mail className="h-5 w-5 text-portfolio-blue dark:text-portfolio-cyan" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Email</h4>
                  <a 
                    href="mailto:akshatbansal04@gmail.com" 
                    className="text-portfolio-blue dark:text-portfolio-cyan hover:underline"
                  >
                    akshatbansal04@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 p-3 bg-portfolio-blue/10 dark:bg-portfolio-blue/20 rounded-full">
                  <Phone className="h-5 w-5 text-portfolio-blue dark:text-portfolio-cyan" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Phone</h4>
                  <p>+91 8219890171</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 p-3 bg-portfolio-blue/10 dark:bg-portfolio-blue/20 rounded-full">
                  <MapPin className="h-5 w-5 text-portfolio-blue dark:text-portfolio-cyan" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Location</h4>
                  <p>Baddi, Himachal Pradesh, India</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://www.linkedin.com/in/akshat-bansal04/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-5 w-5 text-blue-600" />
                </a>
                <a 
                  href="https://github.com/Akshat0071" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a 
                  href="https://x.com/home" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
                  aria-label="X (Twitter) Profile"
                >
                  <Twitter className="h-5 w-5 text-blue-400" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Right column replaced: WhatsApp CTA instead of form */}
          <div className="opacity-0 animate-on-scroll" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl font-bold mb-6 text-portfolio-blue dark:text-portfolio-cyan">
              Chat on WhatsApp
            </h3>
            <p className="text-muted-foreground mb-6">
              Prefer messaging? Reach me instantly on WhatsApp.
            </p>
            <a 
              href="https://wa.me/918219890171" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-medium shadow-sm transition-all duration-200 hover:-translate-y-0.5"
              aria-label="Message on WhatsApp"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 mr-2" aria-hidden="true">
                <path d="M20.52 3.48A11.78 11.78 0 0012.06 0C5.45 0 .08 5.37.08 12c0 2.1.55 4.14 1.6 5.94L0 24l6.2-1.62A11.86 11.86 0 0012.06 24c6.62 0 12-5.37 12-12 0-3.2-1.25-6.2-3.54-8.52zM12.06 22.1c-1.88 0-3.72-.5-5.32-1.44l-.38-.22-3.68.96.98-3.58-.25-.38A9.9 9.9 0 012.02 12c0-5.52 4.52-10.02 10.04-10.02 2.7 0 5.24 1.06 7.16 2.98a9.88 9.88 0 012.92 7.06c0 5.52-4.5 10.08-10.08 10.08zm5.84-7.36c-.32-.16-1.88-.92-2.16-1.02-.28-.1-.48-.16-.68.16-.2.32-.78 1.02-.96 1.24-.18.22-.36.24-.68.08-.32-.16-1.34-.5-2.56-1.6-.94-.84-1.58-1.88-1.76-2.2-.18-.32-.02-.48.14-.64.14-.14.32-.36.48-.54.16-.18.2-.32.32-.54.1-.22.06-.4-.02-.56-.08-.16-.68-1.64-.94-2.26-.25-.6-.52-.52-.68-.52h-.58c-.2 0-.52.08-.8.4-.28.32-1.06 1.04-1.06 2.54s1.08 2.94 1.24 3.14c.16.2 2.16 3.28 5.24 4.6.74.32 1.32.52 1.78.66.74.24 1.42.2 1.96.12.6-.08 1.88-.76 2.16-1.5.28-.74.28-1.38.2-1.52-.08-.16-.28-.24-.6-.4z"/>
              </svg>
              Message me on WhatsApp
            </a>
            <p className="mt-3 text-sm text-muted-foreground">
              WhatsApp: +91 8219890171
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
