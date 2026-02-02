import { Tire } from "@/api/tires/type";
import { Button } from "@/components/button";
import { FormErrors, FormGroup, Label } from "@/components/form";
import { Input } from "@/components/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export type OnCancelHandler = () => void | Promise<void>;

interface TireFormProps {
  defaultValues?: Partial<Tire>;
  onSubmit: (value: Partial<Tire>) => void | Promise<void>;
  onCancel: () => void | Promise<void>;
  variant?: "column" | "row";
}

export function TireForm({
  defaultValues,
  onSubmit,
  onCancel,
}: TireFormProps) {

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Partial<Tire>>({
    defaultValues: {
      ...defaultValues,
      tireManufactureDate: defaultValues?.tireManufactureDate ? defaultValues.tireManufactureDate.split("T")[0] : undefined,
    },
  });

  const onSubmitForm: SubmitHandler<Partial<Tire>> = async (value) => {
    onSubmit(value);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className={twMerge("flex gap-8 flex-col")}
    >
      <FormGroup>
        <Label htmlFor="cai">CAI (Référence commerciale)</Label>
        <Input
          id="cai"
          {...register("cai", { required: "Le CAI est requis" })}
          placeholder="CAI"
          aria-invalid={errors.cai ? "true" : "false"}
        />
        {errors.cai && <FormErrors>{errors.cai.message}</FormErrors>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="fiaBarcode">Code-barres FIA</Label>
        <Input
          id="fiaBarcode"
          {...register("fiaBarcode")}
          placeholder="Code-barres FIA"
          aria-invalid={errors.fiaBarcode ? "true" : "false"}
        />
        {errors.fiaBarcode && (
          <FormErrors>{errors.fiaBarcode.message}</FormErrors>
        )}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="routingBarcode">Code-barres de routage</Label>
        <Input
          id="routingBarcode"
          {...register("routingBarcode")}
          placeholder="Code-barres de routage"
          aria-invalid={errors.routingBarcode ? "true" : "false"}
        />
        {errors.routingBarcode && (
          <FormErrors>{errors.routingBarcode.message}</FormErrors>
        )}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="tireManufactureDate">Date de fabrication</Label>
        <Input
          id="tireManufactureDate"
          type="date"
          {...register("tireManufactureDate")}
          aria-invalid={errors.tireManufactureDate ? "true" : "false"}
        />
        {errors.tireManufactureDate && (
          <FormErrors>{errors.tireManufactureDate.message}</FormErrors>
        )}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="factoryTrigram">Usine (Trigramme)</Label>
        <Input
          id="factoryTrigram"
          {...register("factoryTrigram")}
          placeholder="Ex: CTX"
          aria-invalid={errors.factoryTrigram ? "true" : "false"}
        />
        {errors.factoryTrigram && (
          <FormErrors>{errors.factoryTrigram.message}</FormErrors>
        )}
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
