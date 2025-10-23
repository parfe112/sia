import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import pricingData from "../data/pricing.json";
import ButtonAdvert from "./shared/ButtonAdvert";

interface PriceCardProps {
  name: string;
  price: number;
  package: {
    price: number;
    originalPrice: number;
  };
  isElectroepilation?: boolean;
}

const PriceCard: React.FC<PriceCardProps> = ({
  name,
  price,
  package: pkg,
  isElectroepilation = false,
}) => {
  // Calculate discount percentage
  const discountPercentage = Math.round(
    ((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100
  );

  return (
    <motion.div
      className="bg-[rgb(var(--card))] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-theme border border-[rgb(var(--border))]"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Card Header with zone name */}
      <div className="bg-gradient-to-r from-[rgb(var(--primary-500))] to-[rgb(var(--primary-600))] p-4">
        <h3 className="font-bold text-lg text-white tracking-wide">{name}</h3>
      </div>

      <div className="p-6">
        <div className="flex flex-col gap-6">
          {/* Single Session Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[rgb(var(--primary-100))] dark:bg-[rgb(var(--primary-900))]/20 flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[rgb(var(--primary-600))]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-[rgb(var(--text-secondary))]">
                  {isElectroepilation ? "Preț sesiune" : "Preț / ședință"}
                </p>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-[rgb(var(--text-primary))]">
                {price} <span className="text-sm font-normal">LEI</span>
              </p>
            </div>
          </div>

          {!isElectroepilation && (
            <>
              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-[rgb(var(--border))] to-transparent"></div>

              {/* Package Price */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[rgb(var(--primary-100))] dark:bg-[rgb(var(--primary-900))]/20 flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[rgb(var(--primary-600))]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-[rgb(var(--text-secondary))]">
                      Pachet (10 ședințe)
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-baseline justify-end">
                    <p className="text-2xl font-bold text-[rgb(var(--primary-600))]">
                      {pkg.price}{" "}
                      <span className="text-sm font-normal">LEI</span>
                    </p>
                  </div>
                  <div className="flex items-center justify-end mt-1">
                    <p className="text-sm text-[rgb(var(--text-tertiary))] line-through mr-2">
                      {pkg.originalPrice} LEI
                    </p>
                    <span className="inline-block bg-[rgb(var(--primary-100))] dark:bg-[rgb(var(--primary-800))] text-[rgb(var(--primary-700))] dark:text-[rgb(var(--primary-200))] text-xs font-medium px-2 py-0.5 rounded-full">
                      -{discountPercentage}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Savings highlight */}
              <div className="mt-6 bg-[rgb(var(--muted))] dark:bg-[rgb(var(--muted))]/20 rounded-lg p-3 text-center">
                <p className="text-sm text-green-500">
                  Economisești{" "}
                  <span className="font-bold">
                    {pkg.originalPrice - pkg.price} LEI
                  </span>{" "}
                  cu pachetul
                </p>
              </div>
            </>
          )}

          {isElectroepilation && (
            <div className="mt-2 bg-[rgb(var(--muted))] dark:bg-[rgb(var(--muted))]/20 rounded-lg p-3 text-center">
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                Preț cu discount de{" "}
                <span className="font-bold text-[rgb(var(--primary-600))]">
                  25%
                </span>{" "}
                aplicat
              </p>
              <p className="text-xs text-[rgb(var(--text-tertiary))] mt-1 line-through">
                Preț original: {pkg.originalPrice} LEI
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function PricingReact() {
  const [serviceType, setServiceType] = useState<
    "laserEpilation" | "electroepilation"
  >("laserEpilation");
  const [activeTab, setActiveTab] = useState<"women" | "men">("women");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(
    pricingData.laserEpilation.women
  );

  useEffect(() => {
    // Update filtered items when service type, tab or search term changes
    const currentData = pricingData[serviceType][activeTab];

    if (searchTerm.trim() === "") {
      setFilteredItems(currentData);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = currentData.filter((item) =>
        item.name.toLowerCase().includes(term)
      );
      setFilteredItems(filtered);
    }
  }, [searchTerm, activeTab, serviceType]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const isElectroepilation = serviceType === "electroepilation";

  return (
    <div className="py-16 bg-[rgb(var(--background))] transition-theme">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-[rgb(var(--text-primary))]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Prețuri Epilare Definitivă
          </motion.h2>
          <motion.p
            className="text-lg text-[rgb(var(--text-secondary))] max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Oferim servicii premium de epilare definitivă cu laser și
            electroepilare pentru toate tipurile de piele, la prețuri
            accesibile.
          </motion.p>
          <div className="mt-16 flex justify-center">
            <ButtonAdvert />
          </div>
        </div>

        {/* Service Type Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-[rgb(var(--muted))] dark:bg-[rgb(var(--card))]/30 p-1 rounded-full inline-flex">
            <button
              className={`px-8 py-3 rounded-full text-sm font-medium transition-theme ${
                serviceType === "laserEpilation"
                  ? "bg-[rgb(var(--primary-600))] text-white shadow-lg"
                  : "text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))]"
              }`}
              onClick={() => {
                setServiceType("laserEpilation");
                setSearchTerm("");
              }}
            >
              Epilare Definitivă cu Laser
            </button>
            <button
              className={`px-8 py-3 rounded-full text-sm font-medium transition-theme ${
                serviceType === "electroepilation"
                  ? "bg-[rgb(var(--primary-600))] text-white shadow-lg"
                  : "text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))]"
              }`}
              onClick={() => {
                setServiceType("electroepilation");
                setSearchTerm("");
              }}
            >
              Electroepilare
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="bg-[rgb(var(--muted))] dark:bg-[rgb(var(--card))]/30 p-1 rounded-full">
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-theme ${
                activeTab === "women"
                  ? "bg-[rgb(var(--primary-600))] text-white"
                  : "text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))]"
              }`}
              onClick={() => {
                setActiveTab("women");
                setSearchTerm("");
              }}
            >
              Femei
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-theme ${
                activeTab === "men"
                  ? "bg-[rgb(var(--primary-600))] text-white"
                  : "text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))]"
              }`}
              onClick={() => {
                setActiveTab("men");
                setSearchTerm("");
              }}
              disabled={
                isElectroepilation &&
                pricingData.electroepilation.men.length === 0
              }
            >
              Bărbați
            </button>
          </div>

          <div className="relative w-full md:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[rgb(var(--text-tertiary))]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-4 py-2 border border-[rgb(var(--border))] rounded-full bg-[rgb(var(--background))] text-[rgb(var(--text-primary))] placeholder-[rgb(var(--text-tertiary))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary-600))] focus:border-transparent transition-theme"
              placeholder={
                isElectroepilation
                  ? "Caută durata..."
                  : "Caută zona de epilare..."
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setSearchTerm("")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-primary))]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <motion.div
            className="text-center py-12 bg-[rgb(var(--card))] rounded-xl shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-[rgb(var(--text-tertiary))]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl mt-4 text-[rgb(var(--text-primary))]">
              {isElectroepilation && activeTab === "men"
                ? "Electroepilarea este disponibilă doar pentru femei"
                : `Nu am găsit rezultate pentru "${searchTerm}"`}
            </h3>
            {!isElectroepilation && (
              <p className="text-[rgb(var(--text-secondary))] mt-2 max-w-md mx-auto">
                Încearcă alt termen de căutare sau{" "}
                <button
                  className="text-[rgb(var(--primary-600))] hover:text-[rgb(var(--primary-700))] transition-theme"
                  onClick={() => setSearchTerm("")}
                >
                  vezi toate serviciile
                </button>
              </p>
            )}
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            key={serviceType + activeTab + searchTerm} // Force re-animate when service type, tab or search changes
          >
            {filteredItems.map((item, index) => (
              <PriceCard
                key={`${item.name}-${index}`}
                name={item.name}
                price={item.price}
                package={item.package}
                isElectroepilation={isElectroepilation}
              />
            ))}
          </motion.div>
        )}

        <motion.div
          className="mt-12 bg-[rgb(var(--card))] rounded-xl p-6 md:p-8 shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h3 className="text-xl md:text-2xl font-bold mb-4 text-[rgb(var(--text-primary))]">
            Informații importante
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-[rgb(var(--primary-100))] dark:bg-[rgb(var(--primary-900))]/20 flex items-center justify-center mr-4 mt-1 shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[rgb(var(--primary-600))]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2 text-[rgb(var(--text-primary))]">
                  Ședințe recomandate
                </h4>
                <p className="text-[rgb(var(--text-secondary))]">
                  {isElectroepilation
                    ? "Pentru electroepilare, numărul de ședințe variază în funcție de zona tratată și de densitatea părului. Consultația gratuită vă va ajuta să determinați planul optim."
                    : "Pentru a obține cele mai bune rezultate, recomandăm 6-10 ședințe, în funcție de zona tratată și de tipul de păr."}
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-[rgb(var(--primary-100))] dark:bg-[rgb(var(--primary-900))]/20 flex items-center justify-center mr-4 mt-1 shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[rgb(var(--primary-600))]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2 text-[rgb(var(--text-primary))]">
                  {isElectroepilation
                    ? "Durata sesiunii"
                    : "Intervale între ședințe"}
                </h4>
                <p className="text-[rgb(var(--text-secondary))]">
                  {isElectroepilation
                    ? "Sesiunile de electroepilare durează între 15-120 minute, în funcție de zona tratată și de planul stabilit împreună cu specialistul."
                    : "Intervalele recomandate între ședințe sunt de 4-6 săptămâni, în funcție de zona tratată și de rezultatele obținute."}
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-[rgb(var(--primary-100))] dark:bg-[rgb(var(--primary-900))]/20 flex items-center justify-center mr-4 mt-1 shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[rgb(var(--primary-600))]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2 text-[rgb(var(--text-primary))]">
                  Garanția rezultatelor
                </h4>
                <p className="text-[rgb(var(--text-secondary))]">
                  {isElectroepilation
                    ? "Electroepilarea este singura metodă 100% definitivă aprobată de FDA. Garantăm distrugerea permanentă a foliculilor tratați."
                    : "Garantăm rezultate vizibile după primele 3 ședințe, cu o reducere de 70-90% a părului în zona tratată la finalul pachetului."}
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-[rgb(var(--primary-100))] dark:bg-[rgb(var(--primary-900))]/20 flex items-center justify-center mr-4 mt-1 shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[rgb(var(--primary-600))]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2 text-[rgb(var(--text-primary))]">
                  Metode de plată
                </h4>
                <p className="text-[rgb(var(--text-secondary))]">
                  Acceptăm plata cu cardul, în numerar sau prin transfer bancar.
                  {!isElectroepilation &&
                    " Pachetele pot fi achitate integral sau în rate."}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
