import React, { useState } from "react";
import {
  Zap,
  ShieldCheck,
  CheckCircle,
  Heart,
  Users,
  BadgeDollarSign,
  ChevronRight,
} from "lucide-react";

interface Benefit {
  id: number;
  title: string;
  link: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  hoverColor: string;
  bgColor: string;
  darkColor: string;
  darkHoverColor: string;
  darkBgColor: string;
}

const benefits: Benefit[] = [
  {
    id: 1,
    link: "/servicii/epilare-definitiva",
    title: "Epilare Definitivă",
    description:
      "Scapă definitiv de părul nedorit! Alege tratamente profesionale cu rezultate vizibile după primele ședințe. Siguranță, confort și piele fină.",
    icon: <Zap size={24} />,
    color: "text-blue-600",
    hoverColor: "bg-blue-600",
    bgColor: "bg-gradient-to-br from-blue-500 to-blue-700",
    darkColor: "dark:text-blue-300",
    darkHoverColor: "dark:bg-blue-600",
    darkBgColor: "dark:bg-gradient-to-br dark:from-blue-600 dark:to-blue-900",
  },
  {
    id: 2,
    link: "/servicii/epilare-definitiva-bucuresti",
    title: "Epilare Definitivă București",
    description:
      "Salon premium de epilare definitivă în București. Locație centrală, aparatură modernă, rezultate rapide. Programează-te acum!",
    icon: <ShieldCheck size={24} />,
    color: "text-purple-600",
    hoverColor: "bg-purple-600",
    bgColor: "bg-gradient-to-br from-purple-500 to-purple-700",
    darkColor: "dark:text-purple-300",
    darkHoverColor: "dark:bg-purple-600",
    darkBgColor:
      "dark:bg-gradient-to-br dark:from-purple-600 dark:to-purple-900",
  },
  {
    id: 3,
    link: "/servicii/epilare-definitiva-laser",
    title: "Epilare Definitivă cu Laser",
    description:
      "Folosim tehnologia laser de ultimă generație pentru o epilare sigură, eficientă și nedureroasă. Potrivită pentru toate tipurile de piele.",
    icon: <CheckCircle size={24} />,
    color: "text-emerald-600",
    hoverColor: "bg-emerald-600",
    bgColor: "bg-gradient-to-br from-emerald-500 to-emerald-700",
    darkColor: "dark:text-emerald-300",
    darkHoverColor: "dark:bg-emerald-600",
    darkBgColor:
      "dark:bg-gradient-to-br dark:from-emerald-600 dark:to-emerald-900",
  },
  {
    id: 4,
    link: "/servicii/epilare-full-body",
    title: "Epilare Full Body",
    description:
      "Epilare completă – de la cap la picioare. Pachet special pentru corp întreg la cel mai bun preț din București. Economisești timp și bani!",
    icon: <Heart size={24} />,
    color: "text-rose-600",
    hoverColor: "bg-rose-600",
    bgColor: "bg-gradient-to-br from-rose-500 to-rose-700",
    darkColor: "dark:text-rose-300",
    darkHoverColor: "dark:bg-rose-600",
    darkBgColor: "dark:bg-gradient-to-br dark:from-rose-600 dark:to-rose-900",
  },
  {
    id: 5,
    link: "/epilare-definitiva-preturi",
    title: "Prețuri Epilare Definitivă",
    description:
      "Prețuri transparente, pachete personalizate și reduceri la mai multe zone tratate. Vezi lista completă de prețuri pe pagină.",
    icon: <Users size={24} />,
    color: "text-amber-600",
    hoverColor: "bg-amber-600",
    bgColor: "bg-gradient-to-br from-amber-500 to-amber-700",
    darkColor: "dark:text-amber-300",
    darkHoverColor: "dark:bg-amber-600",
    darkBgColor: "dark:bg-gradient-to-br dark:from-amber-600 dark:to-amber-900",
  },
  {
    id: 6,
    title: "Pachete & Oferte",
    link: "/pachete-oferte",
    description:
      "Profită de ofertele lunii! Pachete pentru 2+ zone cu reduceri de până la 40%. Ideal pentru full body sau tratamente în cuplu.",
    icon: <BadgeDollarSign size={24} />,
    color: "text-teal-600",
    hoverColor: "bg-teal-600",
    bgColor: "bg-gradient-to-br from-teal-500 to-teal-700",
    darkColor: "dark:text-teal-300",
    darkHoverColor: "dark:bg-teal-600",
    darkBgColor: "dark:bg-gradient-to-br dark:from-teal-600 dark:to-teal-900",
  },
  {
    id: 7,
    link: "/servicii/epilare-definitiva-acasa",
    title: "Epilare Definitivă Acasă vs Salon",
    description:
      "Profită de ofertele lunii! Pachete pentru 2+ zone cu reduceri de până la 40%. Ideal pentru full body sau tratamente în cuplu.",
    icon: <BadgeDollarSign size={24} />,
    color: "text-rose-600",
    hoverColor: "bg-rose-600",
    bgColor: "bg-gradient-to-br from-rose-500 to-rose-700",
    darkColor: "dark:text-rose-300",
    darkHoverColor: "dark:bg-rose-600",
    darkBgColor: "dark:bg-gradient-to-br dark:from-rose-600 dark:to-rose-900",
  },
  {
    id: 8,
    link: "/servicii/epilare-definitiva-elysion-pro",
    title: "Epilare Definitivă Elysion Pro",
    description:
      "Tratament cu laserul Elysion Pro – eficient, rapid și fără durere. Tehnologie medicală de top disponibilă acum în salonul nostru.",
    icon: <ShieldCheck size={24} />,
    color: "text-purple-600",
    hoverColor: "bg-purple-600",
    bgColor: "bg-gradient-to-br from-purple-500 to-purple-700",
    darkColor: "dark:text-purple-300",
    darkHoverColor: "dark:bg-purple-600",
    darkBgColor:
      "dark:bg-gradient-to-br dark:from-purple-600 dark:to-purple-900",
  },
];

const BenefitsReact = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="py-20 relative overflow-hidden" id="avantaje">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--background))] to-[rgb(var(--primary-50))] dark:from-[rgb(var(--background))] dark:to-[rgb(var(--primary-200))]/5 -z-10 transition-theme"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-[rgb(var(--primary-200))]/30 to-[rgb(var(--primary-300))]/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-blue-200/30 to-purple-300/20 dark:from-blue-900/30 dark:to-purple-800/20 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[rgb(var(--text-primary))]">
            O piele netedă, un viitor fără griji!
          </h2>
          <p className="text-lg text-[rgb(var(--text-secondary))]">
            La SIA Skin Center, transformăm experiența epilării faciale și
            corporale cu tratamente personalizate care îți oferă o piele
            impecabilă, fără dureri și fără griji, indiferent de anotimp.
          </p>
        </div>

        {/* Main grid of benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="group relative bg-white dark:bg-[rgb(var(--card))] rounded-2xl shadow-lg duration-500 overflow-hidden border border-[rgb(var(--feature-box-border))] transition-theme"
              style={{
                transform:
                  hoveredCard === benefit.id
                    ? "translateY(-8px)"
                    : "translateY(0)",
                boxShadow:
                  hoveredCard === benefit.id
                    ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              }}
              onMouseEnter={() => setHoveredCard(benefit.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Top Gradient Line */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 ${benefit.hoverColor} ${benefit.darkHoverColor} transform origin-left transition-transform duration-500 ${hoveredCard === benefit.id ? "scale-x-100" : "scale-x-0"}`}
              ></div>

              {/* Card Content */}
              <div className="p-8">
                <div className="flex items-start">
                  <div
                    className={`benefit-icon flex-shrink-0 w-14 h-14 rounded-xl ${benefit.bgColor} ${benefit.darkBgColor} text-white flex items-center justify-center transition-all duration-500 shadow-lg ${hoveredCard === benefit.id ? "rotate-[-8deg] scale-110" : ""}`}
                  >
                    {benefit.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold mb-2 text-[rgb(var(--feature-box-text))]">
                      {benefit.title}
                    </h3>
                    <p className="text-[rgb(var(--text-secondary))]">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Learn More Indicator */}
              <div className={`flex items-center justify-end p-4 font-medium`}>
                <a
                  href={benefit.link}
                  className={`learn-more-link flex flex-col items-end ${benefit.color} ${benefit.darkColor} hover:text-[rgb(var(--primary-700))] dark:hover:text-[rgb(var(--primary-400))] text-sm`}
                  aria-label={`${benefit.title} - Află mai multe`}
                >
                  <div className="flex items-center">
                    <span className="transition-opacity duration-300 font-bold">
                      Află mai multe
                    </span>
                    <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                  <span className="text-xs mt-1 text-[rgb(var(--text-secondary))]">
                    {benefit.title}
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom call-to-action card */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--primary-500))] to-[rgb(var(--primary-700))] rounded-2xl transform rotate-1 scale-[1.03] opacity-20 blur-sm"></div>
          <div className="relative bg-[rgb(var(--feature-box-bg))] rounded-2xl p-8 shadow-xl backdrop-blur-sm border border-[rgb(var(--feature-box-border))] transition-theme">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h3 className="text-2xl font-bold mb-2 text-[rgb(var(--text-primary))]">
                  Rezultate garantate pentru fiecare client
                </h3>
                <p className="text-[rgb(var(--text-secondary))] max-w-2xl">
                  Tehnologia noastră avansată și specialiștii cu experiență
                  asigură că fiecare client beneficiază de rezultate optime,
                  adaptate perfect tipului de piele și nevoilor individuale.
                </p>
              </div>
              <div className="flex-shrink-0">
                <button
                  onClick={() => (window.location.href = "/contact")}
                  className="bg-gradient-to-r from-[rgb(var(--primary-600))] to-[rgb(var(--primary-800))] hover:from-[rgb(var(--primary-500))] hover:to-[rgb(var(--primary-700))] text-white font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  Programează ședință
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
        .benefit-icon {
          position: relative;
          overflow: hidden;
          box-shadow: 
            0 6px 12px -2px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(255, 255, 255, 0.2) inset;
          z-index: 1;
        }
        
        .benefit-icon::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%);
          z-index: 2;
        }
        
        .learn-more-link {
          position: relative;
          transition: all 0.3s ease;
          font-weight: 600;
        }
        
        .learn-more-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: currentColor;
          transition: width 0.3s ease;
        }
        
        .group:hover .learn-more-link::after {
          width: 100%;
        }

        /* Separate underline just for the primary text */
        .learn-more-link div::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background-color: currentColor;
          transition: width 0.3s ease;
        }
        
        .group:hover .learn-more-link div::after {
          width: 100%;
        }
        `}
      </style>
    </section>
  );
};

export default BenefitsReact;
