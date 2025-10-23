import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowRight } from "lucide-react";

export default function PromotionPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSeenPopup, setHasSeenPopup] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup and when
    const seenTimestamp = sessionStorage.getItem("promotionPopupSeen");
    const now = Date.now();

    if (seenTimestamp) {
      const timeSinceSeen = now - parseInt(seenTimestamp, 10);
      const oneMinute = 60 * 1000; // 1 minute in milliseconds

      // If more than 1 minute has passed, show popup again
      if (timeSinceSeen > oneMinute) {
        sessionStorage.removeItem("promotionPopupSeen");
      } else {
        // Still within 1 minute, don't show popup
        return;
      }
    }

    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Store current timestamp
    sessionStorage.setItem("promotionPopupSeen", Date.now().toString());
    setHasSeenPopup(true);
  };

  const handleCTAClick = () => {
    // Store current timestamp
    sessionStorage.setItem("promotionPopupSeen", Date.now().toString());
    window.location.href = "/contact";
  };

  const discountPercentage = Math.round(((1500 - 990) / 1500) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Popup Modal */}
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-gradient-to-br from-[rgb(var(--card))] to-[rgb(var(--muted))] rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border-2 border-[rgb(var(--primary-500))]"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[rgb(var(--primary-600))]/80 hover:bg-[rgb(var(--primary-600))] backdrop-blur-sm transition-all"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Decorative gradient top */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-[rgb(var(--primary-500))] to-yellow-400"></div>

              {/* Content */}
              <div className="relative p-8 pt-10">
                {/* Sparkle Icon */}
                <motion.div
                  className="mb-4 flex justify-center"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="p-4 bg-gradient-to-br from-[rgb(var(--primary-500))] to-[rgb(var(--primary-600))] rounded-full">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                </motion.div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 text-[rgb(var(--text-primary))]">
                  Ofertă Specială! 🎉
                </h2>

                {/* Subtitle */}
                <p className="text-center text-lg font-semibold text-[rgb(var(--primary-600))] mb-4">
                  Epilare Definitivă cu Laser
                </p>

                <p className="text-center text-xl font-bold text-[rgb(var(--text-primary))] mb-6">
                  Pe Absolut Tot Corpul
                </p>

                {/* Price Section */}
                <div className="bg-white/5 dark:bg-black/10 rounded-2xl p-6 mb-6 border border-[rgb(var(--border))]">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-sm text-[rgb(var(--text-secondary))] mb-1">
                        Preț vechi
                      </p>
                      <p className="text-2xl text-[rgb(var(--text-tertiary))] line-through font-medium">
                        1500 RON
                      </p>
                    </div>

                    <ArrowRight className="w-6 h-6 text-[rgb(var(--primary-500))]" />

                    <div className="text-center">
                      <p className="text-sm text-[rgb(var(--text-secondary))] mb-1">
                        Preț special
                      </p>
                      <p className="text-4xl font-bold text-[rgb(var(--primary-600))]">
                        990 RON
                      </p>
                    </div>
                  </div>

                  {/* Discount Badge */}
                  <div className="flex justify-center">
                    <motion.div
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold px-4 py-2 rounded-full shadow-lg"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <span className="text-lg">
                        Economisești {discountPercentage}%
                      </span>
                      <span className="text-xl">🔥</span>
                    </motion.div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-2 mb-6">
                  {[
                    "Tehnologie laser de ultimă generație",
                    "Rezultate vizibile după prima ședință",
                    "Fără durere, confort maxim",
                    "Consultație gratuită inclusă",
                    "Include toate zonele corpului",
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 text-[rgb(var(--text-secondary))]"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  onClick={handleCTAClick}
                  className="w-full bg-gradient-to-r from-[rgb(var(--primary-500))] to-[rgb(var(--primary-600))] hover:from-[rgb(var(--primary-600))] hover:to-[rgb(var(--primary-700))] text-white font-bold py-4 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-lg">Programează-te Acum</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                {/* Limited Offer Text */}
                <motion.p
                  className="text-center text-xs text-[rgb(var(--text-tertiary))] mt-4"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ⏰ Ofertă limitată • Locuri limitate
                </motion.p>
              </div>

              {/* Decorative gradient bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-[rgb(var(--primary-500))] to-yellow-400"></div>

              {/* Floating sparkles */}
              <FloatingSparkles />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Floating sparkles effect
function FloatingSparkles() {
  const [sparkles, setSparkles] = useState<
    Array<{
      id: number;
      top: string;
      left: string;
      size: number;
      delay: number;
      duration: number;
    }>
  >([]);

  // Generăm scântei doar pe client pentru a evita hydration mismatch
  useEffect(() => {
    setSparkles(
      Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        top: `${10 + Math.random() * 80}%`,
        left: `${5 + Math.random() * 90}%`,
        size: 2 + Math.random() * 3,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 2,
      }))
    );
  }, []);

  // Nu renderăm nimic până când sparkles sunt generate pe client
  if (sparkles.length === 0) return null;

  return (
    <>
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full bg-yellow-400 pointer-events-none"
          style={{
            top: sparkle.top,
            left: sparkle.left,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            boxShadow: `0 0 ${sparkle.size * 3}px 1px rgba(250, 204, 21, 0.8)`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}
