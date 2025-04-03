
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  github: string;
  demo?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Eco-Navigator",
    description: "AI-powered lifestyle tracker that provides eco-friendly recommendations and helps users reduce their carbon footprint. Features OAuth authentication and cloud-based storage.",
    tags: ["React", "Node.js", "AI", "MongoDB", "OAuth"],
    image: "",
    github: "https://github.com/akshat-bansal",
    demo: "https://eco-navigator.example.com"
  },
  {
    id: 2,
    title: "Gaming Website",
    description: "An interactive gaming platform built with responsive design principles, allowing users to discover and engage with different games.",
    tags: ["HTML", "CSS", "JavaScript", "Node.js"],
    image: "",
    github: "https://github.com/akshat-bansal",
    demo: "https://gaming.example.com"
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "A modern portfolio website (this site) built with React and Tailwind CSS to showcase my projects and skills.",
    tags: ["React", "Tailwind CSS", "TypeScript"],
    image: "",
    github: "https://github.com/akshat-bansal",
  },
];

const ProjectsSection = () => {
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
    <section id="projects" className="py-20" ref={sectionRef}>
      <div className="section-container">
        <h2 className="section-title mb-12 opacity-0 animate-on-scroll">
          My <span className="gradient-text">Projects</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.id}
              className="project-card opacity-0 animate-on-scroll overflow-hidden"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="h-48 bg-gradient-to-br from-portfolio-blue/80 to-portfolio-purple/80 flex items-center justify-center text-white text-2xl font-bold">
                {project.title}
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </CardHeader>
              
              <CardContent>
                <CardDescription className="text-base text-foreground/70">
                  {project.description}
                </CardDescription>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" asChild>
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </a>
                </Button>
                
                {project.demo && (
                  <Button size="sm" className="bg-portfolio-blue hover:bg-portfolio-blue/90" asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center opacity-0 animate-on-scroll">
          <p className="mb-6 text-lg">
            Want to see more of my work? Check out my GitHub profile for all my projects.
          </p>
          <Button 
            variant="default" 
            size="lg"
            asChild
          >
            <a href="https://github.com/akshat-bansal" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
              <Github className="mr-2 h-5 w-5" />
              View All Projects
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
