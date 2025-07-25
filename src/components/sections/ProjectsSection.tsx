"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionTransition } from "@/components/ui/page-transition";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Eye, Award, Users, Zap } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: string;
  impact: string;
  teamSize?: string;
  duration?: string;
  highlights: string[];
  demoUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  status: "completed" | "in-progress" | "conceptual";
}

const projects: Project[] = [
  {
    id: "dsr-dashboard",
    title: "DSR Dashboard at PayPal",
    description: "Comprehensive system for managing Data Access & Erasure Requests with flexible group/user policy mapping.",
    longDescription: "Built a full-stack solution handling GDPR and CCPA compliance requirements, featuring dynamic policy engine, user role management, and automated workflow processing.",
    technologies: ["React", "Node.js", "MongoDB", "TypeScript", "Express", "JWT", "Material-UI"],
    category: "Privacy & Compliance",
    impact: "Reduced manual processing time by 80%, handling 10k+ requests monthly",
    teamSize: "5-6 engineers",
    duration: "8 months",
    highlights: [
      "Flexible policy mapping system",
      "Automated workflow processing",
      "Real-time status tracking",
      "Compliance audit trails"
    ],
    status: "completed"
  },
  {
    id: "otel-datadog",
    title: "OpenTelemetry-Datadog Integration",
    description: "Led observability integration across React-Express apps using OTEL Collector with fine-tuned configurations.",
    longDescription: "Architected end-to-end observability solution with custom trace suppression, service-level granularity, and automated instrumentation setup for microservices.",
    technologies: ["OpenTelemetry", "Datadog", "Node.js", "React", "OTLP", "Docker", "Kubernetes"],
    category: "Monitoring & Observability",
    impact: "Improved system visibility by 300%, reduced MTTR by 60%",
    teamSize: "3-4 engineers",
    duration: "4 months",
    highlights: [
      "Custom OTEL Collector configuration",
      "Automated instrumentation",
      "Service-level granularity",
      "Trace suppression optimization"
    ],
    status: "completed"
  },
  {
    id: "privacy-chatbot",
    title: "Privacy Chatbot",
    description: "AI-powered chatbot for answering privacy reports, risk management, and data lifecycle queries using domain-trained LLMs.",
    longDescription: "Developed intelligent chatbot leveraging NLP and domain-specific training data to provide instant answers on privacy policies, compliance requirements, and risk assessments.",
    technologies: ["React", "Node.js", "NLP", "TensorFlow.js", "BART", "WebSockets", "Python"],
    category: "AI & Privacy",
    impact: "Reduced support tickets by 45%, 24/7 availability for privacy queries",
    teamSize: "2-3 engineers",
    duration: "3 months",
    highlights: [
      "Domain-trained LLM integration",
      "Real-time query processing",
      "Context-aware responses",
      "Multi-language support"
    ],
    status: "completed"
  },
  {
    id: "policy-engine",
    title: "Modular Policy Engine",
    description: "Created engine to manage privacy policies, auto-generate Rego code, and deploy updates dynamically.",
    longDescription: "Built scalable policy management system with visual policy builder, automated Rego code generation, and seamless deployment pipeline for compliance updates.",
    technologies: ["Java", "React", "Rego", "PostgreSQL", "Spring Boot", "Redis", "Docker"],
    category: "Privacy & Compliance",
    impact: "Accelerated policy deployment by 70%, zero-downtime updates",
    teamSize: "4-5 engineers",
    duration: "6 months",
    highlights: [
      "Visual policy builder",
      "Auto-generated Rego code",
      "Dynamic deployment system",
      "Version control integration"
    ],
    status: "completed"
  },
  {
    id: "cli-tooling",
    title: "Developer CLI Tooling",
    description: "Built internal tools to scaffold OpenTelemetry setups and streamline instrumentation for various services.",
    longDescription: "Created comprehensive CLI toolkit for developers to quickly set up observability, generate boilerplate code, and manage instrumentation across different technology stacks.",
    technologies: ["Node.js", "CLI", "JavaScript", "YAML", "Template Engine", "npm"],
    category: "Developer Tools",
    impact: "Reduced setup time from hours to minutes, 90% developer adoption",
    teamSize: "Solo project",
    duration: "2 months",
    highlights: [
      "Cross-platform compatibility",
      "Template-based scaffolding",
      "Auto-configuration detection",
      "Integration with CI/CD"
    ],
    status: "completed"
  },
  {
    id: "rum-integration",
    title: "RUM Integration for Privacy App",
    description: "Enabled real-user monitoring with fine-grained filters for static assets, improving frontend trace visibility.",
    longDescription: "Implemented sophisticated RUM solution with custom filtering, performance metrics collection, and privacy-compliant user session tracking.",
    technologies: ["JavaScript", "Datadog RUM", "React", "Performance API", "Web Vitals"],
    category: "Monitoring & Observability",
    impact: "Improved frontend performance insights by 250%",
    teamSize: "2 engineers",
    duration: "1 month",
    highlights: [
      "Privacy-compliant tracking",
      "Custom performance metrics",
      "Real-time alerts",
      "Static asset optimization"
    ],
    status: "completed"
  }
];

const categories = ["All", "Privacy & Compliance", "Monitoring & Observability", "AI & Privacy", "Developer Tools"];

const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter(project => 
    selectedCategory === "All" || project.category === selectedCategory
  );

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "completed": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "in-progress": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "conceptual": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-black via-gray-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionTransition className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
            Key Projects & Contributions
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Enterprise-scale solutions spanning privacy engineering, observability, 
            and developer productivity at PayPal and beyond.
          </p>
        </SectionTransition>

        {/* Category Filter */}
        <SectionTransition className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="transition-all duration-300"
              >
                {category}
              </Button>
            ))}
          </div>
        </SectionTransition>

        {/* Projects Grid */}
        <SectionTransition>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-gray-800/50 border-gray-700 hover:border-gray-600 h-full group cursor-pointer transition-all duration-300 hover:scale-105">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start mb-3">
                        <Badge className={`${getStatusColor(project.status)} border`}>
                          {project.status.replace("-", " ")}
                        </Badge>
                        <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                          {project.category}
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {project.description}
                      </p>
                    </CardHeader>

                    <CardContent className="pt-0">
                      {/* Impact Metrics */}
                      <div className="mb-4 p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                        <div className="flex items-center text-blue-400 text-sm font-semibold mb-1">
                          <Award className="w-4 h-4 mr-2" />
                          Impact
                        </div>
                        <p className="text-gray-300 text-sm">{project.impact}</p>
                      </div>

                      {/* Project Details */}
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        {project.teamSize && (
                          <div className="flex items-center text-gray-400">
                            <Users className="w-4 h-4 mr-2" />
                            {project.teamSize}
                          </div>
                        )}
                        {project.duration && (
                          <div className="flex items-center text-gray-400">
                            <Zap className="w-4 h-4 mr-2" />
                            {project.duration}
                          </div>
                        )}
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-xs bg-gray-700/50 border-gray-600 text-gray-300"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 4 && (
                          <Badge
                            variant="outline"
                            className="text-xs bg-gray-700/50 border-gray-600 text-gray-300"
                          >
                            +{project.technologies.length - 4} more
                          </Badge>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => setSelectedProject(project)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        {project.githubUrl && (
                          <Button size="sm" variant="outline">
                            <Github className="w-4 h-4" />
                          </Button>
                        )}
                        {project.demoUrl && (
                          <Button size="sm" variant="outline">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </SectionTransition>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2">
                        {selectedProject.title}
                      </h3>
                      <Badge className={`${getStatusColor(selectedProject.status)} border`}>
                        {selectedProject.status.replace("-", " ")}
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedProject(null)}
                    >
                      ✕
                    </Button>
                  </div>

                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                    {selectedProject.longDescription}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-3">Key Highlights</h4>
                      <ul className="space-y-2">
                        {selectedProject.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-center text-gray-300">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold text-white mb-3">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="bg-gray-700/50 border-gray-600 text-gray-300"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 rounded-lg border border-blue-500/20">
                    <div className="flex items-center text-blue-400 font-semibold mb-2">
                      <Award className="w-5 h-5 mr-2" />
                      Project Impact
                    </div>
                    <p className="text-gray-300">{selectedProject.impact}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;