
import React, { useEffect, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SkillCategory {
  name: string;
  skills: Skill[];
}

interface Skill {
  name: string;
  icon: string;
  level: number; // 1-5
  color?: string;
}

const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    skills: [
      { name: "React.js", icon: "⚛️", level: 5, color: "text-blue-500" },
      { name: "HTML5", icon: "🌐", level: 5 },
      { name: "CSS3", icon: "🎨", level: 4 },
      { name: "JavaScript", icon: "📜", level: 5, color: "text-yellow-500" },
      { name: "TypeScript", icon: "🔷", level: 4 },
      { name: "Tailwind CSS", icon: "🌊", level: 4, color: "text-cyan-500" }
    ]
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", icon: "🟢", level: 5, color: "text-green-500" },
      { name: "Express.js", icon: "🔄", level: 4 },
      { name: "RESTful APIs", icon: "🔌", level: 5 },
      { name: "GraphQL", icon: "◢", level: 3, color: "text-pink-500" }
    ]
  },
  {
    name: "Database",
    skills: [
      { name: "MongoDB", icon: "🍃", level: 5, color: "text-green-600" },
      { name: "SQL", icon: "💾", level: 4 },
      { name: "Redis", icon: "🔴", level: 3, color: "text-red-500" }
    ]
  },
  {
    name: "Cloud",
    skills: [
      { name: "AWS", icon: "☁️", level: 4, color: "text-orange-500" },
      { name: "Docker", icon: "🐳", level: 4, color: "text-blue-500" },
      { name: "CI/CD", icon: "🔄", level: 3 }
    ]
  },
  {
    name: "Tools",
    skills: [
      { name: "Git", icon: "📊", level: 5 },
      { name: "GitHub", icon: "🐙", level: 5 },
      { name: "Firebase", icon: "🔥", level: 4, color: "text-yellow-600" },
      { name: "VS Code", icon: "📝", level: 5, color: "text-blue-500" }
    ]
  }
];

const SkillBar = ({ level }: { level: number }) => {
  const bars = [];
  for (let i = 0; i < 5; i++) {
    bars.push(
      <div 
        key={i} 
        className={`h-2 w-4 rounded-sm ${i < level ? 'bg-portfolio-blue dark:bg-portfolio-cyan' : 'bg-gray-200 dark:bg-gray-700'}`}
      ></div>
    );
  }
  return <div className="flex space-x-1 mt-1">{bars}</div>;
};

const SkillsSection = () => {
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
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900" ref={sectionRef}>
      <div className="section-container">
        <h2 className="section-title mb-12 opacity-0 animate-on-scroll">
          My <span className="gradient-text">Skills</span>
        </h2>
        
        <div className="opacity-0 animate-on-scroll">
          <Tabs defaultValue="Frontend" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
              {skillCategories.map(category => (
                <TabsTrigger 
                  key={category.name} 
                  value={category.name}
                  className="text-base"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {skillCategories.map(category => (
              <TabsContent key={category.name} value={category.name} className="mt-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {category.skills.map((skill, index) => (
                    <div 
                      key={skill.name} 
                      className="animated-skill bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-2">{skill.icon}</span>
                        <h3 className={`text-lg font-medium ${skill.color || ''}`}>{skill.name}</h3>
                      </div>
                      <SkillBar level={skill.level} />
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        <div className="mt-16 opacity-0 animate-on-scroll">
          <h3 className="text-2xl font-bold mb-8 text-center">My Development Process</h3>
          
          <div className="relative">
            {/* Process Timeline */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 dark:bg-gray-700"></div>
            
            <div className="space-y-12 md:space-y-0">
              {[
                { 
                  step: "Research & Planning", 
                  description: "Understanding requirements, researching solutions, and planning architecture" 
                },
                { 
                  step: "Design & Prototyping", 
                  description: "Creating wireframes and interactive prototypes for user validation" 
                },
                { 
                  step: "Development", 
                  description: "Writing clean, maintainable code with best practices and proper testing" 
                },
                { 
                  step: "Testing & Deployment", 
                  description: "Thorough testing and seamless deployment with CI/CD pipelines" 
                }
              ].map((process, index) => (
                <div 
                  key={process.step} 
                  className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right md:pr-10' : 'md:text-left md:pl-10'}`}>
                    <h4 className="text-xl font-bold mb-2 text-portfolio-blue dark:text-portfolio-cyan">
                      {process.step}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {process.description}
                    </p>
                  </div>
                  
                  <div className="hidden md:flex items-center justify-center w-8 h-8 bg-portfolio-blue dark:bg-portfolio-cyan rounded-full my-4 md:my-0 relative z-10">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-left md:pl-10' : 'md:text-right md:pr-10'}`}>
                    {/* Empty div for layout purposes */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
