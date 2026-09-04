export interface ProjectItem {
  id: string;
  number: string;
  category: string;
  title: string;
  subtitle?: string;
  link: string;
  image: string;
  col1Image1?: string;
  col1Image2?: string;
  col2Image?: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "01",
    number: "01",
    category: "Web Development",
    title: "Modern Websites & Web Apps",
    subtitle: "Clean Design • Modern UI • Real Projects • Better Experiences",
    link: "https://github.com/rohitpt03-eng",
    image: "/projects/project1-web.jpg",
  },
  {
    id: "02",
    number: "02",
    category: "C / C++ Projects",
    title: "Algorithms & Logic Building",
    subtitle: "Data Structures • Algorithmic Problem Solving • Real Programs",
    link: "https://github.com/rohitpt03-eng",
    image: "/projects/project2-cpp.jpg",
  },
  {
    id: "03",
    number: "03",
    category: "Electronics & Embedded",
    title: "Hardware & Sensor Systems",
    subtitle: "Microcontrollers • Sensors & Interfacing • Robotics & IoT",
    link: "https://github.com/rohitpt03-eng",
    image: "/projects/project3-embedded.jpg",
  },
];
