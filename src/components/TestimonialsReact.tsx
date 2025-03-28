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
  },
  {
    id: "review2",
    author: "Alexandra Mihai",
    authorInitials: "AM",
    rating: 5,
    text: "Sunt foarte mulțumită de rezultatele obținute! Personalul este foarte prietenos și profesionist! Aparatul nou achiziționat face ca procedura să fie nedureroasă. Recomand cu drag!",
    avatarColor: "from-purple-400 to-purple-600",
  },
  {
    id: "review3",
    author: "Anamaria Ionita",
    authorInitials: "AI",
    rating: 5,
    text: "Locație foarte curată. Personalul foarte amabil. Am primit sfaturi bune în legătură cu ingrijirea pielii și sunt foarte încântată de rezultate. Cu siguranță voi reveni!",
    avatarColor: "from-emerald-400 to-emerald-600",
  },
  {
    id: "review4",
    author: "Ioana Crucianu",
    authorInitials: "IC",
    rating: 5,
    text: "O echipă super! Recomand cu toată încrederea și siguranța. Rezultate vizibile după prima ședință, iar pielea nu a suferit deloc de la prima ședință. Totul într-o atmosferă relaxantă. Bravo!",
    avatarColor: "from-amber-400 to-amber-600",
  },
  {
    id: "review5",
    author: "Monica Ivan",
    authorInitials: "MI",
    rating: 5,
    text: "Cea mai bună alegere! Și ca rezultate și ca preț. Recomand cu toată încrederea.",
    avatarColor: "from-rose-400 to-rose-600",
  },
  {
    id: "review6",
    author: "Silvia Trandafir",
    authorInitials: "ST",
    rating: 5,
    text: "Super încântată de rezultatele epilarii definitive cu laser! Personalul foarte amabil și atmosfera plăcută, poți alege tipul de muzica, totul este super relaxant! Va recomand cu toată încrederea!",
    avatarColor: "from-sky-400 to-sky-600",
  },
  {
    id: "review7",
    author: "Diana Costin",
    authorInitials: "DC",
    rating: 5,
    text: "De departe cel mai bun centru de epilare! Am avut parte de o experienta placuta, chiar daca ma asteptam sa ma doara, nu am simtit mai nimic. Sunt foarte multumita! Recomand cu incredere!",
    avatarColor: "from-indigo-400 to-indigo-600",
  },
];

// Link direct către recenziile Google Maps exact cum a fost furnizat
const googleReviewsLink =
  "https://www.google.com/maps/place/SIA+SkinCenter-+Epilare+definitiva+laser/@44.4101841,26.0444155,15z/data=!4m8!3m7!1s0x40b1ffe1ea1d6937:0xa6073995b61cf68c!8m2!3d44.4101692!4d26.0547152!9m1!1b1!16s%2Fg%2F11y38__rcq?entry=ttu&g_ep=EgoyMDI1MDMyNC4wIKXMDSoJLDEwMjExNjQwSAFQAw%3D%3D";

const TestimonialsReact: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState<number | null>(null);

  // Calculate visible reviews - flat array, way simpler
  const getVisibleReviews = () => {
    if (typeof window === "undefined") return googleReviews.slice(0, 3);

    if (window.innerWidth >= 1280) {
      return googleReviews.slice(activeIndex, activeIndex + 3).length === 3
        ? googleReviews.slice(activeIndex, activeIndex + 3)
        : [
            ...googleReviews.slice(activeIndex),
            ...googleReviews.slice(0, 3 - (googleReviews.length - activeIndex)),
          ];
    }

    if (window.innerWidth >= 768) {
      return googleReviews.slice(activeIndex, activeIndex + 2).length === 2
        ? googleReviews.slice(activeIndex, activeIndex + 2)
        : [
            ...googleReviews.slice(activeIndex),
            ...googleReviews.slice(0, 2 - (googleReviews.length - activeIndex)),
          ];
    }

    return [googleReviews[activeIndex]];
  };

  // Simple prev/next navigation
  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? googleReviews.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === googleReviews.length - 1 ? 0 : prev + 1
    );
  };

  const selectReview = (index: number) => {
    setActiveIndex(index);
  };

  // Render visible reviews
  const visibleReviews = getVisibleReviews();

  return (
    <section className="py-16 bg-[rgb(var(--background))] transition-theme">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[rgb(var(--text-primary))]">
            Ce spun clienții noștri
          </h2>
          <p className="text-lg text-[rgb(var(--text-secondary))] mb-6">
            Avem sute de clienți mulțumiți care ne recomandă serviciile.
          </p>

          {/* Google Review Rating */}
          <div className="flex items-center justify-center mt-4 mb-10">
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
                className="inline-flex items-center ml-2 text-[rgb(var(--primary-600))] hover:text-[rgb(var(--primary-700))]"
                aria-label="Vezi recenziile noastre pe Google Maps"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Simple grid layout instead of a complex carousel */}
        <div className="relative px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleReviews.map((review, index) => (
              <div
                key={review.id}
                className="bg-[rgb(var(--card))] rounded-xl shadow-md transition-all duration-300 relative hover:shadow-xl border border-[rgb(var(--feature-box-border))]/50 flex flex-col h-full"
                onMouseEnter={() => setIsHovering(index)}
                onMouseLeave={() => setIsHovering(null)}
              >
                <div className="p-4 sm:p-6 flex-1 flex flex-col">
                  {/* Rating Stars */}
                  <div className="flex items-center mb-4 justify-between">
                    <div className="flex text-yellow-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400" />
                      ))}
                    </div>
                  </div>

                  {/* Review Text */}
                  <div className="mb-6 flex-1">
                    <h3 className="sr-only">Recenzie de la {review.author}</h3>
                    <p className="text-[rgb(var(--text-secondary))] italic line-clamp-5">
                      "{review.text}"
                    </p>
                  </div>

                  {/* Author Info - Simplified without problematic images */}
                  <div className="flex items-center">
                    <div className="relative w-12 h-12 mr-3">
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${review.avatarColor} flex items-center justify-center text-white font-bold shadow-md`}
                      >
                        {review.authorInitials}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-[rgb(var(--text-primary))]">
                        {review.author}
                      </div>
                      <div className="flex items-center text-xs text-[rgb(var(--text-secondary))]">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>Google Review</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div
                  className={`absolute inset-0 bg-[rgb(var(--primary-600))]/30 rounded-xl opacity-0 transition-opacity duration-300 flex items-end justify-center p-6 z-10 ${
                    isHovering === index ? "opacity-100" : ""
                  }`}
                >
                  <a
                    href={googleReviewsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-medium bg-[rgb(var(--primary-600))]/70 px-4 py-2 rounded-full hover:bg-[rgb(var(--primary-600))]/80 transition-all duration-300"
                    aria-label="Vezi toate recenziile noastre pe Google Maps"
                  >
                    Vezi toate recenziile
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Simple Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:translate-x-0 bg-white dark:bg-[rgb(var(--card))] p-2 rounded-full shadow-lg text-[rgb(var(--text-primary))]  z-20 hover:scale-110 transition-transform"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-0 bg-white dark:bg-[rgb(var(--card))] p-2 rounded-full shadow-lg text-[rgb(var(--text-primary))] z-20 hover:scale-110 transition-transform"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Simple Dots Navigation - Made bigger for better touch targets */}
        <div className="flex justify-center mt-8 space-x-3">
          {googleReviews.map((_, index) => (
            <button
              key={index}
              onClick={() => selectReview(index)}
              className={`w-6 h-6 rounded-full transition-colors flex items-center justify-center touch-manipulation ${
                index === activeIndex
                  ? "bg-[rgb(var(--primary-600))]"
                  : "bg-[rgb(var(--primary-300))]"
              }`}
              aria-label={`Go to review ${index + 1}`}
            >
              <span className="sr-only">Review {index + 1}</span>
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <a
            href="/contact"
            className="inline-flex items-center bg-[rgb(var(--primary-600))] text-white font-medium px-6 py-3 rounded-full hover:bg-[rgb(var(--primary-700))] transition-colors"
          >
            <span>Programează o consultație</span>
            <ChevronRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsReact;
