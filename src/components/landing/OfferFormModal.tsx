import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Loader2,
  User,
  Mail,
  Phone,
  CheckCircle2,
  PhoneCall,
} from "lucide-react";

interface FormState {
  name: string;
  email: string;
  phone: string;
  offerType: string;
}

enum SubmitStatus {
  Idle,
  Processing,
  Success,
}

interface OfferFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  offerType: string;
  offerTitle: string;
}

const OfferFormModal: React.FC<OfferFormModalProps> = ({
  isOpen,
  onClose,
  offerType,
  offerTitle,
}) => {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    offerType: offerType,
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(
    SubmitStatus.Idle
  );

  // Update offerType when prop changes
  useEffect(() => {
    setFormState((prev) => ({ ...prev, offerType }));
  }, [offerType]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const resetForm = () => {
    setFormState({
      name: "",
      email: "",
      phone: "",
      offerType: offerType,
    });
    setSubmitStatus(SubmitStatus.Idle);
  };

  const handleClose = () => {
    onClose();
    // Reset the form after animation completes
    setTimeout(resetForm, 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Start processing animation
    setSubmitStatus(SubmitStatus.Processing);

    try {
      // Call our API endpoint
      const response = await fetch("/api/offer-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const result = await response.json();

      if (result.success) {
        // Show success state
        setSubmitStatus(SubmitStatus.Success);
      } else {
        // Handle error
        alert(
          result.message || "A apărut o eroare. Te rugăm să încerci din nou."
        );
        setSubmitStatus(SubmitStatus.Idle);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("A apărut o eroare de rețea. Te rugăm să încerci din nou.");
      setSubmitStatus(SubmitStatus.Idle);
    }
  };

  // Get highlight color based on focused field
  const getHighlightColor = () => {
    if (focusedField === "name") {
      return "border-emerald-400 ring-2 ring-emerald-400/20";
    } else if (focusedField === "email") {
      return "border-blue-400 ring-2 ring-blue-400/20";
    } else if (focusedField === "phone") {
      return "border-purple-400 ring-2 ring-purple-400/20";
    }
    return "border-[rgb(var(--border))] hover:border-primary-300";
  };

  // Animation variants
  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2, delay: 0.1 },
    },
  };

  const formItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * custom,
        duration: 0.3,
      },
    }),
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 max-w-md w-full mx-4 bg-[rgb(var(--background))] dark:bg-[rgb(var(--card))] rounded-2xl shadow-2xl overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[rgb(var(--primary-600))] to-[rgb(var(--secondary-600))] p-5 text-white">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{offerTitle}</h2>
                <button
                  onClick={handleClose}
                  className="p-1 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-white/90 mt-1">
                Completează formularul pentru a beneficia de ofertă
              </p>

              {/* Direct call option */}
              <div className="mt-3 flex items-center">
                <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                  <PhoneCall className="w-4 h-4 text-white mr-2" />
                  <span className="text-white text-sm font-medium">
                    Sună direct:
                  </span>
                  <a
                    href="tel:0770889907"
                    className="text-white text-sm font-bold ml-2 underline hover:text-white/80 transition-colors"
                  >
                    0770 889 907
                  </a>
                </div>
              </div>

              <div className="mt-2 text-center">
                <p className="text-xs text-white/80 italic">
                  Sună pentru programare imediată sau completează formularul și
                  te vom contacta noi
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              {submitStatus === SubmitStatus.Success ? (
                <motion.div
                  className="py-8 flex flex-col items-center justify-center text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.2,
                    }}
                  >
                    <CheckCircle2
                      className="w-10 h-10 text-white"
                      strokeWidth={3}
                    />
                  </motion.div>
                  <h3 className="text-xl font-bold text-[rgb(var(--text-primary))] mb-2">
                    Cererea ta a fost înregistrată!
                  </h3>
                  <p className="text-[rgb(var(--text-secondary))] mb-6">
                    Te vom contacta în curând pentru a confirma detaliile
                    ofertei.
                  </p>
                  <motion.button
                    className="px-6 py-2 bg-[rgb(var(--primary-600))] text-white rounded-lg hover:bg-[rgb(var(--primary-700))] transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleClose}
                  >
                    Închide
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <motion.div
                    variants={formItemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={1}
                  >
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-[rgb(var(--field-label))] mb-1"
                    >
                      Numele tău
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[rgb(var(--text-tertiary))]" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("name")}
                        onBlur={handleBlur}
                        required
                        className={`w-full pl-10 pr-4 py-3 text-sm rounded-lg bg-white dark:bg-[rgb(var(--card))] text-[rgb(var(--text-primary))] border transition-all duration-300 ${
                          focusedField === "name"
                            ? "border-emerald-400 ring-2 ring-emerald-400/20"
                            : "border-[rgb(var(--border))] hover:border-primary-300"
                        }`}
                        placeholder="Nume și prenume"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    variants={formItemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={2}
                  >
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[rgb(var(--field-label))] mb-1"
                    >
                      Adresa ta de email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[rgb(var(--text-tertiary))]" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("email")}
                        onBlur={handleBlur}
                        required
                        className={`w-full pl-10 pr-4 py-3 text-sm rounded-lg bg-white dark:bg-[rgb(var(--card))] text-[rgb(var(--text-primary))] border transition-all duration-300 ${
                          focusedField === "email"
                            ? "border-blue-400 ring-2 ring-blue-400/20"
                            : "border-[rgb(var(--border))] hover:border-primary-300"
                        }`}
                        placeholder="email@exemplu.com"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    variants={formItemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={3}
                  >
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-[rgb(var(--field-label))] mb-1"
                    >
                      Număr de telefon
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[rgb(var(--text-tertiary))]" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("phone")}
                        onBlur={handleBlur}
                        required
                        className={`w-full pl-10 pr-4 py-3 text-sm rounded-lg bg-white dark:bg-[rgb(var(--card))] text-[rgb(var(--text-primary))] border transition-all duration-300 ${
                          focusedField === "phone"
                            ? "border-purple-400 ring-2 ring-purple-400/20"
                            : "border-[rgb(var(--border))] hover:border-primary-300"
                        }`}
                        placeholder="07xx xxx xxx"
                      />
                    </div>
                  </motion.div>

                  <motion.input
                    type="hidden"
                    name="offerType"
                    value={formState.offerType}
                  />

                  <motion.div
                    className="pt-4"
                    variants={formItemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={4}
                  >
                    <button
                      type="submit"
                      disabled={submitStatus === SubmitStatus.Processing}
                      className="w-full bg-[rgb(var(--primary-600))] hover:bg-[rgb(var(--primary-700))] text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-sm uppercase tracking-wide"
                    >
                      {submitStatus === SubmitStatus.Processing ? (
                        <div className="flex items-center justify-center">
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          <span>Se procesează...</span>
                        </div>
                      ) : (
                        <span>Beneficiază de ofertă</span>
                      )}
                    </button>

                    <p className="text-xs text-center text-[rgb(var(--text-tertiary))] mt-3">
                      Îți respectăm intimitatea. Datele tale sunt în siguranță.
                    </p>
                  </motion.div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default OfferFormModal;
