import React, { useState } from "react";
import { motion } from "framer-motion";
import ButtonAdvert from "../shared/ButtonAdvert";
import { Gift, Check, Clock, Sparkles, Zap } from "lucide-react";
import OfferFormModal from "./OfferFormModal";

const Pachet41Offer: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState({
    type: "",
    title: "",
  });

  const openModal = (offerType: string, offerTitle: string) => {
    setSelectedOffer({ type: offerType, title: offerTitle });
    setModalOpen(true);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10" data-aos="fade-up">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[rgb(var(--text-primary))] leading-tight">
          Ofertă Specială{" "}
          <span className="text-[rgb(var(--primary-600))]">4+1 GRATIS</span>
        </h1>
        <p className="text-lg md:text-xl text-[rgb(var(--text-secondary))] max-w-3xl mx-auto">
          Achiziționează pachet de 4 ședințe și primești 1 GRATIS! Economisești
          și obții rezultate superioare.
        </p>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        {/* Full Body Package */}
        <motion.div
          className="bg-gradient-to-br from-rose-100 to-amber-50 dark:from-rose-900/60 dark:to-amber-900/60 rounded-2xl overflow-hidden shadow-xl border border-rose-200 dark:border-rose-800 relative transition-all duration-300"
          whileHover={{
            y: -5,
            boxShadow: "0 20px 30px rgba(var(--shadow), 0.2)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Ribbon */}
          <div className="absolute -right-16 top-7 rotate-45 z-10">
            <div className="bg-gradient-to-r from-amber-500 to-rose-500 dark:from-amber-400 dark:to-rose-400 shadow-lg py-1 w-64 text-center">
              <motion.span
                className="text-xs font-bold uppercase tracking-wider text-white"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Popular
              </motion.span>
            </div>
          </div>

          <div className="p-6 md:p-8 relative">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[rgb(var(--primary-500))] rounded-full flex items-center justify-center mr-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[rgb(var(--text-primary))]">
                Full Body
              </h3>
            </div>

            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-bold text-green-600 dark:text-green-500">
                2600 lei
              </span>
              <span className="text-lg text-red-500 dark:text-red-400 ml-2 line-through">
                3250 lei
              </span>
              <span className="ml-2 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 text-sm font-medium px-2 py-1 rounded">
                -20%
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-[rgb(var(--text-primary))]">
                  4 ședințe plătite + 1 ședință GRATUITĂ (5 ședințe total)
                </span>
              </div>
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-[rgb(var(--text-primary))]">
                  Brațe integral, picioare integral, inghinal total și axile
                </span>
              </div>
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-[rgb(var(--text-primary))]">
                  Rezultate vizibile după prima ședință
                </span>
              </div>
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-[rgb(var(--text-primary))]">
                  Piele fină și catifelată
                </span>
              </div>
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-[rgb(var(--text-primary))]">
                  Tehnologie de ultimă generație
                </span>
              </div>
            </div>

            <div className="pt-4">
              <ButtonAdvert
                href="#"
                mainText="REZERVĂ"
                subText="Full Body: 2600 lei în loc de 3250 lei"
                discountAmount="20%"
                limitedText="Ofertă limitată • Doar pentru primii 10 clienți"
                onClick={() => openModal("fullbody", "Pachet Full Body 4+1")}
              />
            </div>
          </div>
        </motion.div>

        {/* Summer Package */}
        <motion.div
          className="bg-gradient-to-br from-[rgb(var(--secondary-50))] to-white dark:from-[rgb(var(--secondary-900))] dark:to-[rgb(var(--card))] rounded-2xl overflow-hidden shadow-lg border border-[rgb(var(--secondary-200))] dark:border-[rgb(var(--secondary-700))] relative transition-all duration-300"
          whileHover={{
            y: -5,
            boxShadow: "0 20px 30px rgba(var(--shadow), 0.2)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="p-6 md:p-8 relative">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[rgb(var(--secondary-500))] rounded-full flex items-center justify-center mr-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[rgb(var(--text-primary))]">
                Summer
              </h3>
            </div>

            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-bold text-green-600 dark:text-green-500">
                1800 lei
              </span>
              <span className="text-lg text-red-500 dark:text-red-400 ml-2 line-through">
                2250 lei
              </span>
              <span className="ml-2 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 text-sm font-medium px-2 py-1 rounded">
                -20%
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-[rgb(var(--text-secondary))]">
                  4 ședințe plătite + 1 ședință GRATUITĂ (5 ședințe total)
                </span>
              </div>
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-[rgb(var(--text-secondary))]">
                  Axilă, inghinal și picioare scurt
                </span>
              </div>
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-[rgb(var(--text-secondary))]">
                  Perfectă pentru sezonul cald
                </span>
              </div>
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-[rgb(var(--text-secondary))]">
                  Libertate și încredere în sezonul estival
                </span>
              </div>
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-[rgb(var(--text-secondary))]">
                  Fără griji pentru plajă și piscină
                </span>
              </div>
            </div>

            <div className="pt-4">
              <ButtonAdvert
                href="#"
                mainText="REZERVĂ"
                subText="Summer: 1800 lei în loc de 2250 lei"
                discountAmount="20%"
                limitedText="Ofertă limitată • Doar pentru primii 10 clienți"
                onClick={() => openModal("summer", "Pachet Summer 4+1")}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bonus Box */}
      <motion.div
        className="bg-gradient-to-r from-[rgb(var(--primary-50))] to-[rgb(var(--secondary-50))] dark:from-[rgb(var(--primary-900))] dark:to-[rgb(var(--secondary-900))] rounded-2xl p-6 md:p-8 shadow-lg border border-[rgb(var(--border))] mb-12 relative overflow-hidden transition-theme"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[rgb(var(--primary-200))] dark:bg-[rgb(var(--primary-700))]/30 opacity-20 rounded-full -translate-y-1/2 translate-x-1/2 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[rgb(var(--secondary-200))] dark:bg-[rgb(var(--secondary-700))]/30 opacity-20 rounded-full translate-y-1/2 -translate-x-1/2 -z-10"></div>

        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mr-5 shadow-lg">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <div>
              <h4 className="text-xl md:text-2xl font-bold text-[rgb(var(--text-primary))]">
                BONUS: Consultație gratuită
              </h4>
              <p className="text-[rgb(var(--text-secondary))]">
                Pentru realizarea planului de tratament personalizat.
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-[rgb(var(--primary-600))] mr-2" />
            <span className="text-sm text-[rgb(var(--text-secondary))]">
              Valabilitate ofertă: <b>10 zile</b>
            </span>
          </div>
        </div>
      </motion.div>

      {/* Benefits */}
      <div className="mt-12 md:mt-16" data-aos="fade-up" data-aos-delay="300">
        <div className="text-center mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-[rgb(var(--text-primary))]">
            Te-ai săturat de epilatul constant, iritații și fire crescute sub
            piele? ❌
          </h3>
          <p className="text-lg mt-3 text-[rgb(var(--text-secondary))]">
            E timpul să încerci epilarea definitivă, fără durere, cu rezultate
            reale! ✨
          </p>
        </div>

        <div className="bg-[rgb(var(--primary-50))] dark:bg-[rgb(var(--card))] rounded-xl p-6 shadow-md transition-theme">
          <div className="text-center mb-4">
            <p className="text-base sm:text-lg font-semibold text-[rgb(var(--text-primary))]">
              📍 Vino la SIA SkinCenter
            </p>
            <p className="text-sm sm:text-base text-[rgb(var(--text-secondary))]">
              Str. Antiaeriană 67C, București
            </p>
          </div>

          <div className="mt-6">
            <h4 className="text-center text-base sm:text-lg font-bold text-[rgb(var(--text-primary))] mb-4">
              👉 AVANTAJE:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-[rgb(var(--feature-box-bg))] p-3 rounded-lg shadow-sm text-center border border-[rgb(var(--feature-box-border))] transition-theme">
                <p className="text-sm sm:text-base text-[rgb(var(--feature-box-text))]">
                  ✅ Fără durere
                </p>
              </div>
              <div className="bg-[rgb(var(--feature-box-bg))] p-3 rounded-lg shadow-sm text-center border border-[rgb(var(--feature-box-border))] transition-theme">
                <p className="text-sm sm:text-base text-[rgb(var(--feature-box-text))]">
                  ✅ Piele fină după prima ședință
                </p>
              </div>
              <div className="bg-[rgb(var(--feature-box-bg))] p-3 rounded-lg shadow-sm text-center border border-[rgb(var(--feature-box-border))] transition-theme">
                <p className="text-sm sm:text-base text-[rgb(var(--feature-box-text))]">
                  ✅ Rezultate de lungă durată
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Modal */}
      <OfferFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        offerType={selectedOffer.type}
        offerTitle={selectedOffer.title}
      />
    </div>
  );
};

export default Pachet41Offer;
