import type { PortfolioConfig } from "../types/portfolio";

export const DEFAULT_PORTFOLIO_CONFIG: PortfolioConfig = {
  identity: {
    name: "Rohit",
    greeting: "Hi, i'm rohit",
    headline: "B.Tech ECE Student | Programmer | Web Developer",
    subheadline:
      "a b.tech ece student driven by programming, electronics & web development",
    tagLine: "Electronics • C/C++ • Web Development • Embedded Systems",
    motto: "Learn • Build • Improve • Repeat",
    portraitUrl: "/rohit.jpg",
  },
  about: {
    title: "About Me",
    paragraphs: [
      "I am pursuing B.Tech in Electronics & Communication Engineering (ECE). I enjoy working with C and C++, building modern websites, and exploring electronics and embedded systems.",
      "My focus is on continuously improving my technical skills and turning engineering ideas into practical software and hardware projects.",
    ],
    highlights: [
      "C & C++ Problem Solver",
      "Modern Frontend & Web Builder",
      "Digital & Analog Circuitry",
      "Microcontroller & Sensor Interfacing",
    ],
  },
  skills: [
    {
      id: "programming",
      category: "Programming",
      icon: "code",
      accentColor: "purple",
      description:
        "Logic building, problem solving, memory management, and foundational data structures.",
      items: ["C", "C++", "Data Structures", "Algorithms", "Problem Solving"],
    },
    {
      id: "web-dev",
      category: "Web Development",
      icon: "globe",
      accentColor: "cyan",
      description:
        "Responsive, modern interfaces, interactive animations, and clean component architecture.",
      items: [
        "Website Development",
        "Frontend Development",
        "React & TypeScript",
        "Tailwind CSS",
        "HTML5 / CSS3",
      ],
    },
    {
      id: "electronics",
      category: "Electronics",
      icon: "circuit",
      accentColor: "blue",
      description:
        "Core ECE principles spanning logic design, analog signal chains, and circuit behavior.",
      items: [
        "Digital Electronics",
        "Analog Electronics",
        "Electronic Circuits",
        "Signal Analysis",
      ],
    },
    {
      id: "embedded",
      category: "Embedded Systems",
      icon: "cpu",
      accentColor: "purple",
      description:
        "Bridging software and physical hardware through firmware, sensors, and controllers.",
      items: [
        "Embedded Systems",
        "Microcontrollers",
        "Sensors & Interfacing",
        "Arduino & STM32",
      ],
    },
    {
      id: "tools",
      category: "Tools & Workflow",
      icon: "wrench",
      accentColor: "cyan",
      description:
        "Version control, open-source publishing, rapid prototyping, and modern dev tooling.",
      items: ["GitHub", "Git", "VS Code", "Vite", "Circuit Prototyping"],
    },
  ],
  projects: [
    {
      id: "01",
      number: "01",
      category: "Web Development",
      title: "Modern Websites & Web Apps",
      subtitle: "Clean Design • Modern UI • Real Projects • Better Experiences",
      description:
        "I build responsive, modern, and user-friendly websites and web applications spanning landing pages, e-commerce UI, task managers, dashboards, and developer portfolios.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Responsive UI", "Framer Motion"],
      link: "https://github.com/rohitpt03-eng",
      image: "/projects/project1-web.jpg",
    },
    {
      id: "02",
      number: "02",
      category: "C / C++ Projects",
      title: "Algorithms & Logic Building",
      subtitle: "Data Structures • Algorithmic Problem Solving • Real Programs",
      description:
        "Programming projects focused on logic building, algorithmic thinking, and mastering data structures including arrays, linked lists, binary trees, stacks, and queues.",
      tags: ["C", "C++", "DSA", "Algorithms", "Console Systems"],
      link: "https://github.com/rohitpt03-eng",
      image: "/projects/project2-cpp.jpg",
    },
    {
      id: "03",
      number: "03",
      category: "Electronics & Embedded",
      title: "Hardware & Sensor Systems",
      subtitle: "Microcontrollers • Sensors & Interfacing • Robotics & IoT",
      description:
        "Projects combining electronics, firmware programming, and physical hardware—featuring ultrasonic distance sensing with LCD telemetry, STM32 systems, and autonomous robotic builds.",
      tags: ["Embedded C", "Arduino Uno", "STM32", "HC-SR04", "Sensor Interfacing"],
      link: "https://github.com/rohitpt03-eng",
      image: "/projects/project3-embedded.jpg",
    },
  ],
  experience: [
    {
      id: "exp-1",
      role: "Web Developer & UI Builder",
      organization: "Independent & Open Source Projects",
      period: "2024 — Present",
      type: "Web Engineering",
      highlights: [
        "Designed and built 9+ modern web interfaces including SaaS landing pages, e-commerce storefronts, dashboards, and interactive portfolios.",
        "Deployed production web projects via GitHub Pages and modern frontend build pipelines.",
      ],
    },
    {
      id: "exp-2",
      role: "Embedded Systems & Electronics Builder",
      organization: "ECE Lab & Hardware Prototyping",
      period: "2023 — Present",
      type: "Hardware & Firmware",
      highlights: [
        "Built microcontroller-based sensor modules integrating HC-SR04 ultrasonic sensors and 16x2 LCD displays for real-time telemetry.",
        "Prototyped autonomous robotics and digital/analog electronic circuits for practical engineering applications.",
      ],
    },
    {
      id: "exp-3",
      role: "C / C++ Programmer & DSA Practitioner",
      organization: "Core Computer Science Foundations",
      period: "2023 — Present",
      type: "Systems Programming",
      highlights: [
        "Implemented modular C/C++ console applications and visualizers covering Arrays, Linked Lists, Stacks, Queues, and Binary Trees.",
        "Focused on clean algorithmic logic, time complexity awareness, and structured debugging.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Technology (B.Tech)",
      field: "Electronics & Communication Engineering (ECE)",
      status: "Currently Pursuing",
      description:
        "Building strong engineering fundamentals across electronics, communication systems, embedded hardware, and software development.",
      coursework: [
        "Digital Electronics",
        "Analog Circuits",
        "Microcontrollers & Embedded Systems",
        "C / C++ Programming",
        "Electronic Devices & Circuits",
      ],
    },
  ],
  achievements: [
    {
      id: "ach-1",
      title: "9+ Web UI Systems Built",
      category: "Web Development",
      metric: "09 Apps",
      description:
        "Crafted full responsive UI concepts spanning SaaS, Productivity, Education, Travel, Dashboard analytics, and E-Commerce.",
    },
    {
      id: "ach-2",
      title: "Sensor & Robotics Integration",
      category: "Embedded Systems",
      metric: "Hardware + Firmware",
      description:
        "Engineered working distance-sensing LCD interfaces and 4-wheel obstacle-sensing robotic prototypes using Arduino & STM32.",
    },
    {
      id: "ach-3",
      title: "Core DSA & C/C++ Implementation",
      category: "Programming",
      metric: "5+ Structures",
      description:
        "Developed foundational programs mastering Arrays, Linked Lists, Stacks, Queues, Binary Trees, and Maze pathfinding logic.",
    },
    {
      id: "ach-4",
      title: "Live GitHub & Web Deployment",
      category: "Dev Workflow",
      metric: "Production Live",
      description:
        "Configured automated GitHub Pages deployment and custom portfolio web presence for continuous shipping.",
    },
  ],
  contact: {
    heading: "Let's Build Something",
    subheading:
      "Interested in collaborating on web development, C/C++ software, or electronics & embedded systems projects?",
    email: "rohit.pt03@gmail.com",
    github: "https://github.com/rohitpt03-eng",
    linkedin: "https://www.linkedin.com/in/rohit-kumar-b229aa255",
    location: "India • Open to Remote & Tech Collaborations",
  },
};
