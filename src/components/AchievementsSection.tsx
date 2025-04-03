
import React, { useEffect, useRef } from 'react';
import { Award, Book, Medal, Trophy } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  year: string;
}

const achievements: Achievement[] = [
  {
    id: 1,
    title: "Toastmasters Leadership Role",
    description: "Held a leadership position in the university Toastmasters club, organizing events and mentoring new members.",
    icon: <Award className="h-8 w-8 text-portfolio-blue dark:text-portfolio-cyan" />,
    year: "2022"
  },
  {
    id: 2,
    title: "Entrepreneurship Cell Committee",
    description: "Active member of the university's Entrepreneurship Cell, helping organize startup events and workshops.",
    icon: <Trophy className="h-8 w-8 text-portfolio-yellow dark:text-portfolio-yellow" />,
    year: "2021-2022"
  },
  {
    id: 3,
    title: "AWS Cloud Practitioner Certification",
    description: "Earned AWS Certified Cloud Practitioner certification, demonstrating knowledge of AWS Cloud services.",
    icon: <Medal className="h-8 w-8 text-portfolio-purple dark:text-portfolio-purple" />,
    year: "2023"
  },
  {
    id: 4,
    title: "University Project Recognition",
    description: "Received recognition for key university project implementing innovative solutions for real-world problems.",
    icon: <Book className="h-8 w-8 text-portfolio-pink dark:text-portfolio-pink" />,
    year: "2022"
  }
];

const AchievementsSection = () => {
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
    <section id="achievements" className="py-20" ref={sectionRef}>
      <div className="section-container">
        <h2 className="section-title mb-12 opacity-0 animate-on-scroll">
          <span className="gradient-text">Achievements</span> & Certifications
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <Card 
              key={achievement.id} 
              className="opacity-0 animate-on-scroll hover:shadow-md transition-all duration-300"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader className="flex flex-row items-start space-x-4 pb-2">
                <div className="p-2 bg-secondary rounded-full">
                  {achievement.icon}
                </div>
                <div>
                  <CardTitle className="text-xl">{achievement.title}</CardTitle>
                  <CardDescription className="text-sm">{achievement.year}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{achievement.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 opacity-0 animate-on-scroll">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Continuous Learning</h3>
            <p className="text-lg mb-6">
              I believe in continuous growth and am always expanding my skills through courses, certifications, and hands-on projects.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["Web Development", "Cloud Architecture", "System Design", "DevOps", "AI & ML Basics"].map((area, index) => (
                <span 
                  key={index} 
                  className="bg-white dark:bg-gray-700 px-4 py-2 rounded-full shadow-sm text-sm"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
