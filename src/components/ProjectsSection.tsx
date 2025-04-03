import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, X } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  github: string;
  demo?: string;
  features?: string[];
  technologies?: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Eco-Navigator",
    description: "AI-powered lifestyle tracker that provides eco-friendly recommendations and helps users reduce their carbon footprint. Features OAuth authentication and cloud-based storage.",
    tags: ["React", "Node.js", "AI", "MongoDB", "OAuth"],
    image: "/projects/eco-navigator.png",
    github: "https://github.com/Akshat0071/Eco-Navigator",
    demo: "https://eco-navigator-demo.vercel.app",
    features: [
      "AI-powered recommendations",
      "OAuth authentication",
      "Carbon footprint tracking",
      "Interactive dashboard",
      "Real-time data visualization"
    ],
    technologies: [
      "React.js",
      "Node.js",
      "MongoDB",
      "TensorFlow.js",
      "AWS"
    ]
  },
  {
    id: 2,
    title: "Gaming Website",
    description: "An interactive gaming platform built with responsive design principles, allowing users to discover and engage with different games.",
    tags: ["HTML", "CSS", "JavaScript", "Node.js"],
    image: "/projects/gaming-website.jpg",
    github: "https://github.com/Akshat0071/Gaming-Website",
    demo: "https://gaming-website-demo.vercel.app",
    features: [
      "Responsive design",
      "Game categories",
      "User profiles",
      "Leaderboards",
      "Multiplayer support"
    ],
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Node.js",
      "Socket.io"
    ]
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "A modern portfolio website (this site) built with React and Tailwind CSS to showcase my projects and skills.",
    tags: ["React", "Tailwind CSS", "TypeScript"],
    image: "/projects/portfolio.png",
    github: "https://github.com/Akshat0071",
    features: [
      "Responsive design",
      "Dark mode support",
      "Interactive animations",
      "Project showcase",
      "Contact form"
    ],
    technologies: [
      "React.js",
      "Tailwind CSS",
      "TypeScript",
      "Framer Motion",
      "React Query"
    ]
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

  const handleDemoClick = (project: Project) => {
    if (project.demo) {
      window.open(project.demo, '_blank');
    } else {
      setSelectedProject(project);
    }
  };

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
              className="project-card opacity-0 animate-on-scroll overflow-hidden hover:shadow-lg transition-shadow duration-300"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/projects/placeholder.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <h3 className="text-white text-xl font-bold">{project.title}</h3>
                </div>
              </div>
              
              <CardHeader>
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
                
                <Button 
                  size="sm" 
                  className="bg-portfolio-blue hover:bg-portfolio-blue/90"
                  onClick={() => handleDemoClick(project)}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {project.demo ? 'Live Demo' : 'View Details'}
                </Button>
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
            <a href="https://github.com/Akshat0071" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
              <Github className="mr-2 h-5 w-5" />
              View All Projects
            </a>
          </Button>
        </div>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
                <DialogDescription className="text-base">
                  {selectedProject.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Key Features</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedProject.features?.map((feature, index) => (
                      <li key={index} className="text-foreground/70">{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies?.map((tech, index) => (
                      <Badge key={index} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end gap-4 pt-4">
                  <Button variant="outline" asChild>
                    <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      View Code
                    </a>
                  </Button>
                  {selectedProject.demo && (
                    <Button asChild>
                      <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsSection;
