import { api } from "./api";
import type { Animal, AnimalSpecies, PaginatedResponse } from "@/lib/types";

export interface CreateAnimalData {
  name: string;
  species: AnimalSpecies;
  breed?: string;
  age?: number;
  photo?: File | null;
}

export interface UpdateAnimalData extends Partial<CreateAnimalData> {}

function toFormData(data: CreateAnimalData | UpdateAnimalData) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value instanceof File ? value : String(value));
    }
  });
  return formData;
}

export const animalsService = {
  async getAll(): Promise<PaginatedResponse<Animal>> {
    return api.get<PaginatedResponse<Animal>>("/api/animals/");
  },

  async getById(id: string): Promise<Animal> {
    return api.get<Animal>(`/api/animals/${id}/`);
  },

  async create(data: CreateAnimalData): Promise<Animal> {
    const formData = toFormData(data);
    return api.post<Animal>("/api/animals/", formData);
  },

  async update(id: string, data: UpdateAnimalData): Promise<Animal> {
    const formData = toFormData(data);
    return api.patch<Animal>(`/api/animals/${id}/`, formData);
  },

  async delete(id: string): Promise<void> {
    return api.delete(`/api/animals/${id}/`);
  },
};
