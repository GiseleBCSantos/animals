import { Parallax } from "react-scroll-parallax";
import { Button } from "@/components/ui/button";
import { ArrowRight, PawPrint, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { ParallaxScene } from "./parallax-scene";
import { useTranslation } from "react-i18next";

export function HeroSection() {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      <ParallaxScene />

      <div className="container px-4 md:px-6 relative z-10 overflow-hidden">
        <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
          <Parallax speed={0}>
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm text-primary px-3 md:px-4 py-2 rounded-full shadow-lg">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs md:text-sm font-medium">
                {t("heroBestPlatform")}
              </span>
            </div>
          </Parallax>

          <Parallax speed={5}>
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-2xl">
              <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-foreground max-w-4xl text-balance leading-tight">
                {t("heroTakeCareOfYour")}{" "}
                <span className="text-primary relative inline-block">
                  {t("heroPets")}
                  <PawPrint className="absolute -top-2 -right-5 md:-top-4 md:-right-8 h-5 w-5 md:h-8 md:w-8 text-primary/50 rotate-12" />
                </span>{" "}
                {t("heroWithAllThe")}{" "}
                <span className="text-accent relative inline-flex items-center">
                  {t("heroAffection")}
                  <Heart className="ml-1 md:ml-2 h-5 w-5 md:h-8 md:w-8 fill-accent text-accent" />
                </span>
              </h1>
            </div>
          </Parallax>

          <Parallax speed={2}>
            <p className="text-base md:text-lg lg:text-xl text-foreground/80 max-w-2xl text-pretty px-4 bg-white/70 backdrop-blur-sm rounded-2xl py-4">
              {t("heroManageAllYourPets")}
            </p>
          </Parallax>

          <Parallax speed={1}>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-4 w-full px-4 sm:w-auto sm:px-0">
              <Link to="/register" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 h-12 md:h-14 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                >
                  {t("heroGetStarted")}
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </Link>
              <Link to="/login" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 h-12 md:h-14 rounded-2xl bg-white/90 backdrop-blur-sm "
                >
                  {t("heroAlreadyHaveAccount")}
                </Button>
              </Link>
            </div>
          </Parallax>

          <Parallax speed={0} className="mt-8 md:mt-12 w-full px-4">
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 bg-white/80 backdrop-blur-sm rounded-2xl py-4 px-6 shadow-lg">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-foreground">
                  10k+
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  {t("heroRegisteredPets")}
                </div>
              </div>
              <div className="h-8 md:h-12 w-px bg-border" />
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-foreground">
                  5k+
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  {t("heroHappyOwners")}
                </div>
              </div>
              <div className="h-8 md:h-12 w-px bg-border" />
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-foreground">
                  9+
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  {t("heroSpecies")}
                </div>
              </div>
            </div>
          </Parallax>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-muted/30 to-transparent z-20" />
    </section>
  );
}
