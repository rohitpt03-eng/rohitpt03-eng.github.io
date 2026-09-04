export interface ServiceItem {
  id: string;
  number: string;
  name: string;
  description: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "01",
    number: "01",
    name: "C / C++ Programming",
    description:
      "Writing structured, high-performance programs focused on logic building, data structures, and algorithmic problem solving.",
  },
  {
    id: "02",
    number: "02",
    name: "Web Development",
    description:
      "Designing and developing responsive, modern, and user-friendly websites and frontend applications with clean layout and code.",
  },
  {
    id: "03",
    number: "03",
    name: "Electronics & Circuits",
    description:
      "Deeply studying and experimenting with digital electronics, analog circuits, and testing electronic hardware systems.",
  },
  {
    id: "04",
    number: "04",
    name: "Embedded Systems",
    description:
      "Programming microcontrollers, integrating sensors, and developing firmware for hardware-software communication.",
  },
  {
    id: "05",
    number: "05",
    name: "Digital Engineering",
    description:
      "Continuously learning, building, and transforming innovative engineering ideas into practical, working digital solutions.",
  },
];
