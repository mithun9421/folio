"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionTransition } from "@/components/ui/page-transition";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  Send,
  Calendar,
  Coffee,
  Briefcase,
  MessageSquare,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  inquiryType: string;
}

const ContactSection = () => {
  const { theme } = useTheme();
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: "general",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setSubmitted(true);
    setIsSubmitting(false);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
        inquiryType: "general",
      });
    }, 3000);
  };

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText("mithunmuralee94@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const contactInfo = [
    // {
    //   icon: Mail,
    //   label: "Email",
    //   value: "mithunmuralee94@gmail.com",
    //   href: "mailto:mithunmuralee94@gmail.com",
    //   color: "from-blue-400 to-cyan-500",
    // },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "/in/mithun-muraleedharan",
      href: "https://www.linkedin.com/in/mithun-muraleedharan/",
      color: "from-blue-600 to-blue-400",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "/mithun9421",
      href: "https://github.com/mithun9421",
      color: "from-gray-600 to-gray-400",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Thaiyur Chennai",
      href: null,
      color: "from-green-400 to-emerald-500",
    },
  ];

  const inquiryTypes = [
    { value: "general", label: "General Inquiry", icon: MessageSquare },
    { value: "job", label: "Job Opportunity", icon: Briefcase },
    { value: "collaboration", label: "Collaboration", icon: Coffee },
    { value: "consultation", label: "Consultation", icon: Calendar },
  ];

  return (
    <section
      id="contact"
      className={`py-16 bg-gradient-to-br ${theme.background}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionTransition className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
            Let&apos;s Connect
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-6">
            Open to new opportunities, collaborations, and interesting
            conversations about technology, privacy engineering, and building
            scalable solutions.
          </p>
          <Badge className="bg-green-500/20 border-green-500/30 text-green-400 px-4 py-2">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            Available for new opportunities
          </Badge>
        </SectionTransition>

        {/* Quick Contact Banner */}
        <SectionTransition className="mb-12">
          <Card className={`bg-gradient-to-r ${theme.primary}/10 ${theme.border} p-6`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-white mb-2">
                  Ready to start a conversation?
                </h3>
                <p className="text-gray-300">
                  Drop me an email directly or use the form below
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={copyEmail}
                  variant="outline"
                  className={`${theme.border} ${theme.textSecondary} hover:bg-gray-800 flex items-center gap-2`}
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copiedEmail ? "Copied!" : "Copy Email"}
                </Button>
                <Button
                  onClick={() =>
                    window.open("mailto:mithunmuralee94@gmail.com", "_blank")
                  }
                  className={`bg-gradient-to-r ${theme.primary} text-white border-0 flex items-center gap-2`}
                >
                  <Mail className="w-4 h-4" />
                  Send Email
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </Card>
        </SectionTransition>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information - Compact */}
          <SectionTransition className="lg:col-span-1">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Connect With Me
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Let's discuss opportunities, collaborations, or chat about
                  privacy engineering and observability.
                </p>
              </div>

              {/* Contact Methods - Compact Grid */}
              <div className="space-y-3">
                {contactInfo.map((contact, index) => (
                  <motion.div
                    key={contact.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className={`${theme.surface} hover:border-gray-600 transition-all duration-300 group`}>
                      <CardContent className="p-3">
                        <div className="flex items-center">
                          <div
                            className={`w-8 h-8 rounded-lg bg-gradient-to-r ${contact.color} flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300`}
                          >
                            <contact.icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-medium text-sm">
                              {contact.label}
                            </h4>
                            {contact.href ? (
                              <a
                                href={contact.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-blue-400 transition-colors text-xs truncate block"
                              >
                                {contact.value}
                              </a>
                            ) : (
                              <span className="text-gray-400 text-xs">
                                {contact.value}
                              </span>
                            )}
                          </div>
                          {contact.href && (
                            <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-gray-300 transition-colors" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Quick Stats - Compact */}
              <div className={`bg-gradient-to-r ${theme.primary}/10 rounded-lg p-4 border ${theme.border}`}>
                <h4 className="text-white font-medium mb-3 text-sm">
                  Response Time
                </h4>
                <div className="flex justify-between text-center">
                  <div>
                    <div className={`text-lg font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}>24h</div>
                    <div className="text-gray-400 text-xs">Response</div>
                  </div>
                  <div>
                    <div className={`text-lg font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}>95%</div>
                    <div className="text-gray-400 text-xs">Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </SectionTransition>

          {/* Contact Form - Spans 2 columns */}
          <SectionTransition delay={0.2} className="lg:col-span-2">
            <Card className={`${theme.surface}`}>
              <CardHeader>
                <h3 className="text-xl font-bold text-white">Send Message</h3>
                <p className="text-gray-400 text-sm">
                  Fill out the form below and I&apos;ll get back to you soon.
                </p>
              </CardHeader>
              <CardContent>
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Inquiry Type - Compact */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        What&apos;s this about?
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {inquiryTypes.map((type) => (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() =>
                              handleInputChange("inquiryType", type.value)
                            }
                            className={`p-2 rounded-lg border text-xs font-medium transition-all duration-300 flex items-center justify-center ${
                              form.inquiryType === type.value
                                ? `bg-gradient-to-r ${theme.primary}/20 ${theme.border} ${theme.textSecondary}`
                                : "bg-gray-700/50 border-gray-600 text-gray-400 hover:border-gray-500"
                            }`}
                          >
                            <type.icon className="w-3 h-3 mr-1" />
                            {type.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name and Email - Compact */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Name *
                        </label>
                        <Input
                          type="text"
                          placeholder="Your name"
                          value={form.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          required
                          className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 h-10"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email *
                        </label>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          value={form.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          required
                          className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 h-10"
                        />
                      </div>
                    </div>

                    {/* Subject - Compact */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Subject *
                      </label>
                      <Input
                        type="text"
                        placeholder="What's this about?"
                        value={form.subject}
                        onChange={(e) =>
                          handleInputChange("subject", e.target.value)
                        }
                        required
                        className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 h-10"
                      />
                    </div>

                    {/* Message - Reduced height */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Message *
                      </label>
                      <Textarea
                        placeholder="Tell me more about your project, opportunity, or idea..."
                        value={form.message}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        required
                        rows={4}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className={`w-full bg-gradient-to-r ${theme.primary} text-white border-0 font-semibold transition-all duration-300`}
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                        />
                      ) : (
                        <Send className="w-5 h-5 mr-2" />
                      )}
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <motion.svg
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8 }}
                        className="w-6 h-6 text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <motion.path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </motion.svg>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">
                      Message Sent!
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Thanks for reaching out. I&apos;ll get back to you within
                      24 hours.
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </SectionTransition>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
