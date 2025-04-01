import { motion } from "framer-motion";

interface ButtonAdvertProps {
  href?: string;
  mainText?: string;
  subText?: string;
  discountAmount?: string;
  limitedText?: string;
  target?: string;
  onClick?: () => void;
}

export default function ButtonAdvert({
  href = "/landing/pachet-4-1",
  mainText = "REZERVĂ ACUM",
  subText = "La 4 ședințe primești 1 ședință gratuit ✅",
  discountAmount = "20%",
  limitedText = "Ofertă limitată • Locuri limitate",
  target = "_self",
  onClick,
}: ButtonAdvertProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div className="relative max-w-md w-full" style={{ marginBottom: "18px" }}>
      {/* Rotating gradient border - with animation */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div className="rotating-border absolute inset-[-2px] rounded-2xl z-0"></div>
      </div>

      <motion.a
        href={href}
        target={target}
        onClick={handleClick}
        className="relative z-10 group flex items-center justify-between bg-[rgb(var(--primary-100))] hover:bg-[rgb(var(--primary-200))] dark:bg-amber-300 dark:hover:bg-amber-200 text-[rgb(var(--primary-900))] dark:text-gray-900 font-bold px-6 py-5 rounded-2xl text-lg md:text-xl transition-colors duration-300 shadow-lg hover:shadow-xl overflow-hidden w-full"
        whileHover={{
          y: -5,
          boxShadow: "0 10px 25px rgba(var(--primary-500), 0.4)",
          transition: {
            y: { type: "spring", stiffness: 300, damping: 20 },
            boxShadow: { duration: 0.3 },
          },
        }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{ margin: "3px" }}
      >
        {/* Inner content */}
        <div className="flex flex-col items-start">
          <div className="flex items-center">
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2 text-[rgb(var(--primary-900))] dark:text-gray-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ rotate: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              ></path>
            </motion.svg>

            <motion.span
              className="ml-4 tracking-wide relative overflow-hidden dark:text-gray-900"
              initial={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              {mainText}

              {/* Improved Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut",
                }}
              />
            </motion.span>
          </div>
          <span className="text-[rgb(var(--primary-900))]/80 dark:text-gray-900/90 text-sm font-normal mt-1">
            {subText}
          </span>
        </div>

        <div className="relative flex items-center">
          <motion.div
            className="sticky transform"
            animate={{
              rotate: [12, 8, 12],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            whileHover={{
              rotate: 0,
              scale: 1.1,
              transition: { duration: 0.2 },
            }}
          >
            <motion.div
              className="-right-6 -top-8 bg-gradient-to-br from-yellow-400 to-yellow-500 dark:from-green-500 dark:to-green-600 text-black font-bold px-3 py-5 rounded-full flex flex-col items-center justify-center h-14 w-14 shadow-md border-2 border-yellow-300 dark:border-green-400 dark:text-white"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-xl leading-none">{discountAmount}</span>
              <span className="text-xs uppercase tracking-wider">OFF</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Sparkle effects */}
        <EnhancedSparkleEffect />
      </motion.a>

      {/* Fixed position for limited text - separate from button hover */}
      {limitedText && (
        <div className="absolute bottom-0 right-0 left-0 text-center transform translate-y-1/2 z-20">
          <motion.span
            className="inline-block bg-[rgb(var(--primary-600))]/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm"
            animate={{
              y: [0, -2, 0],
              boxShadow: [
                "0 2px 4px rgba(0,0,0,0.1)",
                "0 4px 8px rgba(0,0,0,0.2)",
                "0 2px 4px rgba(0,0,0,0.1)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            {limitedText}
          </motion.span>
        </div>
      )}

      <style>
        {`
        .rotating-border {
          background: conic-gradient(
            from 0deg,
            #fbbf24, /* yellow-400 */
            rgb(var(--primary-500)),
            #fbbf24, /* yellow-400 */
            rgb(var(--primary-500)),
            #fbbf24 /* yellow-400 */
          );
          animation: rotate-border 4s linear infinite;
        }
        
        .dark .rotating-border {
          background: conic-gradient(
            from 0deg,
            #fcd34d, /* yellow-300 */
            #10b981, /* green-500 */
            #fcd34d, /* yellow-300 */
            #10b981, /* green-500 */
            #fcd34d /* yellow-300 */
          );
          animation: rotate-border 4s linear infinite;
        }
        
        @keyframes rotate-border {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        `}
      </style>
    </div>
  );
}

// Componenta pentru efectul de scânteie îmbunătățit
function EnhancedSparkleEffect() {
  // Definire variante pentru animațiile scânteilor
  const sparkleVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
    },
  };

  // Generăm scântei cu proprietăți variate
  const sparkles = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: 3 + Math.random() * 5,
    delay: Math.random() * 5,
    duration: 1.5 + Math.random() * 2,
    color:
      i % 3 === 0
        ? "var(--primary-300)"
        : i % 3 === 1
          ? "var(--primary-400)"
          : "var(--primary-500)",
  }));

  return (
    <>
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: sparkle.top,
            left: sparkle.left,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            backgroundColor: `rgb(${sparkle.color})`,
            boxShadow: `0 0 ${sparkle.size * 2}px 1px rgb(${sparkle.color})`,
            zIndex: 5,
          }}
          variants={sparkleVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            repeatDelay: sparkle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}
