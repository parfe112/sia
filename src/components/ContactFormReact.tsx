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
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-primary-700">
            Contactează-ne
          </h1>
          <p className="text-lg text-gray-700">
            Suntem aici pentru a răspunde întrebărilor tale și pentru a te ajuta
            să programezi o ședință. Nu ezita să ne contactezi prin oricare
            dintre metodele de mai jos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 h-full">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-primary-700">
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
                    <h3 className="text-xl md:text-2xl font-bold text-primary-800 mb-2">
                      Mesajul tău a fost trimis cu succes!
                    </h3>
                    <p className="text-gray-600">
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
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Nume și prenume
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleInputChange}
                            onFocus={() => handleFocus("name")}
                            onBlur={handleBlur}
                            required
                            className={`w-full pl-10 pr-4 py-2 md:py-3 text-sm rounded-lg border transition-all duration-300 ${
                              focusedField === "name"
                                ? `border-emerald-400 ring-2 ring-emerald-400/20`
                                : "border-gray-300 hover:border-primary-300"
                            }`}
                            placeholder="Nume și prenume"
                          />
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={handleInputChange}
                            onFocus={() => handleFocus("email")}
                            onBlur={handleBlur}
                            required
                            className={`w-full pl-10 pr-4 py-2 md:py-3 text-sm rounded-lg border transition-all duration-300 ${
                              focusedField === "email"
                                ? `border-blue-400 ring-2 ring-blue-400/20`
                                : "border-gray-300 hover:border-primary-300"
                            }`}
                            placeholder="email@exemplu.com"
                          />
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Telefon
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formState.phone}
                            onChange={handleInputChange}
                            onFocus={() => handleFocus("phone")}
                            onBlur={handleBlur}
                            required
                            className={`w-full pl-10 pr-4 py-2 md:py-3 text-sm rounded-lg border transition-all duration-300 ${
                              focusedField === "phone"
                                ? `border-green-400 ring-2 ring-green-400/20`
                                : "border-gray-300 hover:border-primary-300"
                            }`}
                            placeholder="07xx xxx xxx"
                          />
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Mesaj
                        </label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                          <textarea
                            id="message"
                            name="message"
                            value={formState.message}
                            onChange={handleInputChange}
                            onFocus={() => handleFocus("message")}
                            onBlur={handleBlur}
                            required
                            rows={5}
                            className={`w-full pl-10 pr-4 py-2 md:py-3 text-sm rounded-lg border transition-all duration-300 ${
                              focusedField === "message"
                                ? `border-purple-400 ring-2 ring-purple-400/20`
                                : "border-gray-300 hover:border-primary-300"
                            }`}
                            placeholder="Scrie mesajul tău aici..."
                          />
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants} className="pt-4">
                        <motion.button
                          type="submit"
                          disabled={submitStatus === SubmitStatus.Processing}
                          className={`w-full ${highlightInfo.color} hover:opacity-90 text-white font-bold py-3 md:py-4 px-4 md:px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl text-sm md:text-base uppercase tracking-wide`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {submitStatus === SubmitStatus.Processing ? (
                            <div className="flex items-center justify-center">
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              <span>Se trimite...</span>
                            </div>
                          ) : (
                            <span>TRIMITE MESAJ</span>
                          )}
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  </form>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 h-full">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-primary-700">
                  Informații de Contact
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-primary-100 p-2 rounded-full mr-4 mt-1">
                      <MapPin className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Adresă</h3>
                      <p className="text-gray-600">
                        Str. Antiaeriană nr 67, sector 5, București
                      </p>
                      <p className="text-gray-600 mt-1">
                        <span className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-primary-600 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                          Locație cu parcare privată
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary-100 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">Telefon</h3>
                      <p className="text-gray-600">0770889907</p>
                      <a
                        href="https://wa.me/40770889907"
                        target="_blank"
                        className="inline-flex items-center mt-2 text-white bg-green-500 hover:bg-green-600 transition-colors px-4 py-2 rounded-full"
                      >
                        <svg
                          fill="currentColor"
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
                        </svg>
                        Trimite mesaj WhatsApp
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary-100 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">Email</h3>
                      <p className="text-gray-600">contact@siaskincenter.ro</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary-100 p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">Program</h3>
                      <p className="text-gray-600">
                        Luni - Vineri: 10:00 - 20:00
                      </p>
                      <p className="text-gray-600">
                        Sâmbătă - Duminică: 09:00 - 16:00
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary-100 p-3 rounded-full mr-4">
                      <HelpCircle className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">
                        Întrebări frecvente
                      </h3>
                      <p className="text-gray-600">
                        Consultă{" "}
                        <a
                          href="#"
                          className="text-primary-600 hover:text-primary-700"
                        >
                          FAQ
                        </a>{" "}
                        pentru răspunsuri la întrebările frecvente
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="font-bold text-gray-800 mb-4">Urmărește-ne</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.facebook.com/profile.php?id=61554965023675"
                      target="_blank"
                      className="bg-[#1877F2] p-3 rounded-full hover:bg-[#0e66da] transition-colors"
                    >
                      <svg
                        fill="currentColor"
                        className="h-6 w-6 text-white"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"></path>
                      </svg>
                    </a>

                    <a
                      href="https://www.instagram.com/sia_epilare_definitiva/"
                      target="_blank"
                      className="bg-gradient-to-r from-[#FCAF45] via-[#E1306C] to-[#5851DB] p-3 rounded-full hover:opacity-90 transition-opacity"
                    >
                      <svg
                        fill="currentColor"
                        className="h-6 w-6 text-white"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path>
                      </svg>
                    </a>

                    <a
                      href="https://www.tiktok.com/@sia.skin.center"
                      target="_blank"
                      className="bg-black p-3 rounded-full hover:bg-gray-900 transition-colors"
                    >
                      <svg
                        fill="currentColor"
                        className="h-6 w-6 text-white"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-primary-700">Locație</h2>
          </div>
          <div className="h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2849.824092859807!2d26.0601422!3d44.4043082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b201bde6f54af1%3A0x1c05f1a74aece96!2sStrada%20Antiaerian%C4%83%2067%2C%20Bucure%C8%99ti!5e0!3m2!1sro!2sro!4v1683549826867!5m2!1sro!2sro"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactFormReact;
