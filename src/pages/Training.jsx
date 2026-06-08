import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Code2, Terminal, BrainCircuit, Cloud, Building2, Briefcase,
  Coffee, PenTool, ServerCog, FlaskConical, Plane, ListTree,
  Zap, Factory, Cpu, Bot, Wrench, Landmark, FileDown
} from "lucide-react";

/* ──────────────────────────── COURSE DATA ──────────────────────────── */
const trainings = [
  {
    title: "Full-Stack Web Development",
    icon: Code2,
    color: "purple",
    type: "Full-Stack",
    duration: "12 Weeks",
    format: "Cohort-based",
    description:
      "End-to-end web development training covering HTML, CSS, JavaScript, React, Node.js, and databases with real-world projects.",
    learn: [
      "Git & Version Control",
      "HTML, CSS, JavaScript",
      "React Fundamentals",
      "Node.js & REST APIs",
      "Database Design (SQL & NoSQL)",
      "Deployment & DevOps",
    ],
    schedule: "Weekdays + Weekends",
    mode: "Online & On-site",
    audience: "Students & Professionals",
    pdf: "/syllabus/Full Stack Web Development Course Content.pdf",
  },
  {
    title: "Python Programming",
    icon: Terminal,
    color: "blue",
    type: "Programming",
    duration: "8 Weeks",
    format: "Cohort-based",
    description:
      "From fundamentals to advanced concepts including data handling, scripting, and problem-solving using Python.",
    learn: [
      "Python Basics & Syntax",
      "OOP Concepts",
      "File Handling & Modules",
      "Data Structures in Python",
      "Libraries: NumPy, Pandas",
      "Mini Projects & Automation",
    ],
    schedule: "Weekdays",
    mode: "Online & On-site",
    audience: "Beginners",
    pdf: null,
  },
  {
    title: "Data Science & AI Fundamentals",
    icon: BrainCircuit,
    color: "emerald",
    type: "Data Science",
    duration: "10 Weeks",
    format: "Cohort-based",
    description:
      "Hands-on introduction to data analysis, machine learning concepts, and practical AI applications.",
    learn: [
      "Statistics & Probability",
      "Data Wrangling with Pandas",
      "Data Visualization",
      "Machine Learning Basics",
      "Scikit-Learn & TensorFlow Intro",
      "Capstone AI Project",
    ],
    schedule: "Weekdays + Weekends",
    mode: "Online & On-site",
    audience: "Students & Working Professionals",
    pdf: null,
  },
  {
    title: "Cloud Computing",
    icon: Cloud,
    color: "sky",
    type: "Cloud & DevOps",
    duration: "6 Weeks",
    format: "Cohort-based",
    description:
      "Practical training on cloud fundamentals, deployment models, and real-world cloud-based solutions.",
    learn: [
      "Cloud Computing Models",
      "Virtualization & Containers",
      "AWS / Azure Basics",
      "Cloud Deployment Strategies",
      "Serverless Architecture",
      "Security & Cost Management",
    ],
    schedule: "Weekdays",
    mode: "Online",
    audience: "IT Aspirants",
    pdf: null,
  },
  {
    title: "Corporate IT Training",
    icon: Building2,
    color: "amber",
    type: "Enterprise",
    duration: "Flexible",
    format: "Customized",
    description:
      "Customized training programs for organizations to upskill teams in modern technologies and tools.",
    learn: [
      "Technology Stack Assessment",
      "Custom Curriculum Design",
      "Hands-on Lab Sessions",
      "Team Collaboration Projects",
      "Progress Tracking & Reports",
      "Post-Training Support",
    ],
    schedule: "Flexible",
    mode: "On-site / Online",
    audience: "Enterprises",
    pdf: null,
  },
  {
    title: "Internship & Project Mentorship",
    icon: Briefcase,
    color: "rose",
    type: "Mentorship",
    duration: "Ongoing",
    format: "Project-based",
    description:
      "Industry-linked internships and guided projects to build practical experience and job readiness.",
    learn: [
      "Real Client Projects",
      "Agile & Scrum Practices",
      "Code Reviews & Best Practices",
      "Resume & Portfolio Building",
      "Interview Preparation",
      "Industry Mentorship",
    ],
    schedule: "Flexible",
    mode: "Hybrid",
    audience: "College Students",
    pdf: null,
  },
  {
    title: "Advanced Java",
    icon: Coffee,
    color: "orange",
    type: "Programming",
    duration: "8–10 Weeks",
    format: "Cohort-based",
    description:
      "In-depth Java training covering OOP, collections, multithreading, JDBC, and enterprise-level application development.",
    learn: [
      "Core Java & OOP Deep Dive",
      "Collections Framework",
      "Multithreading & Concurrency",
      "JDBC & Database Connectivity",
      "Servlets & JSP Basics",
      "Enterprise Design Patterns",
    ],
    schedule: "Weekdays",
    mode: "Online & On-site",
    audience: "Intermediate to Advanced Learners",
    pdf: "/syllabus/ADV Java.pdf",
  },
  {
    title: "AutoCAD",
    icon: PenTool,
    color: "teal",
    type: "Design & Engineering",
    duration: "6 Weeks",
    format: "Cohort-based",
    description:
      "Comprehensive AutoCAD training focused on 2D drafting, design principles, and industry-standard workflows.",
    learn: [
      "AutoCAD Interface & Setup",
      "2D Drafting & Drawing Tools",
      "Layers, Blocks & Annotations",
      "Dimensioning & Layouts",
      "Plotting & Printing Standards",
      "Industry Project Practice",
    ],
    schedule: "Weekdays",
    mode: "On-site",
    audience: "Engineering & Design Students",
    pdf: "/syllabus/AutoCAD Course Content.pdf",
  },
  {
    title: "AWS",
    icon: ServerCog,
    color: "yellow",
    type: "Cloud & DevOps",
    duration: "6–8 Weeks",
    format: "Cohort-based",
    description:
      "Practical cloud training covering AWS core services, cloud architecture, deployment, and real-world use cases.",
    learn: [
      "IAM & Security Fundamentals",
      "EC2, S3 & Lambda",
      "VPC & Networking",
      "RDS & DynamoDB",
      "CloudFormation & IaC",
      "Deployment Pipelines (CI/CD)",
    ],
    schedule: "Weekdays + Weekends",
    mode: "Online",
    audience: "IT & Cloud Aspirants",
    pdf: "/syllabus/AWS Course Content.pdf",
  },
  {
    title: "Biotechnology",
    icon: FlaskConical,
    color: "lime",
    type: "Life Sciences",
    duration: "8 Weeks",
    format: "Cohort-based",
    description:
      "Applied biotechnology training focusing on modern lab techniques, industry applications, and research fundamentals.",
    learn: [
      "Molecular Biology Basics",
      "Genetic Engineering Concepts",
      "Lab Techniques & Protocols",
      "Bioinformatics Tools",
      "Industrial Biotechnology",
      "Research Paper Analysis",
    ],
    schedule: "Weekdays",
    mode: "On-site",
    audience: "Biotech & Life Science Students",
    pdf: "/syllabus/Biotechnology Coures content.pdf",
  },
  {
    title: "Drone Technology",
    icon: Plane,
    color: "indigo",
    type: "Emerging Tech",
    duration: "6–8 Weeks",
    format: "Cohort-based",
    description:
      "Hands-on drone technology program covering UAV fundamentals, design, controls, and real-world applications.",
    learn: [
      "UAV Principles & Aerodynamics",
      "Drone Hardware & Assembly",
      "Flight Controller Setup",
      "Autonomous Navigation",
      "Mapping & Surveying",
      "Regulations & Safety",
    ],
    schedule: "Weekends",
    mode: "On-site",
    audience: "Engineering Students",
    pdf: "/syllabus/Drone Technology Course Content.pdf",
  },
  {
    title: "Data Structures and Algorithms (DSA)",
    icon: ListTree,
    color: "violet",
    type: "Computer Science",
    duration: "10–12 Weeks",
    format: "Cohort-based",
    description:
      "Strong foundation in problem-solving using data structures, algorithms, and competitive programming techniques.",
    learn: [
      "Arrays, Strings & Hashing",
      "Linked Lists & Stacks",
      "Trees & Graphs",
      "Sorting & Searching",
      "Dynamic Programming",
      "Competitive Programming Practice",
    ],
    schedule: "Weekdays + Weekends",
    mode: "Online & On-site",
    audience: "Students & Job Seekers",
    pdf: "/syllabus/DSA Course Content.pdf",
  },
  {
    title: "Electric Vehicle Design",
    icon: Zap,
    color: "cyan",
    type: "Automotive Engineering",
    duration: "8–10 Weeks",
    format: "Cohort-based",
    description:
      "EV-focused training covering vehicle architecture, battery systems, power electronics, and design principles.",
    learn: [
      "EV Architecture & Drivetrain",
      "Battery Management Systems",
      "Power Electronics Basics",
      "Motor Selection & Control",
      "Charging Infrastructure",
      "EV Design Project",
    ],
    schedule: "Weekdays",
    mode: "On-site",
    audience: "Mechanical & Electrical Engineers",
    pdf: "/syllabus/Electric Vehicle Design.pdf",
  },
  {
    title: "Industry Automation",
    icon: Factory,
    color: "slate",
    type: "Industrial Engineering",
    duration: "8 Weeks",
    format: "Cohort-based",
    description:
      "Training on industrial automation concepts including PLCs, SCADA, sensors, and smart manufacturing systems.",
    learn: [
      "PLC Programming Basics",
      "SCADA Systems",
      "Sensors & Instrumentation",
      "HMI Design",
      "Industrial Communication Protocols",
      "Smart Factory Concepts",
    ],
    schedule: "Weekdays",
    mode: "On-site",
    audience: "Industrial & Electrical Engineers",
    pdf: "/syllabus/Industry Automation Course Content.pdf",
  },
  {
    title: "Machine Learning",
    icon: Cpu,
    color: "fuchsia",
    type: "AI & ML",
    duration: "10 Weeks",
    format: "Cohort-based",
    description:
      "Advanced machine learning training covering supervised, unsupervised learning, and real-world AI projects.",
    learn: [
      "Linear & Logistic Regression",
      "Decision Trees & Random Forest",
      "SVM & KNN",
      "Clustering Algorithms",
      "Neural Networks Intro",
      "ML Model Deployment",
    ],
    schedule: "Weekdays + Weekends",
    mode: "Online & On-site",
    audience: "CS & AI Enthusiasts",
    pdf: "/syllabus/Machine Learning Course Content.pdf",
  },
  {
    title: "Robotics",
    icon: Bot,
    color: "red",
    type: "Emerging Tech",
    duration: "8 Weeks",
    format: "Cohort-based",
    description:
      "Robotics training focusing on kinematics, sensors, controllers, and hands-on robotic system development.",
    learn: [
      "Robot Kinematics & Dynamics",
      "Sensors & Actuators",
      "Microcontroller Programming",
      "ROS (Robot Operating System)",
      "Computer Vision Basics",
      "Robotics Mini Project",
    ],
    schedule: "Weekends",
    mode: "On-site",
    audience: "Engineering Students",
    pdf: "/syllabus/Robotics Course Content.pdf",
  },
  {
    title: "SolidWorks",
    icon: Wrench,
    color: "pink",
    type: "Design & Engineering",
    duration: "6 Weeks",
    format: "Cohort-based",
    description:
      "Professional SolidWorks training covering 3D modeling, assemblies, and product design workflows.",
    learn: [
      "SolidWorks Interface & Sketching",
      "Part Modeling & Features",
      "Assembly Design",
      "Drawing & Detailing",
      "Sheet Metal & Weldments",
      "Simulation Basics",
    ],
    schedule: "Weekdays",
    mode: "On-site",
    audience: "Mechanical & Design Students",
    pdf: "/syllabus/Solidworks course Content.pdf",
  },
  {
    title: "STAAD Pro",
    icon: Landmark,
    color: "stone",
    type: "Civil Engineering",
    duration: "6 Weeks",
    format: "Cohort-based",
    description:
      "Structural analysis and design training using STAAD Pro for real-world civil engineering applications.",
    learn: [
      "STAAD Pro Interface & Setup",
      "Structural Modeling",
      "Load Application & Combinations",
      "Analysis & Design Codes",
      "Steel & Concrete Design",
      "Reporting & Documentation",
    ],
    schedule: "Weekdays",
    mode: "On-site",
    audience: "Civil Engineering Students",
    pdf: "/syllabus/STAAD Pro Course Content.pdf",
  },
];

/* ──────────────────── COLOR MAP (Tailwind classes) ──────────────────── */
const colorMap = {
  purple: { bg: "bg-purple-100", text: "text-purple-600", idealBg: "bg-purple-50", idealText: "text-purple-700", border: "border-purple-200" },
  blue: { bg: "bg-blue-100", text: "text-blue-600", idealBg: "bg-blue-50", idealText: "text-blue-700", border: "border-blue-200" },
  emerald: { bg: "bg-emerald-100", text: "text-emerald-600", idealBg: "bg-emerald-50", idealText: "text-emerald-700", border: "border-emerald-200" },
  sky: { bg: "bg-sky-100", text: "text-sky-600", idealBg: "bg-sky-50", idealText: "text-sky-700", border: "border-sky-200" },
  amber: { bg: "bg-amber-100", text: "text-amber-600", idealBg: "bg-amber-50", idealText: "text-amber-700", border: "border-amber-200" },
  rose: { bg: "bg-rose-100", text: "text-rose-600", idealBg: "bg-rose-50", idealText: "text-rose-700", border: "border-rose-200" },
  orange: { bg: "bg-orange-100", text: "text-orange-600", idealBg: "bg-orange-50", idealText: "text-orange-700", border: "border-orange-200" },
  teal: { bg: "bg-teal-100", text: "text-teal-600", idealBg: "bg-teal-50", idealText: "text-teal-700", border: "border-teal-200" },
  yellow: { bg: "bg-yellow-100", text: "text-yellow-600", idealBg: "bg-yellow-50", idealText: "text-yellow-700", border: "border-yellow-200" },
  lime: { bg: "bg-lime-100", text: "text-lime-600", idealBg: "bg-lime-50", idealText: "text-lime-700", border: "border-lime-200" },
  indigo: { bg: "bg-indigo-100", text: "text-indigo-600", idealBg: "bg-indigo-50", idealText: "text-indigo-700", border: "border-indigo-200" },
  violet: { bg: "bg-violet-100", text: "text-violet-600", idealBg: "bg-violet-50", idealText: "text-violet-700", border: "border-violet-200" },
  cyan: { bg: "bg-cyan-100", text: "text-cyan-600", idealBg: "bg-cyan-50", idealText: "text-cyan-700", border: "border-cyan-200" },
  slate: { bg: "bg-slate-200", text: "text-slate-600", idealBg: "bg-slate-100", idealText: "text-slate-700", border: "border-slate-200" },
  fuchsia: { bg: "bg-fuchsia-100", text: "text-fuchsia-600", idealBg: "bg-fuchsia-50", idealText: "text-fuchsia-700", border: "border-fuchsia-200" },
  red: { bg: "bg-red-100", text: "text-red-600", idealBg: "bg-red-50", idealText: "text-red-700", border: "border-red-200" },
  pink: { bg: "bg-pink-100", text: "text-pink-600", idealBg: "bg-pink-50", idealText: "text-pink-700", border: "border-pink-200" },
  stone: { bg: "bg-stone-200", text: "text-stone-600", idealBg: "bg-stone-100", idealText: "text-stone-700", border: "border-stone-200" },
};

/* ──────────────────────── SINGLE CARD COMPONENT ──────────────────────── */
function TrainingCard({ item, index }) {
  const c = colorMap[item.color] || colorMap.purple;
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index % 3 * 0.08, ease: "easeOut" }}
      className="group bg-white border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row justify-between gap-8
                 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-300"
    >
      {/* ─── LEFT SIDE ─── */}
      <div className="flex-1 min-w-0">
        {/* Title row */}
        <div className="flex flex-wrap items-center gap-3 mb-1">
          <div className={`w-10 h-10 ${c.bg} rounded-xl flex items-center justify-center shrink-0
                          group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`w-5 h-5 ${c.text}`} />
          </div>

          <h2 className="text-lg md:text-xl font-semibold text-gray-900 leading-snug">
            {item.title}
          </h2>

          <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-[11px]
                           font-semibold px-2.5 py-1 rounded-full border border-green-200">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Open
          </span>
        </div>

        {/* Subtitle */}
        <p className="text-sm text-gray-400 mb-4 pl-[52px]">
          {item.type} · {item.duration} · {item.format}
        </p>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          {item.description}
        </p>

        {/* What you'll learn */}
        <h4 className="text-[11px] font-bold text-gray-400 mb-3 tracking-[0.1em] uppercase">
          What you'll learn
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
          {item.learn.map((point, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className="flex items-start gap-2 text-sm text-gray-600"
            >
              <span className={`mt-0.5 ${c.text}`}>✓</span>
              {point}
            </motion.p>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-500
                       text-white pl-6 pr-5 py-2.5 rounded-full text-sm font-semibold
                       shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/30
                       hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            Apply for This Program
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>

          {item.pdf && (
            <a
              href={item.pdf}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center gap-2 border-2 border-gray-200 bg-white
                         text-gray-700 pl-5 pr-4 py-2 rounded-full text-sm font-semibold
                         hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50
                         hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <FileDown className="w-4 h-4" />
              Course Structure
            </a>
          )}
        </div>
      </div>

      {/* ─── RIGHT SIDE — PROGRAM DETAILS ─── */}
      <div className="w-full lg:w-[280px] shrink-0">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5
                        group-hover:border-gray-300 transition-colors duration-300">
          <h4 className="text-xs font-bold text-gray-500 mb-4 tracking-[0.08em] uppercase">
            Program Details
          </h4>

          <div className="space-y-3.5 text-sm">
            <DetailRow label="Duration" value={item.duration} />
            <DetailRow label="Format" value={item.mode} />
            <DetailRow label="Schedule" value={item.schedule} />
            <DetailRow
              label="Next Cohort"
              value="Contact to Enroll"
              valueClass="text-purple-600 font-semibold cursor-pointer hover:underline"
            />
            <DetailRow
              label="Certificate"
              value={
                <span className="flex items-center gap-1 text-green-600 font-semibold">
                  <span className="text-green-500">✓</span> Yes
                </span>
              }
            />
          </div>

          {/* Ideal for */}
          <div className={`mt-5 ${c.idealBg} ${c.border} border rounded-lg p-3.5`}>
            <p className={`text-[11px] font-bold ${c.idealText} mb-1 tracking-wider uppercase`}>
              Ideal for
            </p>
            <p className="text-sm text-gray-700">{item.audience}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ────────────── Detail Row Helper ────────────── */
function DetailRow({ label, value, valueClass = "text-gray-800 font-medium" }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-400">{label}</span>
      <span className={valueClass}>{value}</span>
    </div>
  );
}

/* ══════════════════════ MAIN PAGE COMPONENT ══════════════════════ */
export default function Training() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">

      {/* ─── PAGE HEADER ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mb-14"
      >
        <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-gray-900 dark:text-white leading-tight">
          Training & Skill Development
        </h1>
        <p className="mt-4 text-gray-500 dark:text-gray-400 text-base md:text-lg leading-relaxed">
          Our training programs are designed to bridge the gap between academics
          and industry by focusing on practical skills, real-world projects, and
          career readiness.
        </p>
      </motion.div>

      {/* ─── CARDS ─── */}
      <div className="flex flex-col gap-7">
        {trainings.map((item, index) => (
          <TrainingCard key={item.title} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}