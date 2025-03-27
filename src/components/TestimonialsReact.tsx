import React, { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

interface Review {
  id: string;
  author: string;
  authorInitials: string;
  rating: number;
  text: string;
  avatarColor: string;
  avatarUrl?: string;
  date?: string;
}

// Recenzii cu avatare și culori de backup
const googleReviews: Review[] = [
  {
    id: "review1",
    author: "Bolocan Andreea",
    authorInitials: "BA",
    rating: 5,
    text: "Echipa SIA a reușit să mă surprindă plăcut. M-am simțit foarte bine la fiecare sesiune de epilare iar rezultatele au fost remarcabile. Personal profesionist și foarte amabil. Recomand cu încredere!",
    avatarColor: "from-pink-400 to-pink-600",
    avatarUrl:
      "https://lh3.googleusercontent.com/a-/ALV-UjWEuNs3lCc94K_C7wCRs0yHSvbYGS90xQzQNVEjq1QCzLU=w60-h60-p-rp-mo-br100",
  },
  {
    id: "review2",
    author: "Alexandra Mihai",
    authorInitials: "AM",
    rating: 5,
    text: "Sunt foarte mulțumită de rezultatele obținute! Personalul este foarte prietenos și profesionist! Aparatul nou achiziționat face ca procedura să fie nedureroasă. Recomand cu drag!",
    avatarColor: "from-purple-400 to-purple-600",
    avatarUrl:
      "https://lh3.googleusercontent.com/a-/ALV-UjXsipnVIW7q6wX6GJZ1SDXVdSNJJqj5QTXXSXs18VEoIXg=w60-h60-p-rp-mo-br100",
  },
  {
    id: "review3",
    author: "Anamaria Ionita",
    authorInitials: "AI",
    rating: 5,
    text: "Locație foarte curată. Personalul foarte amabil. Am primit sfaturi bune în legătură cu ingrijirea pielii și sunt foarte încântată de rezultate. Cu siguranță voi reveni!",
    avatarColor: "from-emerald-400 to-emerald-600",
    avatarUrl:
      "https://lh3.googleusercontent.com/a-/ALV-UjXnk5IQOKUmmf2hOVZBBMFYVnNx76tnPCqRc6Y9qMfNyQ=w60-h60-p-rp-mo-br100",
  },
  {
    id: "review4",
    author: "Ioana Crucianu",
    authorInitials: "IC",
    rating: 5,
    text: "O echipă super! Recomand cu toată încrederea și siguranța. Rezultate vizibile după prima ședință, iar pielea nu a suferit deloc de la prima ședință. Totul într-o atmosferă relaxantă. Bravo!",
    avatarColor: "from-amber-400 to-amber-600",
    avatarUrl:
      "https://lh3.googleusercontent.com/a-/ALV-UjXkDnYJbLIKT2p3JpWp1Zk1hc5y2vlDQMxzOK9qsf-mSg=w60-h60-p-rp-mo-br100",
  },
  {
    id: "review5",
    author: "Monica Ivan",
    authorInitials: "MI",
    rating: 5,
    text: "Cea mai bună alegere! Și ca rezultate și ca preț. Recomand cu toată încrederea.",
    avatarColor: "from-rose-400 to-rose-600",
    avatarUrl:
      "https://lh3.googleusercontent.com/a-/ALV-UjVDUDrScGUfGNJZR9T7aFKvgTc0mIFMJNyALuLEi7vQPw=w60-h60-p-rp-mo-br100",
  },
  {
    id: "review6",
    author: "Silvia Trandafir",
    authorInitials: "ST",
    rating: 5,
    text: "Super încântată de rezultatele epilarii definitive cu laser! Personalul foarte amabil și atmosfera plăcută, poți alege tipul de muzica, totul este super relaxant! Va recomand cu toată încrederea!",
    avatarColor: "from-sky-400 to-sky-600",
    avatarUrl:
      "https://lh3.googleusercontent.com/a-/ALV-UjUWNl5KwkrfKCr5TL9kJuUOlJUfrAQUQZrJUwDpU-E_9w=w60-h60-p-rp-mo-br100",
  },
  {
    id: "review7",
    author: "Diana Costin",
    authorInitials: "DC",
    rating: 5,
    text: "De departe cel mai bun centru de epilare! Am avut parte de o experienta placuta, chiar daca ma asteptam sa ma doara, nu am simtit mai nimic. Sunt foarte multumita! Recomand cu incredere!",
    avatarColor: "from-indigo-400 to-indigo-600",
    avatarUrl:
      "https://lh3.googleusercontent.com/a-/ALV-UjXIXbpNgVQJCrQvdD0FVNM41DLHprJ-nW1KrRzc-FwGIR8=w60-h60-p-rp-mo-br100",
  },
  {
    id: "review8",
    author: "Anamaria Barbu",
    authorInitials: "AB",
    rating: 5,
    text: "Recomand cu încredere! Sunt foarte mulțumită de serviciile oferite și de personal, foarte amabil! 😊",
    avatarColor: "from-fuchsia-400 to-fuchsia-600",
    avatarUrl:
      "https://lh3.googleusercontent.com/a-/ALV-UjWpq9FWUjUdHcMOJk14ZQfYH41Fta0WnOpSiYzDYgUd35s=w60-h60-p-rp-mo-br100",
  },
  {
    id: "review9",
    author: "Magda Iacob",
    authorInitials: "MI",
    rating: 5,
    text: "Recomand cu încredere, personal profesionist, sunt foarte mulțumită de rezultatul obținut! Vor rămâne prima mea alegere în viitor.",
    avatarColor: "from-teal-400 to-teal-600",
    avatarUrl:
      "https://lh3.googleusercontent.com/a-/ALV-UjULzA_R2S9L0Zt2qgMaM1YOClKE2E-aNRV1zCZTfA8d-X0=w60-h60-p-rp-mo-br100",
  },
];

// Link direct către recenziile Google Maps exact cum a fost furnizat
const googleReviewsLink =
  "https://www.google.com/maps/place/SIA+SkinCenter-+Epilare+definitiva+laser/@44.4101841,26.0444155,15z/data=!4m8!3m7!1s0x40b1ffe1ea1d6937:0xa6073995b61cf68c!8m2!3d44.4101692!4d26.0547152!9m1!1b1!16s%2Fg%2F11y38__rcq?entry=ttu&g_ep=EgoyMDI1MDMyNC4wIKXMDSoJLDEwMjExNjQwSAFQAw%3D%3D";

const TestimonialsReact: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleReviews, setVisibleReviews] = useState<Review[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const [isHovering, setIsHovering] = useState<number | null>(null);

  const getVisibleCount = () => {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth >= 1280) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  useEffect(() => {
    const handleResize = () => {
      updateVisibleReviews(activeIndex);
    };

    const updateVisibleReviews = (index: number) => {
      const count = getVisibleCount();
      const visibleItems: Review[] = [];

      for (let i = 0; i < count; i++) {
        const reviewIndex = (index + i) % googleReviews.length;
        visibleItems.push(googleReviews[reviewIndex]);
      }

      setVisibleReviews(visibleItems);
    };

    updateVisibleReviews(activeIndex);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeIndex]);

  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        handleNext();
      }, 5000);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay, activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? googleReviews.length - 1 : prev - 1
    );
    if (autoplay) {
      setAutoplay(false);
      setTimeout(() => setAutoplay(true), 10000);
    }
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === googleReviews.length - 1 ? 0 : prev + 1
    );
    if (autoplay) {
      setAutoplay(false);
      setTimeout(() => setAutoplay(true), 10000);
    }
  };

  const selectReview = (index: number) => {
    setActiveIndex(index);
    if (autoplay) {
      setAutoplay(false);
      setTimeout(() => setAutoplay(true), 10000);
    }
  };

  // Funcție pentru a gestiona erorile de încărcare a imaginilor
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    // Ascunde imaginea și arată inițialele în loc
    const imgElement = e.currentTarget;
    const fallbackElement = imgElement.nextElementSibling as HTMLElement | null;

    if (imgElement && fallbackElement) {
      imgElement.style.display = "none";
      fallbackElement.style.display = "flex";
    }
  };

  return (
    <section className="py-20 relative overflow-hidden bg-[rgb(var(--background))] transition-theme">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[rgb(var(--primary-50))] to-transparent dark:from-[rgb(var(--primary-950))]/10 dark:to-transparent opacity-70"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-[rgb(var(--primary-200))]/20 to-[rgb(var(--primary-300))]/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-blue-200/20 to-purple-300/10 dark:from-blue-900/20 dark:to-purple-800/10 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[rgb(var(--text-primary))]">
            Ce spun clienții noștri
          </h2>
          <p className="text-lg text-[rgb(var(--text-secondary))]">
            Avem sute de clienți mulțumiți care ne recomandă serviciile. Iată ce
            spun aceștia despre experiența lor la SIA Skin Center.
          </p>
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex items-center">
            <div className="flex items-center space-x-1">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="font-bold text-[rgb(var(--text-primary))]">
                5.0
              </span>
            </div>
            <span className="mx-2 text-[rgb(var(--text-secondary))]">•</span>
            <div className="flex items-center">
              <span className="text-[rgb(var(--text-secondary))]">
                Google Reviews
              </span>
              <a
                href={googleReviewsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center ml-1 text-[rgb(var(--primary-600))] hover:text-[rgb(var(--primary-700))]"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        <div
          className="relative mx-auto overflow-hidden group"
          ref={containerRef}
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {visibleReviews.map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                className="bg-[rgb(var(--feature-box-bg))] rounded-xl shadow-lg border border-[rgb(var(--feature-box-border))] transition-all duration-500 hover:shadow-xl transform hover:-translate-y-1"
                style={{
                  opacity: 1,
                  transform: `translateY(0px) scale(${index === 1 && getVisibleCount() > 1 ? "1.02" : "1"})`,
                }}
                onMouseEnter={() => setIsHovering(index)}
                onMouseLeave={() => setIsHovering(null)}
              >
                <div className="p-8">
                  {/* Rating Stars */}
                  <div className="flex items-center mb-4 justify-between">
                    <div className="flex text-yellow-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400" />
                      ))}
                    </div>
                    {review.date && (
                      <span className="text-xs text-[rgb(var(--text-secondary))]">
                        {review.date}
                      </span>
                    )}
                  </div>

                  {/* Review Text */}
                  <div className="min-h-[120px] mb-6">
                    <p className="text-[rgb(var(--text-secondary))] italic relative">
                      <span className="text-[rgb(var(--primary-300))] text-4xl absolute -top-4 -left-2 opacity-20">
                        "
                      </span>
                      {review.text}
                      <span className="text-[rgb(var(--primary-300))] text-4xl absolute -bottom-8 -right-2 opacity-20">
                        "
                      </span>
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center">
                    <div className="relative w-12 h-12 mr-3">
                      {review.avatarUrl && (
                        <img
                          src={review.avatarUrl}
                          alt={review.author}
                          className="w-12 h-12 rounded-full mr-3 shadow-md object-cover border-2 border-[rgb(var(--primary-200))] absolute top-0 left-0"
                          onError={handleImageError}
                        />
                      )}
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${review.avatarColor} flex items-center justify-center text-white font-bold shadow-md ${review.avatarUrl ? "hidden" : ""}`}
                      >
                        {review.authorInitials}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[rgb(var(--text-primary))]">
                        {review.author}
                      </h4>
                      <div className="flex items-center text-xs text-[rgb(var(--text-secondary))]">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>Google Review</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-[rgb(var(--primary-600))]/80 to-transparent rounded-xl opacity-0 transition-opacity duration-300 flex items-end justify-center p-6 ${isHovering === index ? "opacity-100" : ""}`}
                >
                  <a
                    href={googleReviewsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-medium bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/30 transition-all duration-300"
                  >
                    Vezi toate recenziile
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:translate-x-0 bg-white dark:bg-[rgb(var(--card))] p-2 rounded-full shadow-lg border border-[rgb(var(--feature-box-border))] text-[rgb(var(--text-primary))] opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary-400))] z-10"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-0 bg-white dark:bg-[rgb(var(--card))] p-2 rounded-full shadow-lg border border-[rgb(var(--feature-box-border))] text-[rgb(var(--text-primary))] opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary-400))] z-10"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-10 space-x-2">
          {googleReviews.map((_, index) => (
            <button
              key={index}
              onClick={() => selectReview(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                index === activeIndex ||
                index === (activeIndex + 1) % googleReviews.length ||
                (index === (activeIndex + 2) % googleReviews.length &&
                  getVisibleCount() > 2)
                  ? "bg-[rgb(var(--primary-600))] w-8"
                  : "bg-[rgb(var(--primary-300))]"
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/contact"
            className="group inline-flex items-center bg-gradient-to-r from-[rgb(var(--primary-600))] to-[rgb(var(--primary-700))] hover:from-[rgb(var(--primary-500))] hover:to-[rgb(var(--primary-600))] text-white font-medium px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            <span>Programează o consultație</span>
            <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsReact;
