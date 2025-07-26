"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionTransition } from "@/components/ui/page-transition";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/contexts/ThemeContext";

interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
  color: string;
  icon: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    description: "Modern web technologies and frameworks",
    skills: ["React", "TypeScript", "HTML/CSS", "Tailwind CSS", "Storybook", "ShadCN"],
    color: "from-blue-500 to-blue-600",
    icon: "🎨"
  },
  {
    title: "Backend Development", 
    description: "Server-side technologies and APIs",
    skills: ["Node.js", "Express", "Java", "REST APIs", "Microservices"],
    color: "from-green-500 to-green-600",
    icon: "⚙️"
  },
  {
    title: "Database Systems",
    description: "Data storage and management solutions",
    skills: ["MongoDB", "PostgreSQL", "SQL", "Data Modeling", "Query Optimization"],
    color: "from-purple-500 to-purple-600",
    icon: "🗄️"
  },
  {
    title: "Monitoring & Observability",
    description: "Application performance and monitoring",
    skills: ["OpenTelemetry", "Datadog", "SAPM", "OTLP", "RUM", "Traces & Metrics"],
    color: "from-orange-500 to-orange-600",
    icon: "📊"
  },
  {
    title: "Privacy & Compliance",
    description: "Data governance and regulatory compliance",
    skills: ["GDPR", "CCPA", "Data Subject Requests", "Rego Policy Engine", "Privacy by Design"],
    color: "from-indigo-500 to-indigo-600",
    icon: "🔒"
  },
  {
    title: "DevOps & Tools",
    description: "Development workflow and automation",
    skills: ["Docker", "GitHub Actions", "CLI Development", "VSCode Extensions", "CI/CD"],
    color: "from-cyan-500 to-cyan-600",
    icon: "🚀"
  }
];

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const { theme } = useTheme();

  return (
    <section id="skills" className={`py-20 bg-gradient-to-br ${theme.background}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionTransition className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
              Technical Expertise
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A comprehensive skillset spanning full-stack development, privacy engineering, 
              and enterprise-scale observability solutions.
            </p>
          </motion.div>
        </SectionTransition>

        {/* Skills Grid */}
        <SectionTransition>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`${theme.surface} hover:border-gray-600 transition-all duration-300 h-full group`}>
                  <CardContent className="p-6">
                    {/* Category Header */}
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${theme.primary} flex items-center justify-center text-2xl mr-4 group-hover:scale-110 transition-transform duration-300`}>
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">
                          {category.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 0.3, 
                            delay: skillIndex * 0.1 
                          }}
                        >
                          <Badge
                            variant="secondary"
                            className="bg-gray-700/80 text-gray-200 border-gray-600 hover:bg-gray-700 hover:scale-105 transition-all duration-200"
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </SectionTransition>

        {/* Additional Stats */}
        <SectionTransition delay={0.4} className="mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Years Experience", value: "7+" },
              { label: "Technologies", value: "20+" },
              { label: "Projects Delivered", value: "50+" },
              { label: "Team Size Led", value: "5-10" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-6 bg-gray-800/30 rounded-lg border border-gray-700"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`text-3xl font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </SectionTransition>
      </div>
    </section>
  );
};

export default SkillsSection;