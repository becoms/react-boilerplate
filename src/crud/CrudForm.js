/** @jsxImportSource @emotion/react */
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import "twin.macro";
import { PrimaryButton, Button } from "../shared/Buttons";
import {
  CheckBox,
  HelperText,
  FormGroup,
  Input,
  Label,
  Select,
} from "../shared/Form";
import { Modal, ModalActions, ModalButton } from "../shared/Modal";
import { Panel, PanelContent, PanelFooter } from "../shared/Panel";
import { ROUTE_PATH } from "./constants";
import { useUpsertMutation } from "./CrudQueries";

const CrudFormFields = (props) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div tw="grid grid-cols-1 gap-6" {...props}>
      <input type="hidden" name="_id" ref={register()} />

      <FormGroup>
        <Label>Nom</Label>
        <Input type="text" {...register("name", { required: true })} />
        <HelperText tw="text-red-800">{errors.name && "Le nom est obligatoire"}</HelperText>
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
        <HelperText tw="text-red-800">{errors.name && "Le statut est obligatoire"}</HelperText>
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

/**
 * Item creation or update form wrapped within a Panel.
 * @type {React.FC<{ item?: import("./CrudQueries").Item }>}
 */
export const CrudForm = ({ item = {} }) => {
  const formProps = useForm({
    defaultValues: item,
  });
  const { mutateAsync: upsertItem, status, data } = useUpsertMutation();
  const onSubmit = async (formValues) => {
    await upsertItem(formValues);
  };
  const { handleSubmit } = formProps;
  const navigate = useNavigate();

  return (
    <FormProvider {...formProps}>
      {data && <Navigate to={ROUTE_PATH} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Panel>
          <PanelContent>
            <CrudFormFields tw="sm:grid-cols-3" />
          </PanelContent>
          <PanelFooter>
            <Button type="button" disabled={status === "loading"} onClick={() => navigate(ROUTE_PATH)}>
              Annuler
            </Button>
            <PrimaryButton type="submit" disabled={status === "loading"}>
              Enregistrer
            </PrimaryButton>
          </PanelFooter>
        </Panel>
      </form>
    </FormProvider>
  );
};

/** Form only displayed when Modal is open to allow form to be initialized with the item defaultValues */
const CrudCreationModalForm = ({ item, onDismiss, onCreated }) => {
  const formProps = useForm({
    mode: "onSubmit",
    defaultValues: item,
  });
  const { handleSubmit } = formProps;

  const { mutateAsync: upsertItem, status } = useUpsertMutation();
  const onCreate = async (data) => {
    const createdItem = await upsertItem(data);
    onCreated(createdItem);
  };

  return (
    <FormProvider {...formProps}>
      <form onSubmit={handleSubmit(onCreate)}>
        <CrudFormFields tw="sm:grid-cols-2" />
        <ModalActions>
          <ModalButton onClick={onDismiss} type="button">
            Annuler
          </ModalButton>
          <ModalButton as={PrimaryButton} type="submit" disabled={status === "loading"}>
            Enregistrer
          </ModalButton>
        </ModalActions>
      </form>
    </FormProvider>
  );
};

export const CrudCreationModal = ({ isOpen, item, onDismiss, onCreated }) => {
  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} aria-label="Item creation modal">
      {isOpen && <CrudCreationModalForm item={item} onDismiss={onDismiss} onCreated={onCreated} />}
    </Modal>
  );
};
