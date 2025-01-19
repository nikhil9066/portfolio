import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, ChevronDown, Database, Brain, LineChart, Folder, ExternalLink as LinkIcon, FileText, MapPin, Calendar, Code, Clock } from 'lucide-react';
import Spline from '@splinetool/react-spline';
import SplineErrorBoundary from './SplineErrorBoundary';
import Preloader from './Preloader';
import { images } from './images';
import { useCountUp } from './hooks/useCountUp';

function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [isInDarkSection, setIsInDarkSection] = useState(true);  // Start as true since Hero is dark
  const [age, setAge] = useState(0);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAge(26);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const displayAge = useCountUp(age, 1000);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY < 100);
      
      // Check if we're in either dark section (Hero or About)
      const heroSection = document.querySelector('section');  // First section is Hero
      const aboutSection = document.getElementById('about');
      
      if (heroSection && aboutSection) {
        const heroRect = heroSection.getBoundingClientRect();
        const aboutRect = aboutSection.getBoundingClientRect();
        const isInHero = heroRect.top <= 0 && heroRect.bottom >= 100;
        const isInAbout = aboutRect.top <= 100 && aboutRect.bottom >= 100;
        setIsInDarkSection(isInHero || isInAbout);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const otherProjects = [
    {
      title: "Wage Prediction Model",
      description: "Analyzing wage data with visualizations and applying multiple models for prediction and performance comparison.",
      tech: ["Random Forest", "XGBoost", "Caret", "ggplot2"],
      links: { 
        github: "https://github.com/nikhil9066/wage_prediction",
        external: "https://github.com/nikhil9066/wage_prediction/blob/main/App.pdf"
      }
    },
    {
      title: "Flask Web Application for Data Analysis and Prediction",
      description: "A Flask-based web app that processes and visualizes data, and provides predictions based on a trained linear regression model.",
      tech: ["Flask", "Pandas", "Docker", "SK-learn", "Kube"],
      links: { 
        github: "https://github.com/nikhil9066/Predict_Diabetes",
        external: "https://github.com/nikhil9066/Predict_Diabetes/blob/main/README.md"
      }
    },
    {
      title: "XGBoost Model for Predicting Customer Purchase Behavior",
      description: "Training an XGBoost model on the OJ dataset for binary classification, followed by feature importance analysis, model evaluation, and hyperparameter tuning.",
      tech: ["XGBoost", "Caret", "ggplot2", "pROC", "PRROC"],
      links: { 
        github: "https://github.com/nikhil9066/OJ_XGBoost_Purchase_Prediction",
        external: "https://github.com/nikhil9066/OJ_XGBoost_Purchase_Prediction/blob/main/OJ.pdf"
      }
    },
    {
      title: "Random Forest Model for App Download Prediction",
      description: "Building a random forest model to predict app download probability, including feature engineering and model performance evaluation.",
      tech: ["Random Forest", "caret", "pROC", "ggplot2"],
      links: { 
        github: "https://github.com/nikhil9066/App-Download-Prediction",
        external: "https://github.com/nikhil9066/App-Download-Prediction/blob/main/app.pdf"
      }
    },
    {
      title: "Logistic Regression for Classifying Genuine vs Forged Banknotes",
      description: "Building and evaluating a logistic regression model to classify banknotes based on wavelet-transformed features and their entropy.",
      tech: ["caret", "pROC", "ggplot2", "GLM"],
      links: { 
        github: "https://github.com/nikhil9066/Note_Forgery_Detection",
        external: "https://github.com/nikhil9066/Note_Forgery_Detection/blob/main/Note-Forgery-Detection.pdf"
      }
    },
    {
      title: "Genetic Algorithm for Solving the Traveling Salesman Problem (TSP)",
      description: "Implementing a Genetic Algorithm with Selection, Crossover, Mutation, and Fitness Evaluation",
      tech: ["Python", "NumPy", "Random", "Euclidean Distance Formula"],
      links: { 
        github: "https://github.com/nikhil9066/Traveling_Salesman_Problem",
        external: null
      }
    }
  ];

  useEffect(() => {
    const text = document.querySelector('.sec-text');
    if (!text) return;

    const textLoad = () => {
      setTimeout(() => {
        text.textContent = "Data scientist";
      }, 0);
      setTimeout(() => {
        text.textContent = "ML Engineer";
      }, 4000);
      setTimeout(() => {
        text.textContent = "Data Analyst";
      }, 8000); //1s = 1000 milliseconds
    };

    textLoad();
    setInterval(textLoad, 12000);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
      {/* Fixed Resume Button */}
      <a
        href={images.resume}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed top-4 right-4 md:top-8 md:right-8 z-50 px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded-full transition-all duration-300 shadow-lg ${
          isInDarkSection
            ? 'bg-white text-[#09192f] hover:bg-gray-100'
            : 'bg-[#09192f] text-white hover:bg-gray-800'
        }`}
      >
        Resume
      </a>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/70 backdrop-blur-sm shadow-lg translate-y-0 rounded-full mt-4 max-w-4xl mx-auto left-1/2 -translate-x-1/2' 
          : '-translate-y-full'
      }`}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="text-xl font-bold text-[#09192f]">Nik.</a>
            <div className="hidden md:flex space-x-8">
              {[
                { name: 'About', href: '#about' },
                { name: 'Timeline', href: '#timeline' },
                { name: 'Projects', href: '#noteworthy-projects' },
                { name: 'Certifications', href: '#certifications' },
                { name: 'Connect', href: '#connect' }
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-[#09192f] hover:text-gray-600 transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#09192f] transition-all group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen relative bg-white">
        <div className="absolute inset-0">
          <SplineErrorBoundary>
            <Spline
              className="w-full h-full"
              scene="https://my.spline.design/cutecomputerfollowcursor-8586526278da2c5015799158f29d7481/scene.splinecode"
              onLoad={() => setSplineLoaded(true)}
            />
          </SplineErrorBoundary>
        </div>
        <div className="relative px-8 py-16 flex flex-col items-start justify-center min-h-screen overflow-hidden">
          <div className="text-white max-w-xl animate-slide-in">
            <h1 className="text-5xl font-bold mb-4">
              Hello, my name is <span className="text-gray-300">Nik</span>
            </h1>
            <div className="text-3xl mb-2 flex items-center gap-2">
              I'm a <div className="container"><span className="text sec-text"></span></div>
            </div>
            <p className="text-xl mb-8">
              Teaching machines to do the heavy lifting
              <br />
              – one magical dataset at a time!
            </p>
          </div>
          <div className={`fixed bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/80 transition-opacity duration-300 ${
            showScrollIndicator ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            <ChevronDown className="w-6 h-6 animate-scroll-down" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-[#09192f]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold text-white">02. About Me</h2>
            <div className="h-px bg-white/70 flex-grow max-w-[70%]"></div>
          </div>
          <div ref={aboutRef} className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="mb-8">
                <h3 className="text-[2.3rem] font-bold text-[#00ff88] mb-6">
                  I'm Nikhil Premachandra Rao
                </h3>
                <div className="flex flex-col gap-4 mb-6">
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin className="w-5 h-5 text-[#00ff88]" />
                    <span>Boston, Massachusetts</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="w-5 h-5 text-[#00ff88]" />
                    <span><span className="tabular-nums">{displayAge}</span> years old</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Code className="w-5 h-5 text-[#00ff88]" />
                    <span>Data Scientist</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock className="w-5 h-5 text-[#00ff88]" />
                    <span>3+ Years of work Experience</span>
                  </div>
                </div>
                <p className="text-gray-300">
                  As a dedicated <span className="text-[#00ff88] font-semibold">data scientist</span>, I bring a strong foundation in Maths, Machine learning, and Neural networks to every project. With a <span className="text-[#00ff88] font-semibold">Master of Science in Data Science</span> and hands-on experience with various predictive modeling techniques and data-driven solutions, I specialize in building robust, scalable models that leverage cutting-edge algorithms and data manipulation skills to provide actionable insights and enhance decision-making.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src={images.profile}
                alt="Profile"
                className="w-full h-full object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold text-[#09192f]">03. Professional Journey</h2>
            <div className="h-px bg-[#09192f]/70 flex-grow max-w-[70%]"></div>
          </div>
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[1px] bg-gray-300"></div>
            
            <div className="space-y-4">
              {[
                {
                  period: "September 2023 - April 2025",
                  title: "University of Massachusetts Dartmouth",
                  role: "Master of Science - Data Science",
                  align: "right"
                },
                {
                  period: "June 2020 - June 2023",
                  title: "Cerner Corporation",
                  role: "Data Scientist / Production Software Engineer",
                  align: "left"
                },
                {
                  period: "January 2020 - June 2020",
                  title: "Cerner Corporation",
                  role: "Software Intern",
                  align: "right"
                },
                {
                  period: "September 2019 - November 2019",
                  title: "Arcapsis",
                  role: "Web Development",
                  align: "left"
                },
                {
                  period: "June 2019 - August 2019",
                  title: "Central Manufacturing Technology Institute",
                  role: "Software Engineer Intern",
                  align: "right"
                },
                {
                  period: "2016 - 2020",
                  title: "Siddaganga Institute of Technology",
                  role: "Bachelor of Engineering - Computer Science",
                  align: "left"
                }
              ].map((item, index) => (
                <div key={index} className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-6 w-3 h-3 bg-[#09192f] rounded-full border-2 border-white z-10"></div>
                  
                  {/* Content */}
                  <div className={`flex items-center justify-between gap-8 ${
                    item.align === 'left' ? 'flex-row' : 'flex-row-reverse'
                  }`}>
                    {/* Date */}
                    <div className={`w-5/12 ${item.align === 'left' ? 'text-right' : 'text-left'}`}>
                      <span className="text-sm font-medium text-gray-600 py-4 inline-block">{item.period}</span>
                    </div>
                    
                    {/* Info */}
                    <div className="w-5/12">
                      <div className={`bg-white p-4 rounded-lg shadow-lg ${
                        item.align === 'left' ? 'ml-8' : 'mr-8'
                      } hover:shadow-xl transition-all duration-300`}>
                        <h3 className="text-xl font-semibold text-[#09192f] mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Noteworthy Projects Section */}
      <section id="noteworthy-projects" className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold text-[#09192f]">04. Noteworthy Projects</h2>
            <div className="h-px bg-[#09192f]/70 flex-grow max-w-[70%]"></div>
          </div>
          
          {/* Project 1 */}
          <div className="mb-16">
            <div className="relative grid grid-cols-12 gap-4 items-center">
              {/* Project Image */}
              <div className="col-span-7">
                <div className="relative group">
                  <div className="relative overflow-hidden rounded">
                    <img 
                      src={images.project1}
                      alt="Halcyon Theme"
                      className="w-full rounded transition-all duration-300 group-hover:scale-105 group-hover:brightness-50"
                    />
                  </div>
                </div>
              </div>
              
              {/* Project Content */}
              <div className="col-span-5 col-start-8 text-right">
                <p className="text-[#09192f] font-mono mb-2">Featured Project</p>
                <h3 className="text-3xl font-semibold text-[#09192f] mb-4">AutoAPI</h3>
                <div className="bg-[#f3f3f3] p-6 rounded-lg shadow-xl mb-4 -ml-16 relative z-10">
                  <p className="text-gray-600">
                    AutoML project is a web-based application designed to <span className="text-[#0066cc] font-semibold">automate machine learning</span> model <span className="text-[#0066cc] font-semibold">building and deployment</span>. The project includes <span className="text-[#0066cc] font-semibold">database integration</span>, a user-friendly dashboard, and <span className="text-[#0066cc] font-semibold">APIs for error diagnostics</span> and additional functionalities
                  </p>
                </div>
                <ul className="flex justify-end gap-4 text-[#09192f] font-mono text-sm mb-4">
                  <li className="px-2 py-0.5 bg-[#09192f] text-white text-xs rounded">Python</li>
                  <li className="px-2 py-0.5 bg-[#09192f] text-white text-xs rounded">Flask</li>
                  <li className="px-2 py-0.5 bg-[#09192f] text-white text-xs rounded">FastAPI</li>
                  <li className="px-2 py-0.5 bg-[#09192f] text-white text-xs rounded">Git</li>
                  <li className="px-2 py-0.5 bg-[#09192f] text-white text-xs rounded">docker</li>
                </ul>
                <div className="flex justify-end gap-4">
                  <a href="https://github.com/nikhil9066/API-model" className="text-[#09192f] hover:text-gray-600">
                    <Github className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className="mb-16">
            <div className="relative grid grid-cols-12 gap-4 items-center">
              {/* Project Content */}
              <div className="col-span-5 text-left">
                <p className="text-[#09192f] font-mono mb-2">Featured Project</p>
                <h3 className="text-3xl font-semibold text-[#09192f] mb-4">CSV Query Performance</h3>
                <div className="bg-[#f3f3f3] p-6 rounded-lg shadow-xl mb-4 -mr-16 relative z-10">
                  <p className="text-gray-600">
                    This project benchmarks <span className="text-[#0066cc] font-semibold">SQL query performance</span> on <span className="text-[#0066cc] font-semibold">CSV datasets</span> of varying sizes. It simulates query execution times using an <span className="text-[#0066cc] font-semibold">SQLite database</span> and visualizes the results to assess how file size impacts <span className="text-[#0066cc] font-semibold">query efficiency</span>.
                  </p>
                </div>
                <ul className="flex gap-4 text-[#09192f] font-mono text-sm mb-4">
                  <li className="px-2 py-0.5 bg-[#09192f] text-white text-xs rounded">Python</li>
                  <li className="px-2 py-0.5 bg-[#09192f] text-white text-xs rounded">Pandas</li>
                  <li className="px-2 py-0.5 bg-[#09192f] text-white text-xs rounded">NumPy</li>
                  <li className="px-2 py-0.5 bg-[#09192f] text-white text-xs rounded">SQLite</li>
                  <li className="px-2 py-0.5 bg-[#09192f] text-white text-xs rounded">PyArrow</li>
                  <li className="px-2 py-0.5 bg-[#09192f] text-white text-xs rounded">Git</li>
                </ul>
                <div className="flex gap-4">
                  <a href="https://github.com/nikhil9066/csv_query_performance_benchmark" className="text-[#09192f] hover:text-gray-600">
                    <Github className="w-6 h-6" />
                  </a>
                </div>
              </div>
              <div className="col-span-7 col-start-6">
                <div className="relative group">
                  <div className="relative overflow-hidden rounded">
                    <img 
                      src={images.project2}
                      alt="Spotify Profile"
                      className="w-full rounded transition-all duration-300 group-hover:scale-105 group-hover:brightness-50"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Other Projects */}
          <div className="mt-16">
            <div className="flex items-center gap-4 mb-12">
              <h3 className="text-2xl font-bold text-[#09192f]">Other Noteworthy Projects</h3>
              <div className="h-px bg-[#09192f]/70 flex-grow max-w-[70%]"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {otherProjects.slice(0, showMore ? otherProjects.length : 6).map((project, index) => (
                <div 
                  key={index}
                  className="bg-[#f3f3f3] p-6 rounded-lg hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <Folder className="w-10 h-10 text-[#09192f]" />
                    <div className="flex gap-4">
                      {project.links.github && (
                        <a href={project.links.github} className="text-[#09192f] hover:text-gray-600">
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {project.links.external && (
                        <a href={project.links.external} className="text-[#09192f] hover:text-gray-600">
                          <LinkIcon className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-[#09192f] mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <ul className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <li key={techIndex} className="px-2 py-0.5 bg-[#09192f] text-white text-xs rounded">{tech}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <button 
                onClick={() => window.open('https://github.com/nikhil9066?tab=repositories', '_blank')}
                className="px-6 py-2 border-2 border-[#09192f] text-[#09192f] rounded-lg hover:bg-[#09192f] hover:text-white transition-colors text-sm"
              >
                Show {showMore ? 'Less' : 'More'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold text-[#09192f]">05. Certifications</h2>
            <div className="h-px bg-[#09192f]/70 flex-grow max-w-[70%]"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Supervised Machine Learning: Regression and Classification",
                issuer: "DeepLearning.AI, Stanford University",
                date: "June 2024",
                credentialId: "MCQEAHC8LAGS",
                link: "https://www.coursera.org/account/accomplishments/verify/MCQEAHC8LAGS"
              },
              {
                title: "Advanced Learning Algorithms",
                issuer: "DeepLearning.AI, Stanford University",
                date: "Sept 2024",
                credentialId: "WN99E17LTHMI",
                link: "https://www.coursera.org/account/accomplishments/verify/WN99E17LTHMI"
              },
              {
                title: "Supervised Machine Learning: Regression and Classification",
                issuer: "DeepLearning.AI, Stanford University",
                date: "Dec 2024",
                credentialId: "IGZ9WVSUZCYZ",
                link: "https://www.coursera.org/account/accomplishments/verify/IGZ9WVSUZCYZ"
              }
            ].map((cert, index) => (
              <div key={index} className="group relative bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 translate-y-full transform transition-transform duration-300 group-hover:translate-y-0"></div>
                <div className="relative p-6 transition-colors duration-300 group-hover:text-white">
                  <div className="flex justify-between items-start mb-4">
                    <Brain className="w-10 h-10 text-blue-600 transition-colors duration-300 group-hover:text-white" />
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 transition-colors duration-300 group-hover:text-white"
                    >
                      <ExternalLink className="w-6 h-6" />
                    </a>
                  </div>
                  <h3 className="text-lg font-semibold text-[#09192f] mb-2 line-clamp-2 transition-colors duration-300 group-hover:text-white">
                    {cert.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2 transition-colors duration-300 group-hover:text-blue-100">
                    {cert.issuer}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 transition-colors duration-300 group-hover:text-blue-100">
                      {cert.date}
                    </span>
                    <span className="text-xs text-gray-400 transition-colors duration-300 group-hover:text-blue-100">
                      ID: {cert.credentialId}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-12 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <h2 className="text-3xl font-bold text-[#09192f]">06. Tech Stack</h2>
              <div className="h-px bg-[#09192f]/70 flex-grow max-w-[70%]"></div>
            </div>
            <div className="space-y-8">
              {/* Row 1 */}
              <div className="overflow-hidden whitespace-nowrap">
                <div className="inline-flex gap-8 animate-scroll-left">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex gap-8">
                      {['Python', 'R', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn', 'Power BI', 'Tableau', 'PyTorch', 'TensorFlow', 'CI/CD pipelines', 'Kubernetes', 'Jenkins'].map((tech, index) => (
                        <span key={`${tech}-${i}-${index}`} className="px-4 py-2 bg-white rounded-full shadow text-[#09192f]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Row 2 */}
              <div className="overflow-hidden whitespace-nowrap">
                <div className="inline-flex gap-8 animate-scroll-right">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex gap-8">
                      {['Hadoop', 'Spark', 'AWS', 'Hypothesis testing', 'Regression analysis', 'encoding techniques', 'scaling', 'MySQL', 'S3', 'EMR', 'Lambda', 'git', 'CI/CD', 'Statistical Modeling', 'Postman', 'ETL'].map((tech, index) => (
                        <span key={`${tech}-${i}-${index}`} className="px-4 py-2 bg-white rounded-full shadow text-[#09192f]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Row 3 */}
              <div className="overflow-hidden whitespace-nowrap">
                <div className="inline-flex gap-8 animate-scroll-left">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex gap-8">
                      {['Communication', 'teamwork', 'critical thinking', 'strategic planning', 'problem-solving', 'adaptability'].map((tech, index) => (
                        <span key={`${tech}-${i}-${index}`} className="px-4 py-2 bg-white rounded-full shadow text-[#09192f]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Me Section */}
      <section id="connect" className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold text-[#09192f]">07. Contact me</h2>
            <div className="h-px bg-[#09192f]/70 flex-grow max-w-[70%]"></div>
          </div>
          <div className="text-center text-gray-600 mb-12 max-w-2xl mx-auto space-y-2">
            <p>Slide Into My Inbox!</p>
            <p>Got a question, a wild idea, or just want to send me a meme?</p>
            <p>Hit me up—or even better, let's grab a coffee (virtual or real, your choice)!</p>
          </div>
          
          <div className="flex flex-col items-center gap-8">
            {/* Contact Methods */}
            <div className="flex gap-8">
              <a 
                href="mailto:nikhilprao9066@gmail.com" 
                className="flex items-center gap-3 text-[#09192f] hover:text-gray-600 transition-colors"
              >
                <Mail className="w-6 h-6" />
                <span>mail</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/nikhil-p-rao/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#09192f] hover:text-gray-600 transition-colors"
              >
                <Linkedin className="w-6 h-6" />
                <span>LinkedIn</span>
              </a>
              <a 
                href="https://github.com/nikhil9066" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 text-[#09192f] hover:text-gray-600 transition-colors"
              >
                <Github className="w-6 h-6" />
                <span>GitHub</span>
              </a>
              <a 
                href={images.resume}
                target="_blank" 
               rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#09192f] hover:text-gray-600 transition-colors"
              >
                <FileText className="w-6 h-6" />
                <span>Resume</span>
              </a>
            </div>
            <div className="w-full max-w-lg mt-8">
              <form 
                className="space-y-6" 
                onSubmit={(e) => {
                  e.preventDefault();
                  const nameInput = document.getElementById('name') as HTMLInputElement;
                  const messageInput = document.getElementById('message') as HTMLTextAreaElement;
                  const subject = nameInput?.value 
                    ? `Message from ${nameInput.value}`
                    : 'Website Contact Form';
                  const body = messageInput?.value || '';
                  window.location.href = `mailto:nikhilprao9066@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                }}
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#09192f] mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#09192f] focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#09192f] mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#09192f] focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#09192f] mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#09192f] focus:border-transparent"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-[#09192f] text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#09192f] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Nik. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;