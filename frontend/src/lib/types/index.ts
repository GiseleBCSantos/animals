export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
}

export interface Animal {
  id: string;
  tutor: number;
  name: string;
  species: AnimalSpecies;
  breed: string | null;
  age: number | null;
  photo: string | null;
  thought_of_the_day: string | null;
  thought_generated_at: string | null;
}

export type AnimalSpecies =
  | "dog"
  | "cat"
  | "bird"
  | "rabbit"
  | "hamster"
  | "fish"
  | "reptile"
  | "horse"
  | "other";

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  name: string;
  password: string;
}

export interface ApiError {
  message: string;
  details?: Record<string, string[]>;
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NEXT_PUBLIC_API_URL?: string;
  // add other env variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
