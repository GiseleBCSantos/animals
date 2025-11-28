import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { animalsService, type CreateAnimalData, type UpdateAnimalData } from "@/lib/services/animals"
import type { Animal } from "@/lib/types"
import { useAuthStore } from "@/lib/stores/auth-store"

// Mock data for dev mode
const MOCK_ANIMALS: Animal[] = [
  {
    id: "1",
    tutor: 1,
    name: "Rex",
    species: "dog",
    breed: "Golden Retriever",
    age: 3,
    photo: null,
    thought_of_the_day: "Hoje eu vi um esquilo e fingi que nao vi, porque sou um cavalheiro.",
    thought_generated_at: new Date().toISOString(),
  },
  {
    id: "2",
    tutor: 1,
    name: "Mimi",
    species: "cat",
    breed: "Persa",
    age: 5,
    photo: null,
    thought_of_the_day: "Humanos pensam que me controlam. Que doce ilusao.",
    thought_generated_at: new Date().toISOString(),
  },
  {
    id: "3",
    tutor: 1,
    name: "Piu",
    species: "bird",
    breed: "Calopsita",
    age: 2,
    photo: null,
    thought_of_the_day: "Por que o humano fica olhando pra aquela caixa brilhante o dia todo?",
    thought_generated_at: new Date().toISOString(),
  },
  {
    id: "4",
    tutor: 1,
    name: "Nemo",
    species: "fish",
    breed: "Betta",
    age: 1,
    photo: null,
    thought_of_the_day: "Bolha bolha bolha... isso e tudo que importa.",
    thought_generated_at: new Date().toISOString(),
  },
  {
    id: "5",
    tutor: 1,
    name: "Coelho",
    species: "rabbit",
    breed: "Mini Lop",
    age: 2,
    photo: null,
    thought_of_the_day: "Cenouras sao superestimadas. Prefiro as folhas.",
    thought_generated_at: new Date().toISOString(),
  },
  {
    id: "6",
    tutor: 1,
    name: "Thor",
    species: "hamster",
    breed: "Sirio",
    age: 1,
    photo: null,
    thought_of_the_day: "Minha roda e meu trono. Giro, logo existo.",
    thought_generated_at: new Date().toISOString(),
  },
]

const ANIMALS_KEY = ["animals"]

export function useAnimalsQuery() {
  const { isDevMode } = useAuthStore()
  const queryClient = useQueryClient()

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ANIMALS_KEY,
    queryFn: async () => {
      if (isDevMode) {
        return MOCK_ANIMALS
      }
      return animalsService.getAll()
    },
  })

  const createMutation = useMutation({
    mutationFn: async (animalData: CreateAnimalData) => {
      if (isDevMode) {
        const newAnimal: Animal = {
          id: Date.now().toString(),
          tutor: 1,
          name: animalData.name,
          species: animalData.species,
          breed: animalData.breed || null,
          age: animalData.age || null,
          photo: null,
          thought_of_the_day: null,
          thought_generated_at: null,
        }
        return newAnimal
      }
      return animalsService.create(animalData)
    },
    onSuccess: (newAnimal) => {
      queryClient.setQueryData<Animal[]>(ANIMALS_KEY, (old) => [...(old || []), newAnimal])
    },
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateAnimalData }) => {
      if (isDevMode) {
        const animals = queryClient.getQueryData<Animal[]>(ANIMALS_KEY) || []
        const animal = animals.find((a) => a.id === id)
        return { ...animal, ...data } as Animal
      }
      return animalsService.update(id, data)
    },
    onSuccess: (updatedAnimal) => {
      queryClient.setQueryData<Animal[]>(ANIMALS_KEY, (old) =>
        old?.map((a) => (a.id === updatedAnimal.id ? updatedAnimal : a)),
      )
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!isDevMode) {
        await animalsService.delete(id)
      }
      return id
    },
    onSuccess: (id) => {
      queryClient.setQueryData<Animal[]>(ANIMALS_KEY, (old) => old?.filter((a) => a.id !== id))
    },
  })

  return {
    animals: data || [],
    isLoading,
    error,
    refetch,
    createAnimal: createMutation.mutateAsync,
    updateAnimal: (id: string, data: UpdateAnimalData) => updateMutation.mutateAsync({ id, data }),
    deleteAnimal: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}
