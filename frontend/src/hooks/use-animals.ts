import useSWR from "swr"
import { animalsService, type CreateAnimalData, type UpdateAnimalData } from "@/lib/services/animals"
import type { Animal } from "@/lib/types"

const ANIMALS_KEY = "/api/animals"

export function useAnimals() {
  const { data, error, isLoading, mutate } = useSWR<Animal[]>(ANIMALS_KEY, () => animalsService.getAll())

  const createAnimal = async (animalData: CreateAnimalData) => {
    const newAnimal = await animalsService.create(animalData)
    mutate([...(data || []), newAnimal])
    return newAnimal
  }

  const updateAnimal = async (id: string, animalData: UpdateAnimalData) => {
    const updated = await animalsService.update(id, animalData)
    mutate(data?.map((a) => (a.id === id ? updated : a)))
    return updated
  }

  const deleteAnimal = async (id: string) => {
    await animalsService.delete(id)
    mutate(data?.filter((a) => a.id !== id))
  }

  return {
    animals: data || [],
    isLoading,
    error,
    refetch: mutate,
    createAnimal,
    updateAnimal,
    deleteAnimal,
  }
}
