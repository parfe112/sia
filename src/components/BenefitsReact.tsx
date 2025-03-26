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
}

const benefits: Benefit[] = [
  {
    id: 1,
    link: "/servicii/epilare-definitiva",
    title: "Epilare Definitivă",
    description:
      "Scapă definitiv de părul nedorit! Alege tratamente profesionale cu rezultate vizibile după primele ședințe. Siguranță, confort și piele fină.",
    icon: <Zap size={24} />,
    color: "text-blue-500",
    hoverColor: "bg-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    id: 2,
    link: "/servicii/epilare-definitiva-bucuresti",
    title: "Epilare Definitivă București",
    description:
      "Salon premium de epilare definitivă în București. Locație centrală, aparatură modernă, rezultate rapide. Programează-te acum!",
    icon: <ShieldCheck size={24} />,
    color: "text-purple-500",
    hoverColor: "bg-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    id: 3,
    link: "/servicii/epilare-definitiva-laser",
    title: "Epilare Definitivă cu Laser",
    description:
      "Folosim tehnologia laser de ultimă generație pentru o epilare sigură, eficientă și nedureroasă. Potrivită pentru toate tipurile de piele.",
    icon: <CheckCircle size={24} />,
    color: "text-emerald-500",
    hoverColor: "bg-emerald-500",
    bgColor: "bg-emerald-50",
  },
  {
    id: 4,
    link: "/servicii/epilare-full-body",
    title: "Epilare Full Body",
    description:
      "Epilare completă – de la cap la picioare. Pachet special pentru corp întreg la cel mai bun preț din București. Economisești timp și bani!",
    icon: <Heart size={24} />,
    color: "text-rose-500",
    hoverColor: "bg-rose-500",
    bgColor: "bg-rose-50",
  },
  {
    id: 5,
    link: "/epilare-definitiva-preturi",
    title: "Prețuri Epilare Definitivă",
    description:
      "Prețuri transparente, pachete personalizate și reduceri la mai multe zone tratate. Vezi lista completă de prețuri pe pagină.",
    icon: <Users size={24} />,
    color: "text-amber-500",
    hoverColor: "bg-amber-500",
    bgColor: "bg-amber-50",
  },
  {
    id: 6,
    title: "Pachete & Oferte",
    link: "/pachete-oferte",
    description:
      "Profită de ofertele lunii! Pachete pentru 2+ zone cu reduceri de până la 40%. Ideal pentru full body sau tratamente în cuplu.",
    icon: <BadgeDollarSign size={24} />,
    color: "text-teal-500",
    hoverColor: "bg-teal-500",
    bgColor: "bg-teal-50",
  },
  {
    id: 7,
    link: "/servicii/epilare-definitiva-acasa",
    title: "Epilare Definitivă Acasă vs Salon",
    description:
      "Profită de ofertele lunii! Pachete pentru 2+ zone cu reduceri de până la 40%. Ideal pentru full body sau tratamente în cuplu.",
    icon: <BadgeDollarSign size={24} />,
    color: "text-rose-500",
    hoverColor: "bg-rose-500",
    bgColor: "bg-rose-50",
  },
  {
    id: 8,
    link: "/servicii/epilare-definitiva-elysion-pro",
    title: "Epilare Definitivă Elysion Pro",
    description:
      "Tratament cu laserul Elysion Pro – eficient, rapid și fără durere. Tehnologie medicală de top disponibilă acum în salonul nostru.",
    icon: <ShieldCheck size={24} />,
    color: "text-purple-500",
    hoverColor: "bg-purple-500",
    bgColor: "bg-purple-50",
  },
];

const BenefitsReact = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="py-20 relative overflow-hidden" id="avantaje">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 -z-10"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-primary-200/30 to-primary-300/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-blue-200/30 to-purple-300/20 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
            O piele netedă, un viitor fără griji!
          </h2>
          <p className="text-lg text-gray-600">
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
              className="group relative bg-white rounded-2xl shadow-lg transition-all duration-500 overflow-hidden"
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
                className={`absolute top-0 left-0 right-0 h-1 ${benefit.hoverColor} transform origin-left transition-transform duration-500 ${hoveredCard === benefit.id ? "scale-x-100" : "scale-x-0"}`}
              ></div>

              {/* Card Content */}
              <div className="p-8">
                <div className="flex items-start">
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-lg ${benefit.bgColor} ${benefit.color} flex items-center justify-center transition-transform duration-500 ${hoveredCard === benefit.id ? "rotate-[-8deg] scale-110" : ""}`}
                  >
                    {benefit.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              </div>

              {/* Learn More Indicator */}
              <a
                href={benefit.link}
                className={`flex items-center justify-end p-4 mt-2 ${benefit.color} text-sm font-medium transition-opacity duration-300 ${hoveredCard === benefit.id ? "opacity-100" : "opacity-0"}`}
              >
                <span>Află mai multe</span>
                <ChevronRight className="ml-1 w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* Bottom call-to-action card */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-700 rounded-2xl transform rotate-1 scale-[1.03] opacity-20 blur-sm"></div>
          <div className="relative bg-white rounded-2xl p-8 shadow-xl backdrop-blur-sm border border-gray-100">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-red-600 to-blue-900 bg-clip-text text-transparent">
                  Rezultate garantate pentru fiecare client
                </h3>
                <p className="text-gray-600 max-w-2xl">
                  Tehnologia noastră avansată și specialiștii cu experiență
                  asigură că fiecare client beneficiază de rezultate optime,
                  adaptate perfect tipului de piele și nevoilor individuale.
                </p>
              </div>
              <div className="flex-shrink-0">
                <button
                  onClick={() => (window.location.href = "/contact")}
                  className="bg-gradient-to-r from-blue-500 to-red-700 hover:from-primary-600 hover:to-primary-800 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  Programează ședință
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsReact;
