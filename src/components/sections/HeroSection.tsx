import React from "react";
import { FadeIn } from "../common/FadeIn";
import { Magnet } from "../common/Magnet";
import { ContactButton } from "../common/ContactButton";

export const HeroSection: React.FC = () => {
  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <section className="relative h-screen flex flex-col justify-between overflow-x-clip bg-[#0C0C0C]">
      {/* Navbar */}
      <FadeIn delay={0} y={-20} className="w-full z-20">
        <header className="px-6 md:px-10 pt-6 md:pt-8">
          <nav className="flex items-center justify-between w-full">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </header>
      </FadeIn>

      {/* Hero Heading Container */}
      <div className="w-full overflow-hidden text-center z-0">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5 select-none pointer-events-none">
            Hi, i&apos;m rohit
          </h1>
        </FadeIn>
      </div>

      {/* Hero Portrait with Magnet Effect */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[270px] sm:w-[350px] md:w-[420px] lg:w-[480px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto flex items-end justify-center">
        <FadeIn delay={0.6} y={30} className="w-full flex justify-center">
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-full flex justify-center"
          >
            <img
              src="/rohit.jpg"
              alt="Rohit - B.Tech ECE Student | Programmer | Web Developer"
              className="w-full h-auto object-contain select-none drop-shadow-[0_20px_50px_rgba(118,33,176,0.35)] rounded-2xl sm:rounded-3xl border border-[#7621B0]/30"
              draggable={false}
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 flex justify-between items-end z-20">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[280px]"
            style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}
          >
            a b.tech ece student driven by programming, electronics &amp; web development
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroSection;
