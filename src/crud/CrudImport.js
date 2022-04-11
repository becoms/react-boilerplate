/** @jsxImportSource @emotion/react */
import { DocumentAddIcon } from "@heroicons/react/solid";
import { useId } from "@reach/auto-id";
import { useMutation } from "react-query";
import "twin.macro";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import { Button } from "../shared/Buttons";

/**
 * Fields is the list of columns to import.
 * FieldsProcessors is the list of function (matching fields index) to apply to each cell value
 */
export const CrudImport = ({ fields, fieldsProcessors, upsertItem }) => {
  const defaultProcessor = (val) => val;
  const { mutateAsync: importFile, status } = useMutation(
    async (file) => {
      const { default: ExcelJS } = await import("exceljs");
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(file);
      const worksheet = workbook.getWorksheet(1);
      const items = [];
      worksheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
        if (rowNumber !== 1) { // ignore header
          const item = {};
          for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            const fieldProcessors = fieldsProcessors[i] ?? defaultProcessor;
            const value = fieldProcessors(row.getCell(i + 1).value);
            item[field] = value;
          }
          items.push(item);
        }
      });

      for (const item of items) {
        try {
          await upsertItem(item);
        } catch (error) {
          console.error("Failed to insert item", item, error);
        }
      }
    },
    {
      onMutate: () => {
        console.log("Importing items to the app...");
        console.log("Importing items from the XLSX file to the app");
      },
      onSuccess: () => {
        console.log("Items imported!");
        console.log("Items are imported successfully");
      },
    }
  );

  const id = useId();

  const handleImportFile = async (e) => {
    const file = e.target.files[0];
    importFile(file);
  };

  return (
    <>
      <input
        type="file"
        tw="sr-only"
        id={id}
        disabled={status === "loading"}
        onChange={handleImportFile}
      />
      <Button as="label" tw="cursor-pointer" disabled={status === "loading"} htmlFor={id}>
        {status === "loading" ? <LoadingIndicator tw="h-5 w-5" /> : <DocumentAddIcon tw="h-5 w-5" />}
        Importer
      </Button>
    </>
  );
};
