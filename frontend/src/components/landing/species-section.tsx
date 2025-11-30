import { Parallax } from "react-scroll-parallax";
import { getAnimalConfig } from "@/lib/constants/animals";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export const SpeciesSection = () => {
  const ANIMAL_CONFIG = getAnimalConfig();
  const species = Object.entries(ANIMAL_CONFIG);
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Parallax speed={-5} className="absolute top-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 200"
            className="w-full h-24 md:h-32 opacity-10"
            preserveAspectRatio="none"
          >
            <path
              fill="currentColor"
              className="text-primary"
              d="M0,64 C288,120 576,40 864,80 C1152,120 1296,60 1440,80 L1440,0 L0,0 Z"
            />
          </svg>
        </Parallax>

        {/* Floating paw prints */}
        <Parallax
          speed={-12}
          rotate={[-10, 10]}
          className="absolute top-20 left-8 md:left-16"
        >
          <div className="text-4xl md:text-6xl opacity-10">🐾</div>
        </Parallax>
        <Parallax
          speed={-8}
          rotate={[10, -10]}
          className="absolute top-32 right-12 md:right-24"
        >
          <div className="text-3xl md:text-5xl opacity-10">🐾</div>
        </Parallax>
        <Parallax
          speed={-15}
          rotate={[-5, 15]}
          className="absolute bottom-24 left-1/4 hidden md:block"
        >
          <div className="text-5xl opacity-10">🐾</div>
        </Parallax>
        <Parallax
          speed={-10}
          rotate={[5, -5]}
          className="absolute bottom-16 right-1/3"
        >
          <div className="text-4xl md:text-6xl opacity-10">🐾</div>
        </Parallax>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <Parallax speed={3}>
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              {t("speciesSupportAllPets")}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              {t("speciesFromDogsToFish")}
            </p>
          </div>
        </Parallax>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:flex-wrap lg:justify-center gap-3 md:gap-4 lg:gap-6">
          {species.map(([key, config], index) => (
            <Parallax
              key={key}
              speed={1 + index * 0.2}
              translateY={[20, -20]}
              scale={[0.9, 1.05]}
            >
              <div
                className={cn(
                  "flex flex-col items-center gap-1 md:gap-2 p-3 md:p-6 rounded-2xl md:rounded-3xl border-2 transition-all duration-300 hover:scale-110 hover:shadow-xl cursor-default group",
                  config.bgClass,
                  config.borderClass
                )}
              >
                <span className="text-3xl md:text-5xl group-hover:animate-bounce transition-all">
                  {config.emoji}
                </span>
                <span className="font-medium text-foreground text-sm md:text-base">
                  {config.label}
                </span>
                <span className="text-lg md:text-2xl opacity-50 group-hover:opacity-100 transition-opacity">
                  {config.decoration}
                </span>
              </div>
            </Parallax>
          ))}
        </div>
      </div>
    </section>
  );
};
