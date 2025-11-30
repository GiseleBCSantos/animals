import { Formik, Form, Field, type FormikHelpers } from "formik";
import type { Animal, AnimalSpecies } from "@/lib/types";
import { getAnimalConfig } from "@/lib/constants/animals";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const ANIMAL_CONFIG = getAnimalConfig();
  const species = Object.entries(ANIMAL_CONFIG);

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
            {animal ? t("animalFormEditPet") : t("animalFormAddNewPet")}
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
                <Label htmlFor="photo">{t("animalFormPhotoLabel")}</Label>
                <div className="flex items-center space-x-4">
                  {values.photo && (
                    <img
                      src={URL.createObjectURL(values.photo)}
                      alt={t("animalFormPhotoPreviewAlt")}
                      className="w-16 h-16 rounded-full object-cover border border-gray-300"
                    />
                  )}
                  <label
                    htmlFor="photo"
                    className="cursor-pointer inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    {t("animalFormChoosePhoto")}
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
                <Label htmlFor="name">{t("animalFormNameLabel")}</Label>
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  placeholder={t("animalFormNamePlaceholder")}
                />
                {errors.name && touched.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="species">{t("animalFormSpeciesLabel")}</Label>
                <Select
                  value={values.species}
                  onValueChange={(value) => setFieldValue("species", value)}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t("animalFormSpeciesPlaceholder")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {species.map(([key, option]) => (
                      <SelectItem key={key} value={key}>
                        {option.emoji} {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="breed">{t("animalFormBreedLabel")}</Label>
                <Field
                  as={Input}
                  id="breed"
                  name="breed"
                  placeholder={t("animalFormBreedPlaceholder")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">{t("animalFormAgeLabel")}</Label>
                <Field
                  as={Input}
                  id="age"
                  name="age"
                  type="number"
                  min="0"
                  max="100"
                  placeholder={t("animalFormAgePlaceholder")}
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
                  {t("animalFormCancel")}
                </Button>
                <Button type="submit" disabled={isSubmitting || !values.name}>
                  {isSubmitting && <Spinner className="mr-2" />}
                  {animal ? t("animalFormSave") : t("animalFormAdd")}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
