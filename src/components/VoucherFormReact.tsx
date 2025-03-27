import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Loader2,
  Sparkles,
  Clock,
  Calendar,
  Tag,
  User,
  Mail,
  Phone,
} from "lucide-react";

interface FormState {
  name: string;
  email: string;
  phone: string;
}

enum SubmitStatus {
  Idle,
  Processing,
  Success,
}

const VoucherFormReact: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(
    SubmitStatus.Idle
  );
  const [vouchersLeft, setVouchersLeft] = useState(3);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Start processing animation
    setSubmitStatus(SubmitStatus.Processing);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Show success state
    setSubmitStatus(SubmitStatus.Success);

    // Reduce vouchers count
    setVouchersLeft((prev) => Math.max(prev - 1, 0));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  // Get highlight text and color based on focused field
  const getHighlightInfo = () => {
    if (focusedField === "name") {
      return {
        text: "Bună! Cum te numești?",
        color: "bg-yellow-500",
        textColor: "text-yellow-500",
        baseColor: "yellow",
      };
    } else if (focusedField === "email") {
      return {
        text: "Vom trimite voucherul pe acest email",
        color: "bg-blue-500",
        textColor: "text-blue-500",
        baseColor: "blue",
      };
    } else if (focusedField === "phone") {
      return {
        text: "Suna pentru confirmare",
        color: "bg-green-500",
        textColor: "text-green-500",
        baseColor: "green",
      };
    }
    return {
      text: "Completează formularul pentru a beneficia de ofertă",
      color: "bg-green-500",
      textColor: "text-green-500",
      baseColor: "green",
    };
  };

  const highlightInfo = getHighlightInfo();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 items-stretch gap-2 sm:gap-0">
      {/* Form Section */}
      <motion.div
        className="bg-[rgb(var(--bg-card-light))] dark:bg-[rgb(var(--bg-card-dark))] rounded-2xl sm:rounded-r-none shadow-xl p-4 sm:p-5 md:p-6 overflow-hidden h-full flex flex-col transition-theme"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header with pill */}
        <div
          className={`-mx-4 -mt-4 sm:-mx-5 sm:-mt-5 md:-mx-6 md:-mt-6 ${highlightInfo.color} p-3 sm:p-4 mb-4 text-white flex items-center justify-between rounded-t-2xl sm:rounded-t-none`}
        >
          <div className="flex items-center gap-2">
            <h2 className="text-base md:text-lg font-bold">
              Voucher GRATUIT - 50% Reducere
            </h2>
          </div>
        </div>

        {submitStatus === SubmitStatus.Success ? (
          <motion.div
            className="flex flex-col items-center justify-center py-6 md:py-8 text-center flex-grow h-full min-h-[250px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className={` w-16 h-16 md:w-20 md:h-20 bg-red-500 rounded-full flex items-center justify-center mb-4`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <X
                className="w-8 h-8 md:w-10 md:h-10 text-white"
                strokeWidth={3}
              />
            </motion.div>
            <h3 className="text-xl md:text-2xl font-bold text-[rgb(var(--text-primary))] mb-2">
              Voucherul a fost trimis pe email dar nu a fost activat inca.
              Sunați la numărul de mai jos pentru activare.
              <br />
              <br />
              <a
                href="tel:0770889907"
                className="bg-green-500 hover:bg-green-600 text-white rounded-xl p-4 inline-block transition-all duration-300 transform hover:scale-105"
              >
                0770 889 907
              </a>
            </h3>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-3 md:space-y-4 flex-grow flex flex-col min-h-[250px]"
          >
            {/* Dynamic highlight message */}
            <AnimatePresence mode="wait">
              <motion.div
                key={focusedField}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="mb-3 flex items-center gap-2"
              ></motion.div>
            </AnimatePresence>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex-grow flex flex-col"
            >
              <motion.div variants={itemVariants} className="mb-3">
                <label
                  htmlFor="name"
                  className="block text-xs md:text-sm font-medium text-[rgb(var(--field-label))] mb-1"
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
                    className={`w-full pl-10 pr-4 py-2 md:pl-10 md:pr-4 md:py-3 text-sm rounded-lg bg-white dark:bg-[rgb(var(--card))] text-[rgb(var(--text-primary))] border transition-all duration-300 ${
                      focusedField === "name"
                        ? `border-emerald-400 ring-2 ring-emerald-400/20`
                        : "border-[rgb(var(--border))] hover:border-primary-300"
                    }`}
                    placeholder="Nume și prenume"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-3">
                <label
                  htmlFor="email"
                  className="block text-xs md:text-sm font-medium text-[rgb(var(--field-label))] mb-1"
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
                    className={`w-full pl-10 pr-4 py-2 md:pl-10 md:pr-4 md:py-3 text-sm rounded-lg bg-white dark:bg-[rgb(var(--card))] text-[rgb(var(--text-primary))] border transition-all duration-300 ${
                      focusedField === "email"
                        ? `border-blue-400 ring-2 ring-blue-400/20`
                        : "border-[rgb(var(--border))] hover:border-primary-300"
                    }`}
                    placeholder="email@exemplu.com"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-xs md:text-sm font-medium text-[rgb(var(--field-label))] mb-1"
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
                    className={`w-full pl-10 pr-4 py-2 md:pl-10 md:pr-4 md:py-3 text-sm rounded-lg bg-white dark:bg-[rgb(var(--card))] text-[rgb(var(--text-primary))] border transition-all duration-300 ${
                      focusedField === "phone"
                        ? `border-purple-400 ring-2 ring-purple-400/20`
                        : "border-[rgb(var(--border))] hover:border-primary-300"
                    }`}
                    placeholder="07xx xxx xxx"
                  />
                </div>
              </motion.div>

              <div className="mt-auto">
                <motion.button
                  type="submit"
                  disabled={submitStatus === SubmitStatus.Processing}
                  className={`w-full ${highlightInfo.color} hover:bg-primary-600 text-white font-bold py-3 md:py-4 px-4 md:px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl text-sm md:text-base uppercase tracking-wide`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {submitStatus === SubmitStatus.Processing ? (
                    <motion.div className="flex items-center justify-center">
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      <span>Se procesează...</span>
                    </motion.div>
                  ) : (
                    <span>OBȚINE VOUCHERUL</span>
                  )}
                </motion.button>

                <motion.p
                  variants={itemVariants}
                  className="text-xs text-center text-[rgb(var(--text-tertiary))] mt-2 md:mt-3"
                >
                  Îți respectăm intimitatea. Te poți dezabona oricând.
                </motion.p>
              </div>
            </motion.div>
          </form>
        )}
      </motion.div>

      {/* Promo Info Section */}
      <motion.div
        className="relative bg-gradient-to-br from-[rgb(var(--primary-600))] to-[rgb(var(--secondary-400))] text-white p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-l-none shadow-xl overflow-hidden h-full transition-theme"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-10 left-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10"
            animate={{
              y: [0, 10, 0],
              x: [0, 5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/5"
            animate={{
              y: [0, -15, 0],
              x: [0, -10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute top-1/3 right-10 w-8 h-8 md:w-12 md:h-12 rounded-full bg-[rgb(var(--secondary-500))]/20"
            animate={{
              y: [0, 20, 0],
              x: [0, -5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-4 md:mb-6"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={focusedField}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex items-center gap-2 mb-2 md:mb-4"
              >
                <div
                  className={`${highlightInfo.color} px-2 text-center py-1 rounded-full text-xs text-white`}
                >
                  <span>Ofertă limitată</span>
                </div>
                <p className="text-sm md:text-lg font-medium text-white/90">
                  {highlightInfo.text}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="mb-6 md:mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.div
              className="bg-white/10 backdrop-blur-sm p-3 md:p-4 rounded-xl border border-white/20 mb-4 md:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-start gap-2 md:gap-3">
                <Tag className="w-5 h-5 md:w-6 md:h-6 mt-1 text-white/90" />
                <div>
                  <p className="text-xs md:text-sm text-white/80 mb-1">
                    Prețul ședinței FULL BODY cu voucher
                  </p>
                  <div className="flex items-center">
                    <motion.span
                      className="text-xl md:text-2xl font-bold mr-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.1, type: "spring" }}
                    >
                      250 RON
                    </motion.span>
                    <span className="text-white/60 line-through text-xs md:text-sm">
                      500 RON
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="flex items-center mb-3 md:mb-4 gap-2 md:gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <span
                className={`${highlightInfo.color} text-white px-2 py-1 rounded-full text-xs md:text-sm font-bold flex items-center gap-1`}
              >
                <Clock className="w-3 h-3 md:w-4 md:h-4" />
                <AnimatePresence>
                  <motion.span
                    key={vouchersLeft}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                  >
                    Numai {vouchersLeft} vouchere disponibile
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="animate-pulse">⏳</span>
            </motion.div>

            <motion.div
              className="flex items-center gap-1 md:gap-2 mb-4 md:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Calendar className="w-4 h-4 md:w-5 md:h-5 text-white/80" />
              <span className="text-xs md:text-sm text-white/90">
                Locuri limitate! Rezervă-ți locul acum!
              </span>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-sm p-3 md:p-4 rounded-xl border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white" />
                <h3 className="text-sm md:text-base font-semibold">
                  BONUS: Consultație gratuită
                </h3>
              </div>
              <p className="text-xs md:text-sm text-white/80 ml-6 md:ml-8">
                Pentru realizarea planului de tratament personalizat.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default VoucherFormReact;
