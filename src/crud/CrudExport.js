/** @jsxImportSource @emotion/react */
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import "twin.macro";
import { PrimaryButton } from "../shared/Buttons";
import { FormGroup, Input, Label, Select } from "../shared/Form";
import { Modal, ModalActions, ModalButton } from "../shared/Modal";
import { Filter } from "../shared/QueryHelpers";
import { useFetchItems } from "./CrudQueries";

/** @type {() => import("react-query").UseMutationResult<void, unknown, { status?: import("./CrudQueries").TireStatus, from?: Date, to?: Date }>} */
const useExportTiresToXSLXMutation = () => {
  const fetchItems = useFetchItems();
  return useMutation(async ({ session, status, from, to }) => {
    const items = await fetchItems({
      limit: 0,
      ...Filter.and(
        session && { session },
        status && { status },
        from && { statusUpdatedAt: { $gte: from } },
        to && { statusUpdatedAt: { $lte: to } }
      ),
    });
    const { default: ExcelJS } = await import("exceljs");
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Serial numbers");
    worksheet.addTable({
      name: "SerialNumbers",
      ref: "A1",
      columns: [{ name: "Serial number" }, { name: "Status" }, { name: "Status updated at" }],
      rows: items.map((tire) => {
        return [tire.serialNumber, tire.status, tire.statusUpdatedAt];
      }),
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const { saveAs } = await import("file-saver");
    const blob = new Blob([buffer]);
    let fileName = "export";
    if (status) {
      fileName += `-status[${status}]`;
    }
    if (from) {
      fileName += `-from[${from}]`;
    }
    if (to) {
      fileName += `-to[${to}]`;
    }
    saveAs(blob, `${fileName}.xlsx`);
  });
};

export const CrudExport = ({ isOpen, onDismiss }) => {
  const formProps = useForm({
    mode: "onSubmit",
    defaultValues: {
      session: null,
      status: null,
      from: null,
      to: null,
    },
  });
  const { handleSubmit, reset, register } = formProps;

  const { status, mutate: exportTiresToXLSX } = useExportTiresToXSLXMutation();
  const onExport = async (data) => {
    reset();
    exportTiresToXLSX(data);
  };

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} aria-label="Export tires modal">
      <FormProvider {...formProps}>
        <form onSubmit={handleSubmit(onExport)} tw="space-y-6">
          <FormGroup>
            <Label>Nom</Label>
            <Input {...register("name")} />
          </FormGroup>
          <FormGroup name="status">
            <Label>Statut</Label>
            <Select {...register("status")}>
              <option></option>
              {[{ value: "active", label: "Actif" }, { value: "archived", label: "Archivé" }].map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </FormGroup>
          <ModalActions>
            <ModalButton
              as={PrimaryButton}
              onClick={onDismiss}
              type="submit"
              disabled={status === "loading"}
            >
              Export
            </ModalButton>
            <ModalButton onClick={onDismiss} type="button">
              Cancel
            </ModalButton>
          </ModalActions>
        </form>
      </FormProvider>
    </Modal>
  );
};
