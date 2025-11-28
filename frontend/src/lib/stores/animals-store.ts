import { create } from "zustand"
import type { AnimalSpecies } from "@/lib/types"

interface AnimalsState {
  searchQuery: string
  speciesFilter: AnimalSpecies | "all"
  setSearchQuery: (query: string) => void
  setSpeciesFilter: (species: AnimalSpecies | "all") => void
  resetFilters: () => void
}

export const useAnimalsStore = create<AnimalsState>((set) => ({
  searchQuery: "",
  speciesFilter: "all",
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSpeciesFilter: (species) => set({ speciesFilter: species }),
  resetFilters: () => set({ searchQuery: "", speciesFilter: "all" }),
}))
