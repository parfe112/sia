import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  Mail,
  Phone,
  User,
  MessageSquare,
  MapPin,
  Clock,
  HelpCircle,
} from "lucide-react";

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

enum SubmitStatus {
  Idle,
  Processing,
  Success,
}

const ContactFormReact: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(
    SubmitStatus.Idle
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
        text: "Vom răspunde pe acest email",
        color: "bg-blue-500",
        textColor: "text-blue-500",
        baseColor: "blue",
      };
    } else if (focusedField === "phone") {
      return {
        text: "Te vom contacta la acest număr",
        color: "bg-green-500",
        textColor: "text-green-500",
        baseColor: "green",
      };
    } else if (focusedField === "message") {
      return {
        text: "Spune-ne cum te putem ajuta",
        color: "bg-purple-500",
        textColor: "text-purple-500",
        baseColor: "purple",
      };
    }
    return {
      text: "Completează formularul pentru a ne trimite un mesaj",
      color: "bg-primary-500",
      textColor: "text-primary-500",
      baseColor: "primary",
    };
  };

  const highlightInfo = getHighlightInfo();

  return (
    <div className="pt-16 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[rgb(var(--text-primary))]">
            Contactează-ne
          </h1>
          <p className="text-lg text-[rgb(var(--text-secondary))]">
            Suntem aici pentru a răspunde întrebărilor tale și pentru a te ajuta
            să programezi o ședință. Nu ezita să ne contactezi prin oricare
            dintre metodele de mai jos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="bg-[rgb(var(--feature-box-bg))] rounded-2xl shadow-md overflow-hidden border border-[rgb(var(--feature-box-border))] h-full transition-theme">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-[rgb(var(--text-primary))]">
                  Trimite-ne un mesaj
                </h2>

                {submitStatus === SubmitStatus.Success ? (
                  <motion.div
                    className="flex flex-col items-center justify-center py-6 md:py-8 text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="w-16 h-16 md:w-20 md:h-20 bg-green-500 rounded-full flex items-center justify-center mb-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                    >
                      <Mail
                        className="w-8 h-8 md:w-10 md:h-10 text-white"
                        strokeWidth={3}
                      />
                    </motion.div>
                    <h3 className="text-xl md:text-2xl font-bold text-[rgb(var(--text-primary))] mb-2">
                      Mesajul tău a fost trimis cu succes!
                    </h3>
                    <p className="text-[rgb(var(--text-secondary))]">
                      Te vom contacta în curând pentru a răspunde la mesajul
                      tău.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={focusedField}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="mb-3 flex items-center gap-2"
                      >
                        <div
                          className={`${highlightInfo.color} px-3 py-1 rounded-full text-xs text-white`}
                        >
                          {highlightInfo.text}
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-4"
                    >
                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-[rgb(var(--field-label))] mb-1"
                        >
                          Nume și prenume
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
                            className={`w-full pl-10 pr-4 py-2 md:py-3 text-sm rounded-lg bg-white dark:bg-[rgb(var(--card))] text-[rgb(var(--text-primary))] border transition-all duration-300 ${
                              focusedField === "name"
                                ? `border-emerald-400 ring-2 ring-emerald-400/20`
                                : "border-[rgb(var(--border))] hover:border-primary-300"
                            }`}
                            placeholder="Nume și prenume"
                          />
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-[rgb(var(--field-label))] mb-1"
                        >
                          Email
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
                            className={`w-full pl-10 pr-4 py-2 md:py-3 text-sm rounded-lg bg-white dark:bg-[rgb(var(--card))] text-[rgb(var(--text-primary))] border transition-all duration-300 ${
                              focusedField === "email"
                                ? `border-blue-400 ring-2 ring-blue-400/20`
                                : "border-[rgb(var(--border))] hover:border-primary-300"
                            }`}
                            placeholder="email@exemplu.com"
                          />
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-[rgb(var(--field-label))] mb-1"
                        >
                          Telefon
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
                            className={`w-full pl-10 pr-4 py-2 md:py-3 text-sm rounded-lg bg-white dark:bg-[rgb(var(--card))] text-[rgb(var(--text-primary))] border transition-all duration-300 ${
                              focusedField === "phone"
                                ? `border-green-400 ring-2 ring-green-400/20`
                                : "border-[rgb(var(--border))] hover:border-primary-300"
                            }`}
                            placeholder="07xx xxx xxx"
                          />
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-[rgb(var(--field-label))] mb-1"
                        >
                          Mesaj
                        </label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-[rgb(var(--text-tertiary))]" />
                          <textarea
                            id="message"
                            name="message"
                            value={formState.message}
                            onChange={handleInputChange}
                            onFocus={() => handleFocus("message")}
                            onBlur={handleBlur}
                            required
                            className={`w-full pl-10 pr-4 py-2 md:py-3 h-32 text-sm rounded-lg bg-white dark:bg-[rgb(var(--card))] text-[rgb(var(--text-primary))] border transition-all duration-300 resize-none ${
                              focusedField === "message"
                                ? `border-purple-400 ring-2 ring-purple-400/20`
                                : "border-[rgb(var(--border))] hover:border-primary-300"
                            }`}
                            placeholder="Cum te putem ajuta? Scrie-ne detaliile cererii tale..."
                          />
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <button
                          type="submit"
                          disabled={submitStatus === SubmitStatus.Processing}
                          className="bg-[rgb(var(--primary-600))] hover:bg-[rgb(var(--primary-700))] text-white font-medium py-3 px-6 rounded-lg w-full transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          {submitStatus === SubmitStatus.Processing ? (
                            <div className="flex items-center justify-center">
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              <span>Se trimite...</span>
                            </div>
                          ) : (
                            "Trimite mesajul"
                          )}
                        </button>
                      </motion.div>
                    </motion.div>
                  </form>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-[rgb(var(--feature-box-bg))] rounded-2xl shadow-md overflow-hidden border border-[rgb(var(--feature-box-border))] h-full transition-theme">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-[rgb(var(--text-primary))]">
                  Informații de contact
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[rgb(var(--primary-100))] dark:bg-[rgb(var(--primary-800))] flex items-center justify-center mr-4 flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[rgb(var(--primary-600))] dark:text-[rgb(var(--primary-300))]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[rgb(var(--text-primary))]">
                        Adresa noastră
                      </h3>
                      <p className="text-[rgb(var(--text-secondary))]">
                        Str. Antiaeriană 67C, Sector 5, București
                      </p>
                      <div className="mt-2 flex space-x-2">
                        <a
                          href="https://maps.google.com/?q=Str.+Antiaeariană+67C,+București"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1.5 text-sm font-medium bg-[rgb(var(--primary-100))] dark:bg-[rgb(var(--primary-800))] text-[rgb(var(--primary-600))] dark:text-[rgb(var(--primary-300))] rounded-lg hover:bg-[rgb(var(--primary-200))] dark:hover:bg-[rgb(var(--primary-700))] transition-all duration-300"
                        >
                          <MapPin className="w-4 h-4 mr-1.5" />
                          Google Maps
                        </a>
                        <a
                          href="https://www.waze.com/ul?ll=44.410169,26.052140&navigate=yes&zoom=17"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1.5 text-sm font-medium bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-700 transition-all duration-300"
                        >
                          <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12,1.5c-5.8,0-10.5,4.7-10.5,10.5c0,5.1,3.6,9.4,8.5,10.3v-2.1c-3.8-0.9-6.5-4.3-6.5-8.2c0-4.7,3.8-8.5,8.5-8.5 s8.5,3.8,8.5,8.5c0,3.9-2.7,7.3-6.5,8.2v2.1c4.9-0.9,8.5-5.2,8.5-10.3C22.5,6.2,17.8,1.5,12,1.5z M12.7,15.5 c0,0.4-0.3,0.8-0.7,0.8s-0.7-0.3-0.7-0.8V8c0-0.4,0.3-0.7,0.7-0.7s0.7,0.3,0.7,0.7V15.5z M15.5,10.8c0,0.4-0.3,0.7-0.8,0.7 c-0.4,0-0.7-0.3-0.7-0.7V8c0-0.4,0.3-0.7,0.7-0.7c0.4,0,0.8,0.3,0.8,0.7V10.8z M9.2,10.8c0,0.4-0.3,0.7-0.7,0.7 s-0.8-0.3-0.8-0.7V8c0-0.4,0.3-0.7,0.8-0.7s0.7,0.3,0.7,0.7V10.8z"/>
                          </svg>
                          Waze
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[rgb(var(--primary-100))] dark:bg-[rgb(var(--primary-800))] flex items-center justify-center mr-4 flex-shrink-0">
                      <Phone className="w-5 h-5 text-[rgb(var(--primary-600))] dark:text-[rgb(var(--primary-300))]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[rgb(var(--text-primary))]">
                        Telefon
                      </h3>
                      <p className="text-[rgb(var(--text-secondary))]">
                        <a
                          href="tel:0770889907"
                          className="hover:text-[rgb(var(--primary-600))] dark:hover:text-[rgb(var(--primary-300))]"
                        >
                          0770 889 907
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[rgb(var(--primary-100))] dark:bg-[rgb(var(--primary-800))] flex items-center justify-center mr-4 flex-shrink-0">
                      <Mail className="w-5 h-5 text-[rgb(var(--primary-600))] dark:text-[rgb(var(--primary-300))]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[rgb(var(--text-primary))]">
                        Email
                      </h3>
                      <p className="text-[rgb(var(--text-secondary))]">
                        <a
                          href="mailto:office@epiderma.ro"
                          className="hover:text-[rgb(var(--primary-600))] dark:hover:text-[rgb(var(--primary-300))]"
                        >
                          office@siaskincenter.ro
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[rgb(var(--primary-100))] dark:bg-[rgb(var(--primary-800))] flex items-center justify-center mr-4 flex-shrink-0">
                      <Clock className="w-5 h-5 text-[rgb(var(--primary-600))] dark:text-[rgb(var(--primary-300))]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[rgb(var(--text-primary))]">
                        Program
                      </h3>
                      <p className="text-[rgb(var(--text-secondary))]">
                        Luni - Vineri: 10:00 - 20:00
                        <br />
                        Sâmbătă: 10:00 - 16:00
                        <br />
                        Duminică: Închis
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[rgb(var(--primary-100))] dark:bg-[rgb(var(--primary-800))] flex items-center justify-center mr-4 flex-shrink-0">
                      <HelpCircle className="w-5 h-5 text-[rgb(var(--primary-600))] dark:text-[rgb(var(--primary-300))]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[rgb(var(--text-primary))]">
                        Ai întrebări?
                      </h3>
                      <p className="text-[rgb(var(--text-secondary))]">
                        Consultă secțiunea noastră de{" "}
                        <a
                          href="/intrebari-frecvente"
                          className="text-[rgb(var(--primary-600))] dark:text-[rgb(var(--primary-300))] hover:underline"
                        >
                          întrebări frecvente
                        </a>{" "}
                        sau contactează-ne direct și îți vom răspunde cât mai
                        curând posibil.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps Embed */}
        <div className="rounded-2xl overflow-hidden shadow-md border border-[rgb(var(--feature-box-border))] transition-theme">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4245.492271272217!2d26.052140277282664!3d44.410169171076376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ffe1ea1d6937%3A0xa6073995b61cf68c!2sSIA%20SkinCenter-%20Epilare%20definitiva%20laser!5e1!3m2!1sen!2sro!4v1743038486618!5m2!1sen!2sro"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            title="SIA Skin Center Location Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactFormReact;
