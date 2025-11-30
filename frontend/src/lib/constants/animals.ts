import type { AnimalSpecies } from "@/lib/types";
import { t } from "i18next";

export const getAnimalConfig = () =>
  ({
    dog: {
      label: t("speciesDog"),
      emoji: "🐕",
      colorClass: "text-animal-dog",
      bgClass: "bg-animal-dog-light",
      borderClass: "border-animal-dog-border",
      decoration: "🦴",
      icon: "paw",
    },
    cat: {
      label: t("speciesCat"),
      emoji: "🐱",
      colorClass: "text-animal-cat",
      bgClass: "bg-animal-cat-light",
      borderClass: "border-animal-cat-border",
      decoration: "🐟",
      icon: "whiskers",
    },
    bird: {
      label: t("speciesBird"),
      emoji: "🐦",
      colorClass: "text-animal-bird",
      bgClass: "bg-animal-bird-light",
      borderClass: "border-animal-bird-border",
      decoration: "🪶",
      icon: "feather",
    },
    rabbit: {
      label: t("speciesRabbit"),
      emoji: "🐰",
      colorClass: "text-animal-rabbit",
      bgClass: "bg-animal-rabbit-light",
      borderClass: "border-animal-rabbit-border",
      decoration: "🥕",
      icon: "carrot",
    },
    hamster: {
      label: t("speciesHamster"),
      emoji: "🐹",
      colorClass: "text-animal-hamster",
      bgClass: "bg-animal-hamster-light",
      borderClass: "border-animal-hamster-border",
      decoration: "🌻",
      icon: "wheel",
    },
    fish: {
      label: t("speciesFish"),
      emoji: "🐠",
      colorClass: "text-animal-fish",
      bgClass: "bg-animal-fish-light",
      borderClass: "border-animal-fish-border",
      decoration: "🫧",
      icon: "bubbles",
    },
    reptile: {
      label: t("speciesReptile"),
      emoji: "🦎",
      colorClass: "text-animal-reptile",
      bgClass: "bg-animal-reptile-light",
      borderClass: "border-animal-reptile-border",
      decoration: "🪨",
      icon: "scales",
    },
    horse: {
      label: t("speciesHorse"),
      emoji: "🐴",
      colorClass: "text-animal-horse",
      bgClass: "bg-animal-horse-light",
      borderClass: "border-animal-horse-border",
      decoration: "🧲",
      icon: "horseshoe",
    },
    other: {
      label: t("speciesOther"),
      emoji: "🐾",
      colorClass: "text-animal-other",
      bgClass: "bg-animal-other-light",
      borderClass: "border-animal-other-border",
      decoration: "❤️",
      icon: "heart",
    },
  } satisfies Record<AnimalSpecies, any>);

export const getSpeciesOptions = () => {
  const config = getAnimalConfig();
  return Object.entries(config).map(([value, item]) => ({
    value: value as AnimalSpecies,
    label: item.label,
    emoji: item.emoji,
  }));
};
