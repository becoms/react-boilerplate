/** @jsxImportSource @emotion/react */
import "twin.macro";
import { useFormContext } from "react-hook-form";
import {
  CheckBox,
  HelperText,
  FormGroup,
  Input,
  Label,
  Select,
  ErrorMessage,
} from "../shared/Form";

export const ItemForm = (props) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div tw="grid grid-cols-1 gap-6" {...props}>
      <input type="hidden" name="_id" {...register("_id")} />

      <FormGroup>
        <Label>Nom</Label>
        <Input type="text" {...register("name", { required: true })} />
        <ErrorMessage>{errors.name && "Le nom est obligatoire"}</ErrorMessage>
      </FormGroup>

      <FormGroup>
        <Label>Statut</Label>
        <Select {...register("status", { required: true })}>
          {[{ value: "active", label: "Actif" }, { value: "archived", label: "Archivé" }].map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
        <ErrorMessage>{errors.name && "Le statut est obligatoire"}</ErrorMessage>
      </FormGroup>

      <FormGroup tw="col-span-1 sm:col-span-full flex flex-col space-y-2">
        <Label>Couleur</Label>
        <div tw="flex space-x-2 items-center">
          <CheckBox type="checkbox" value="Bleu" {...register("color", { required: true })} />
          <Label>Bleu</Label>
        </div>
        <div tw="flex space-x-2 items-center">
          <CheckBox type="checkbox" value="Jaune" {...register("color", { required: true })} />
          <Label>Jaune</Label>
        </div>
        <div tw="flex space-x-2 items-center">
          <CheckBox type="checkbox" value="Rouge" {...register("color", { required: true })} />
          <Label>Rouge</Label>
        </div>
      </FormGroup>
    </div>
  );
};
