import { Parallax } from "react-scroll-parallax"
import { Button } from "@/components/ui/button"
import { ArrowRight, PawPrint } from "lucide-react"
import { Link } from "react-router-dom"

export function CTASection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-orange-50/50 to-primary/10" />

      <Parallax speed={-15} className="absolute top-8 left-8 md:left-16 pointer-events-none">
        <div className="w-20 h-10 md:w-32 md:h-14 relative opacity-40">
          <div className="absolute inset-0 bg-white rounded-full blur-sm" />
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-white rounded-full" />
        </div>
      </Parallax>
      <Parallax speed={-12} className="absolute top-16 right-12 md:right-32 pointer-events-none">
        <div className="w-16 h-8 md:w-24 md:h-12 relative opacity-30">
          <div className="absolute inset-0 bg-white rounded-full blur-sm" />
        </div>
      </Parallax>

      <Parallax speed={-20} rotate={[-15, 15]} className="absolute top-1/4 left-8 md:left-20 pointer-events-none">
        <div className="text-3xl md:text-5xl opacity-20">{"❤️"}</div>
      </Parallax>
      <Parallax speed={-18} rotate={[10, -10]} className="absolute top-1/3 right-8 md:right-16 pointer-events-none">
        <div className="text-4xl md:text-6xl opacity-20">{"🐾"}</div>
      </Parallax>
      <Parallax
        speed={-22}
        rotate={[-5, 10]}
        className="absolute bottom-1/4 left-1/4 pointer-events-none hidden md:block"
      >
        <div className="text-5xl opacity-15">{"💕"}</div>
      </Parallax>
      <Parallax speed={-16} rotate={[5, -15]} className="absolute bottom-1/3 right-1/4 pointer-events-none">
        <div className="text-4xl md:text-5xl opacity-20">{"🐾"}</div>
      </Parallax>

      <Parallax speed={2} className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 100" className="w-full h-12 md:h-20" preserveAspectRatio="none">
          <path
            fill="rgb(34, 197, 94)"
            fillOpacity="0.3"
            d="M0,100 L0,60 Q120,40 240,60 Q360,80 480,55 Q600,30 720,58 Q840,86 960,52 Q1080,18 1200,56 Q1320,80 1440,50 L1440,100 Z"
          />
        </svg>
      </Parallax>

      <div className="container px-4 md:px-6 relative z-10">
        <Parallax speed={2}>
          <div className="max-w-3xl mx-auto text-center">
            <Parallax speed={-3} scale={[0.9, 1.1]}>
              <div className="flex justify-center mb-4 md:mb-6">
                <div className="h-12 w-12 md:h-16 md:w-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                  <PawPrint className="h-6 w-6 md:h-8 md:w-8 text-primary-foreground" />
                </div>
              </div>
            </Parallax>

            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-4 md:mb-6 text-balance px-4">
              Pronto para cuidar melhor dos seus pets?
            </h2>

            <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-xl mx-auto px-4">
              Junte-se a milhares de tutores que ja estao usando o PetCare para manter seus animais de estimacao felizes
              e saudaveis.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 sm:px-0">
              <Link to="/register" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 h-12 md:h-14 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  Criar Conta Gratis
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </Link>
            </div>

            <Parallax speed={-5} className="mt-12 md:mt-16">
              <div className="flex justify-center gap-4 md:gap-8">
                <span
                  className="text-3xl md:text-5xl animate-bounce"
                  style={{ animationDelay: "0s", animationDuration: "2s" }}
                >
                  {"🐕"}
                </span>
                <span
                  className="text-3xl md:text-5xl animate-bounce"
                  style={{ animationDelay: "0.2s", animationDuration: "2s" }}
                >
                  {"🐱"}
                </span>
                <span
                  className="text-3xl md:text-5xl animate-bounce"
                  style={{ animationDelay: "0.4s", animationDuration: "2s" }}
                >
                  {"🐰"}
                </span>
                <span
                  className="text-3xl md:text-5xl animate-bounce"
                  style={{ animationDelay: "0.6s", animationDuration: "2s" }}
                >
                  {"🐦"}
                </span>
                <span
                  className="text-3xl md:text-5xl animate-bounce hidden sm:inline"
                  style={{ animationDelay: "0.8s", animationDuration: "2s" }}
                >
                  {"🐹"}
                </span>
              </div>
            </Parallax>
          </div>
        </Parallax>
      </div>
    </section>
  )
}
