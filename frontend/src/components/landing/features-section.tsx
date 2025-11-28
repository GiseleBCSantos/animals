import { Parallax } from "react-scroll-parallax"
import { Card, CardContent } from "@/components/ui/card"
import { PawPrint, Bell, Sparkles, Shield, Smartphone, Heart } from "lucide-react"

const features = [
  {
    icon: PawPrint,
    title: "Perfis Completos",
    description: "Cadastre todos os detalhes dos seus pets: nome, especie, raca, idade e muito mais.",
    color: "text-primary bg-primary/10",
  },
  {
    icon: Sparkles,
    title: "Pensamentos do Dia",
    description: "Receba pensamentos fofos e unicos gerados por IA para cada um dos seus pets.",
    color: "text-accent bg-accent/10",
  },
  {
    icon: Bell,
    title: "Lembretes Inteligentes",
    description: "Nunca esqueca vacinas, consultas ou medicamentos importantes.",
    color: "text-blue-500 bg-blue-500/10",
  },
  {
    icon: Shield,
    title: "Seguranca Total",
    description: "Seus dados estao protegidos com a mais alta tecnologia de seguranca.",
    color: "text-green-500 bg-green-500/10",
  },
  {
    icon: Smartphone,
    title: "Acesse de Qualquer Lugar",
    description: "Interface responsiva que funciona perfeitamente em qualquer dispositivo.",
    color: "text-purple-500 bg-purple-500/10",
  },
  {
    icon: Heart,
    title: "Feito com Amor",
    description: "Desenvolvido por amantes de animais, para amantes de animais.",
    color: "text-red-500 bg-red-500/10",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30 overflow-hidden relative">
      <Parallax speed={-8} className="absolute top-10 left-4 md:left-10 pointer-events-none opacity-20">
        <div className="text-6xl md:text-8xl">🌿</div>
      </Parallax>
      <Parallax speed={-6} className="absolute top-20 right-4 md:right-16 pointer-events-none opacity-20">
        <div className="text-5xl md:text-7xl">🍃</div>
      </Parallax>
      <Parallax speed={-10} className="absolute bottom-20 left-1/4 pointer-events-none opacity-15 hidden md:block">
        <div className="text-7xl">🌱</div>
      </Parallax>

      <div className="container px-4 md:px-6 relative z-10">
        <Parallax speed={3}>
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Tudo que voce precisa para seus pets
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Uma plataforma completa com recursos pensados especialmente para facilitar o cuidado com seus animais de
              estimacao.
            </p>
          </div>
        </Parallax>

        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Parallax key={feature.title} speed={2 - index * 0.3} translateY={[20, -20]} opacity={[0.5, 1]}>
              <Card className="border-2 hover:border-primary/30 transition-all duration-300 hover:shadow-lg h-full bg-card/80 backdrop-blur-sm hover:-translate-y-1">
                <CardContent className="p-4 md:p-6">
                  <div
                    className={`h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 ${feature.color}`}
                  >
                    <feature.icon className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </Parallax>
          ))}
        </div>
      </div>
    </section>
  )
}
