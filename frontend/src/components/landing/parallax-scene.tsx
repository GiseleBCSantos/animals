import { Parallax } from "react-scroll-parallax"

export function ParallaxScene() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Sky gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-sky-100 to-orange-100/50" />

      {/* Sun - slowest movement (far background) */}
      <Parallax speed={-30} className="absolute top-8 right-8 md:top-16 md:right-24">
        <div className="relative">
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 shadow-[0_0_60px_rgba(251,191,36,0.6)]" />
          <div className="absolute inset-0 w-16 h-16 md:w-24 md:h-24 rounded-full bg-yellow-200 opacity-50 animate-pulse" />
        </div>
      </Parallax>

      {/* Clouds - slow movement (far background) */}
      <Parallax speed={-20} className="absolute top-12 left-4 md:top-20 md:left-12">
        <Cloud size="lg" />
      </Parallax>
      <Parallax speed={-18} className="absolute top-24 right-12 md:top-32 md:right-1/4">
        <Cloud size="md" />
      </Parallax>
      <Parallax speed={-15} className="absolute top-40 left-1/3 hidden md:block">
        <Cloud size="sm" />
      </Parallax>
      <Parallax speed={-22} className="absolute top-16 left-1/2 hidden lg:block">
        <Cloud size="md" />
      </Parallax>

      {/* Far mountains (background layer) */}
      <Parallax speed={-12} className="absolute bottom-32 md:bottom-48 left-0 right-0">
        <svg viewBox="0 0 1440 320" className="w-full h-32 md:h-48" preserveAspectRatio="none">
          <path
            fill="rgba(148, 163, 184, 0.4)"
            d="M0,224 C120,180 240,280 360,220 C480,160 600,240 720,200 C840,160 960,220 1080,180 C1200,140 1320,200 1440,160 L1440,320 L0,320 Z"
          />
        </svg>
      </Parallax>

      {/* Mid mountains (middle layer) */}
      <Parallax speed={-8} className="absolute bottom-24 md:bottom-36 left-0 right-0">
        <svg viewBox="0 0 1440 320" className="w-full h-36 md:h-56" preserveAspectRatio="none">
          <path
            fill="rgba(100, 116, 139, 0.5)"
            d="M0,192 C180,120 360,240 540,180 C720,120 900,200 1080,160 C1260,120 1380,180 1440,140 L1440,320 L0,320 Z"
          />
        </svg>
      </Parallax>

      {/* Near hills (foreground layer) */}
      <Parallax speed={-4} className="absolute bottom-16 md:bottom-24 left-0 right-0">
        <svg viewBox="0 0 1440 320" className="w-full h-40 md:h-64" preserveAspectRatio="none">
          <path
            fill="rgba(34, 197, 94, 0.3)"
            d="M0,256 C240,200 480,280 720,240 C960,200 1200,260 1440,220 L1440,320 L0,320 Z"
          />
        </svg>
      </Parallax>

      {/* Trees on hills */}
      <Parallax speed={-5} className="absolute bottom-28 md:bottom-40 left-8 md:left-16">
        <Tree size="lg" />
      </Parallax>
      <Parallax speed={-4} className="absolute bottom-24 md:bottom-32 left-20 md:left-32">
        <Tree size="md" />
      </Parallax>
      <Parallax speed={-6} className="absolute bottom-32 md:bottom-48 right-12 md:right-24">
        <Tree size="lg" />
      </Parallax>
      <Parallax speed={-3} className="absolute bottom-20 md:bottom-28 right-24 md:right-48">
        <Tree size="sm" />
      </Parallax>
      <Parallax speed={-5} className="absolute bottom-28 md:bottom-36 left-1/3 hidden md:block">
        <Tree size="md" />
      </Parallax>

      {/* Flying birds */}
      <Parallax speed={-25} translateX={[-20, 20]} className="absolute top-28 left-1/4">
        <Bird />
      </Parallax>
      <Parallax speed={-28} translateX={[20, -20]} className="absolute top-36 left-1/3 hidden md:block">
        <Bird />
      </Parallax>
      <Parallax speed={-22} translateX={[-10, 30]} className="absolute top-20 right-1/3">
        <Bird />
      </Parallax>

      {/* Grass foreground (closest layer) */}
      <Parallax speed={2} className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-16 md:h-24" preserveAspectRatio="none">
          <path
            fill="rgb(34, 197, 94)"
            d="M0,120 L0,80 Q60,60 120,80 Q180,100 240,75 Q300,50 360,78 Q420,106 480,72 Q540,38 600,70 Q660,102 720,68 Q780,34 840,72 Q900,110 960,76 Q1020,42 1080,74 Q1140,106 1200,70 Q1260,34 1320,76 Q1380,100 1440,80 L1440,120 Z"
          />
        </svg>
      </Parallax>

      {/* Grass blades detail */}
      <Parallax speed={3} className="absolute bottom-0 left-0 right-0">
        <div className="flex justify-around">
          {Array.from({ length: 20 }).map((_, i) => (
            <GrassBlade key={i} delay={i * 0.1} />
          ))}
        </div>
      </Parallax>

      {/* Floating pets in the scene */}
      <Parallax speed={-10} rotate={[-5, 5]} className="absolute bottom-36 md:bottom-52 left-8 md:left-20">
        <FloatingPet emoji="🐕" />
      </Parallax>
      <Parallax speed={-8} rotate={[5, -5]} className="absolute bottom-40 md:bottom-56 right-12 md:right-28">
        <FloatingPet emoji="🐱" />
      </Parallax>
      <Parallax speed={-12} rotate={[-3, 3]} className="absolute bottom-48 md:bottom-64 left-1/3 hidden md:block">
        <FloatingPet emoji="🐰" />
      </Parallax>

      {/* Butterflies */}
      <Parallax speed={-15} translateX={[-30, 30]} translateY={[-10, 10]} className="absolute top-1/2 left-1/4">
        <Butterfly />
      </Parallax>
      <Parallax
        speed={-18}
        translateX={[20, -40]}
        translateY={[10, -10]}
        className="absolute top-1/3 right-1/4 hidden md:block"
      >
        <Butterfly />
      </Parallax>
    </div>
  )
}

function Cloud({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-16 h-8 md:w-24 md:h-12",
    md: "w-24 h-12 md:w-36 md:h-16",
    lg: "w-32 h-14 md:w-48 md:h-20",
  }

  return (
    <div className={`${sizeClasses[size]} relative`}>
      <div className="absolute inset-0 bg-white rounded-full opacity-90 blur-sm" />
      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-white rounded-full opacity-90" />
      <div className="absolute top-0 left-1/3 w-2/3 h-3/4 bg-white rounded-full opacity-80" />
    </div>
  )
}

function Tree({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-6 h-12 md:w-8 md:h-16",
    md: "w-8 h-16 md:w-12 md:h-24",
    lg: "w-10 h-20 md:w-16 md:h-32",
  }

  return (
    <div className={`${sizeClasses[size]} relative`}>
      {/* Tree trunk */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-1/3 bg-amber-800 rounded-sm" />
      {/* Tree foliage */}
      <div className="absolute top-0 left-0 w-full h-3/4 bg-green-600 rounded-full" />
      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-green-500 rounded-full opacity-80" />
    </div>
  )
}

function Bird() {
  return (
    <svg width="24" height="12" viewBox="0 0 24 12" className="text-slate-600 opacity-60">
      <path d="M0,6 Q6,0 12,6 Q18,0 24,6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function GrassBlade({ delay }: { delay: number }) {
  return (
    <div
      className="w-1 h-6 md:h-10 bg-gradient-to-t from-green-600 to-green-400 rounded-t-full origin-bottom"
      style={{
        animation: `sway 2s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    />
  )
}

function FloatingPet({ emoji }: { emoji: string }) {
  return (
    <div className="relative animate-bounce" style={{ animationDuration: "3s" }}>
      <div className="text-3xl md:text-5xl drop-shadow-lg">{emoji}</div>
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-2 bg-black/10 rounded-full blur-sm" />
    </div>
  )
}

function Butterfly() {
  return (
    <div className="text-xl md:text-2xl animate-pulse" style={{ animationDuration: "1.5s" }}>
      🦋
    </div>
  )
}
