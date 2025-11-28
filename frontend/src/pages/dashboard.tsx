import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnimalCard } from "@/components/animals/animal-card";
import { AnimalFormDialog } from "@/components/animals/animal-form-dialog";
import { DeleteConfirmationDialog } from "@/components/animals/delete-confirmation-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAnimalsQuery } from "@/hooks/use-animals-query";
import { useAnimalsStore } from "@/lib/stores/animals-store";
import { useAuthStore } from "@/lib/stores/auth-store";
import type { Animal, AnimalSpecies } from "@/lib/types";
import { SPECIES_OPTIONS } from "@/lib/constants/animals";
import {
  Plus,
  Sparkles,
  Search,
  Filter,
  PawPrint,
  AlertCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimatePresence, motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "react-toastify";

export default function DashboardPage() {
  const { user, isDevMode } = useAuthStore();
  const { searchQuery, speciesFilter, setSearchQuery, setSpeciesFilter } =
    useAnimalsStore();

  const {
    animals,
    isLoading: animalsLoading,
    createAnimal,
    updateAnimal,
    deleteAnimal,
    generateThoughtOfTheDay,
    refetch,
  } = useAnimalsQuery();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [isGeneratingThoughts, setIsGeneratingThoughts] = useState(false);

  const handleCreateOrUpdate = async (data: {
    name: string;
    species: AnimalSpecies;
    breed?: string;
    age?: number;
  }) => {
    try {
      if (selectedAnimal) {
        await updateAnimal(selectedAnimal.id, data);
        toast(`${data.name} foi atualizado com sucesso.`);
      } else {
        await createAnimal(data);
        toast(`${data.name} foi adicionado a sua familia.`);
      }
      setSelectedAnimal(null);
    } catch {
      toast("Nao foi possivel salvar o pet.", { type: "error" });
      throw new Error("Failed to save");
    }
  };

  const handleDelete = async () => {
    if (!selectedAnimal) return;
    try {
      await deleteAnimal(selectedAnimal.id);
      toast(`${selectedAnimal.name} foi removido da sua lista.`);
      setSelectedAnimal(null);
    } catch {
      toast("Nao foi possivel remover o pet.", { type: "error" });
    }
  };

  const handleGenerateThoughts = async () => {
    setIsGeneratingThoughts(true);
    try {
      if (isDevMode) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        toast("Pensamentos gerados! Seus pets tem novos pensamentos do dia.");
      } else {
        await generateThoughtOfTheDay();
        await refetch();
        toast("Pensamentos gerados! Seus pets tem novos pensamentos do dia.");
      }
    } catch {
      toast("Nao foi possivel gerar os pensamentos.", { type: "error" });
    } finally {
      setIsGeneratingThoughts(false);
    }
  };

  const filteredAnimals = animals.filter((animal) => {
    const matchesSearch =
      animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal.breed?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecies =
      speciesFilter === "all" || animal.species === speciesFilter;
    return matchesSearch && matchesSpecies;
  });

  return (
    <div className="min-h-screen flex flex-col bg-muted/20 overflow-x-hidden">
      <Header />

      <main className="flex-1 container px-4 md:px-6 py-6 md:py-8">
        {isDevMode && (
          <Alert className="mb-4 md:mb-6 border-amber-500/50 bg-amber-50 text-amber-900">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <AlertDescription className="text-sm">
              Modo de desenvolvimento ativo. Os dados exibidos sao mockados.
            </AlertDescription>
          </Alert>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 md:mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Ola, {user?.name || "Visitante"}!
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Gerencie seus pets e acompanhe suas informacoes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-4 mb-6 md:mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar pets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex-1">
              <Select
                value={speciesFilter}
                onValueChange={(v) =>
                  setSpeciesFilter(v as AnimalSpecies | "all")
                }
              >
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2 flex-shrink-0" />
                  <SelectValue placeholder="Filtrar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as especies</SelectItem>
                  {SPECIES_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.emoji} {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {animals.length > 0 && (
              <Button
                variant="outline"
                onClick={handleGenerateThoughts}
                disabled={isGeneratingThoughts}
                className="w-full sm:w-auto bg-transparent"
              >
                {isGeneratingThoughts ? (
                  <Spinner className="mr-2" />
                ) : (
                  <Sparkles className="h-4 w-4 mr-2 flex-shrink-0" />
                )}
                <span className="truncate">Gerar Pensamentos</span>
              </Button>
            )}
            <Button
              onClick={() => {
                setSelectedAnimal(null);
                setIsFormOpen(true);
              }}
              className="w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2 flex-shrink-0" />
              Adicionar Pet
            </Button>
          </div>
        </motion.div>

        {animalsLoading ? (
          <div className="flex items-center justify-center py-20">
            <Spinner className="h-8 w-8 text-primary" />
          </div>
        ) : filteredAnimals.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 md:py-20 text-center px-4"
          >
            <div className="h-16 w-16 md:h-20 md:w-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-4 md:mb-6">
              <PawPrint className="h-8 w-8 md:h-10 md:w-10 text-primary" />
            </div>
            {animals.length === 0 ? (
              <>
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  Nenhum pet cadastrado
                </h3>
                <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-md">
                  Comece adicionando seu primeiro pet para acompanhar todas as
                  informacoes importantes.
                </p>
                <Button
                  onClick={() => {
                    setSelectedAnimal(null);
                    setIsFormOpen(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Primeiro Pet
                </Button>
              </>
            ) : (
              <>
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  Nenhum pet encontrado
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Tente ajustar os filtros de busca.
                </p>
              </>
            )}
          </motion.div>
        ) : (
          <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            <AnimatePresence>
              {filteredAnimals.map((animal, index) => (
                <motion.div
                  key={animal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <AnimalCard
                    animal={animal}
                    onEdit={(a) => {
                      setSelectedAnimal(a);
                      setIsFormOpen(true);
                    }}
                    onDelete={(a) => {
                      setSelectedAnimal(a);
                      setIsDeleteOpen(true);
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      <Footer />

      <AnimalFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        animal={selectedAnimal}
        onSubmit={handleCreateOrUpdate}
      />

      <DeleteConfirmationDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        animal={selectedAnimal}
        onConfirm={handleDelete}
      />
    </div>
  );
}
