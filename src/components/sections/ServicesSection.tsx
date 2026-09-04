import React from "react";
import { FadeIn } from "../common/FadeIn";
import { SERVICES } from "../../data/services";

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-0"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading: Services */}
        <FadeIn delay={0} y={40} className="w-full text-center">
          <h2
            className="text-[#0C0C0C] font-black uppercase leading-none text-center mb-16 sm:mb-20 md:mb-28 select-none"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
          >
            What I Do
          </h2>
        </FadeIn>

        {/* Services List */}
        <div className="border-t border-[#0C0C0C]/15">
          {SERVICES.map((service, index) => (
            <FadeIn
              key={service.id}
              delay={index * 0.1}
              y={30}
              className="border-b border-[#0C0C0C]/15 py-8 sm:py-10 md:py-12"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-16">
                {/* Number */}
                <div
                  className="font-black text-[#0C0C0C] leading-none shrink-0 select-none"
                  style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
                >
                  {service.number}
                </div>

                {/* Name + Description Stack */}
                <div className="flex flex-col gap-2 sm:gap-3 flex-1">
                  <h3
                    className="font-medium uppercase text-[#0C0C0C] leading-tight"
                    style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
                  >
                    {service.name}
                  </h3>
                  <p
                    className="font-light text-[#0C0C0C] leading-relaxed max-w-2xl opacity-60"
                    style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
