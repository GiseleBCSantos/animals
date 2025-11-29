import { Formik, Form, Field, type FormikHelpers } from "formik";
import type { Animal, AnimalSpecies } from "@/lib/types";
import { SPECIES_OPTIONS } from "@/lib/constants/animals";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { animalSchema } from "@/lib/validations/auth";

export interface AnimalFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  animal?: Animal | null;
  onSubmit: (data: {
    name: string;
    species: AnimalSpecies;
    breed?: string;
    age?: number;
    photo?: File | null;
  }) => Promise<void>;
}

interface AnimalFormValues {
  name: string;
  species: AnimalSpecies;
  breed: string;
  age: string;
  photo: File | null;
}

export function AnimalFormDialog({
  open,
  onOpenChange,
  animal,
  onSubmit,
}: AnimalFormDialogProps) {
  const initialValues: AnimalFormValues = {
    name: animal?.name || "",
    species: animal?.species || "dog",
    breed: animal?.breed || "",
    age: animal?.age?.toString() || "",
    photo: null,
  };

  const handleSubmit = async (
    values: AnimalFormValues,
    { setSubmitting, resetForm }: FormikHelpers<AnimalFormValues>
  ) => {
    try {
      await onSubmit({
        name: values.name,
        species: values.species,
        breed: values.breed || undefined,
        age: values.age ? Number.parseInt(values.age) : undefined,
        photo: values.photo || undefined,
      });
      resetForm();
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting animal form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {animal ? "Editar Pet" : "Adicionar Novo Pet"}
          </DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={animalSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, errors, touched, isSubmitting, setFieldValue }) => (
            <Form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="photo">Foto do Pet</Label>
                <div className="flex items-center space-x-4">
                  {values.photo && (
                    <img
                      src={URL.createObjectURL(values.photo)}
                      alt="Preview"
                      className="w-16 h-16 rounded-full object-cover border border-gray-300"
                    />
                  )}
                  <label
                    htmlFor="photo"
                    className="cursor-pointer inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    Escolher Foto
                    <input
                      id="photo"
                      name="photo"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => {
                        const file = event.currentTarget.files?.[0] || null;
                        setFieldValue("photo", file);
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Nome *</Label>
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  placeholder="Nome do seu pet"
                />
                {errors.name && touched.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="species">Especie *</Label>
                <Select
                  value={values.species}
                  onValueChange={(value) => setFieldValue("species", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a especie" />
                  </SelectTrigger>
                  <SelectContent>
                    {SPECIES_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.emoji} {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="breed">Raca</Label>
                <Field
                  as={Input}
                  id="breed"
                  name="breed"
                  placeholder="Raca do seu pet (opcional)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Idade (anos)</Label>
                <Field
                  as={Input}
                  id="age"
                  name="age"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="Idade em anos (opcional)"
                />
                {errors.age && touched.age && (
                  <p className="text-sm text-destructive">{errors.age}</p>
                )}
              </div>

              <DialogFooter className="gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting || !values.name}>
                  {isSubmitting && <Spinner className="mr-2" />}
                  {animal ? "Salvar" : "Adicionar"}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
