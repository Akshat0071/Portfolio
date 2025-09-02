import React from 'react';
import { Github, Heart, Linkedin, Mail, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-portfolio-cyan">A</span>kshat Bansal
            </h3>
            <p className="text-gray-400 mb-4">
              Full-Stack Developer & Cloud Computing Enthusiast, building innovative web applications and cloud solutions.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/in/akshat-bansal04/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://github.com/Akshat0071" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="GitHub Profile"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://x.com/home" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="X (Twitter) Profile"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="mailto:akshatbansal04@gmail.com" 
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors duration-200">About Me</a>
              </li>
              <li>
                <a href="#projects" className="text-gray-400 hover:text-white transition-colors duration-200">Projects</a>
              </li>
              <li>
                <a href="#skills" className="text-gray-400 hover:text-white transition-colors duration-200">Skills</a>
              </li>
              <li>
                <a href="#achievements" className="text-gray-400 hover:text-white transition-colors duration-200">Achievements</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors duration-200">Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Get In Touch</h3>
            <p className="text-gray-400 mb-2">
              Baddi, Himachal Pradesh, India
            </p>
            <p className="text-gray-400 mb-2">
              akshatbansal04@gmail.com
            </p>
            <p className="text-gray-400">
              +91 8219890171
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center">
            © {currentYear} Akshat Bansal. All Rights Reserved. Made with 
            <Heart className="h-4 w-4 mx-1 text-red-500 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
