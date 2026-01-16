import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { twMerge } from "tailwind-merge";
import { SubmitHandler, useForm } from "react-hook-form";
import { TourSelection } from "@/api/selections/find-all-selections.options";
import { FormGroup, Label, FormErrors } from "@/components/form";

export type OnCancelHandler = () => void | Promise<void>;

interface SiteFormProps {
  defaultValues?: Partial<TourSelection>;
  onSubmit: (value: Partial<TourSelection>) => void | Promise<void>;
  onCancel: () => void | Promise<void>;
  variant?: "column" | "row";
}

export function SelectionForm({
  defaultValues,
  onSubmit,
  onCancel,
}: SiteFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Partial<TourSelection>>({ defaultValues });

  const onSubmitForm: SubmitHandler<Partial<TourSelection>> = async (value) => {
    onSubmit(value);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className={twMerge("flex gap-8 flex-col")}
    >
      <FormGroup>
        <Label htmlFor="name">Nom</Label>
        <Input
          id="name"
          {...register("name", { required: "Le nom est requis" })}
          placeholder="Nom"
          aria-invalid={errors.name ? "true" : "false"}
        />
        {errors.name && <FormErrors>{errors.name.message}</FormErrors>}
      </FormGroup>

      <div className="flex justify-end gap-3">
        <Button type="button" variant={"outline"} onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" disabled={!isValid}>
          Sauvegarder
        </Button>
      </div>
    </form>
  );
}
