import type { AnimalSpecies } from "@/lib/types"

export const ANIMAL_CONFIG: Record<
  AnimalSpecies,
  {
    label: string
    emoji: string
    colorClass: string
    bgClass: string
    borderClass: string
    decoration: string
    icon: string
  }
> = {
  dog: {
    label: "Cachorro",
    emoji: "🐕",
    colorClass: "text-animal-dog",
    bgClass: "bg-animal-dog-light",
    borderClass: "border-animal-dog-border",
    decoration: "🦴",
    icon: "paw",
  },
  cat: {
    label: "Gato",
    emoji: "🐱",
    colorClass: "text-animal-cat",
    bgClass: "bg-animal-cat-light",
    borderClass: "border-animal-cat-border",
    decoration: "🐟",
    icon: "whiskers",
  },
  bird: {
    label: "Pássaro",
    emoji: "🐦",
    colorClass: "text-animal-bird",
    bgClass: "bg-animal-bird-light",
    borderClass: "border-animal-bird-border",
    decoration: "🪶",
    icon: "feather",
  },
  rabbit: {
    label: "Coelho",
    emoji: "🐰",
    colorClass: "text-animal-rabbit",
    bgClass: "bg-animal-rabbit-light",
    borderClass: "border-animal-rabbit-border",
    decoration: "🥕",
    icon: "carrot",
  },
  hamster: {
    label: "Hamster",
    emoji: "🐹",
    colorClass: "text-animal-hamster",
    bgClass: "bg-animal-hamster-light",
    borderClass: "border-animal-hamster-border",
    decoration: "🌻",
    icon: "wheel",
  },
  fish: {
    label: "Peixe",
    emoji: "🐠",
    colorClass: "text-animal-fish",
    bgClass: "bg-animal-fish-light",
    borderClass: "border-animal-fish-border",
    decoration: "🫧",
    icon: "bubbles",
  },
  reptile: {
    label: "Réptil",
    emoji: "🦎",
    colorClass: "text-animal-reptile",
    bgClass: "bg-animal-reptile-light",
    borderClass: "border-animal-reptile-border",
    decoration: "🪨",
    icon: "scales",
  },
  horse: {
    label: "Cavalo",
    emoji: "🐴",
    colorClass: "text-animal-horse",
    bgClass: "bg-animal-horse-light",
    borderClass: "border-animal-horse-border",
    decoration: "🧲",
    icon: "horseshoe",
  },
  other: {
    label: "Outro",
    emoji: "🐾",
    colorClass: "text-animal-other",
    bgClass: "bg-animal-other-light",
    borderClass: "border-animal-other-border",
    decoration: "❤️",
    icon: "heart",
  },
}

export const SPECIES_OPTIONS = Object.entries(ANIMAL_CONFIG).map(([value, config]) => ({
  value: value as AnimalSpecies,
  label: config.label,
  emoji: config.emoji,
}))
