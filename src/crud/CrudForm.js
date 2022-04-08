/** @jsxImportSource @emotion/react */
import { FormProvider, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import "twin.macro";
import { PrimaryButton } from "../shared/Buttons";
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
  const { register, formState: { errors } } = useForm();

  return (
    <div tw="grid grid-cols-1 gap-6" {...props}>
      <input type="hidden" name="_id" ref={register()} />

      <FormGroup>
        <Label>Nom</Label>
        <Input {...register("name", { required: true })} />
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

      <FormGroup tw="col-span-1 sm:col-span-full">
        <Label>Couleur</Label>
        <CheckBox {...register("color", { required: true })} />
        <Label>Bleu</Label>
        <CheckBox {...register("color", { required: true })} />
        <Label>Jaune</Label>
        <CheckBox {...register("color", { required: true })} />
        <Label>Rouge</Label>
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
  const { mutateAsync: upsertTire, status, data } = useUpsertMutation();
  const onSubmit = async (data) => {
    await upsertTire(data);
  };
  const { handleSubmit } = formProps;

  return (
    <FormProvider {...formProps}>
      {data && <Navigate to={ROUTE_PATH} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Panel>
          <PanelContent>
            <CrudFormFields tw="sm:grid-cols-3" />
          </PanelContent>
          <PanelFooter>
            <PrimaryButton type="submit" disabled={status === "loading"}>
              Save
            </PrimaryButton>
          </PanelFooter>
        </Panel>
      </form>
    </FormProvider>
  );
};

/** Form only displayed when Modal is open to allow form to be initialized with the tire defaultValues */
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
          <ModalButton as={PrimaryButton} type="submit" disabled={status === "loading"}>
            Save
          </ModalButton>
          <ModalButton onClick={onDismiss} type="button">
            Cancel
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
