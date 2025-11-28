import { api } from "./api"
import type { Animal, AnimalSpecies } from "@/lib/types"

export interface CreateAnimalData {
  name: string
  species: AnimalSpecies
  breed?: string
  age?: number
}

export interface UpdateAnimalData extends Partial<CreateAnimalData> {}

export const animalsService = {
  async getAll(): Promise<Animal[]> {
    return api.get<Animal[]>("/api/animals/")
  },

  async getById(id: string): Promise<Animal> {
    return api.get<Animal>(`/api/animals/${id}/`)
  },

  async create(data: CreateAnimalData): Promise<Animal> {
    return api.post<Animal>("/api/animals/", data)
  },

  async update(id: string, data: UpdateAnimalData): Promise<Animal> {
    return api.patch<Animal>(`/api/animals/${id}/`, data)
  },

  async delete(id: string): Promise<void> {
    return api.delete(`/api/animals/${id}/`)
  },
}
