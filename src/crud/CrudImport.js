/** @jsxImportSource @emotion/react */
import { DocumentAddIcon } from "@heroicons/react/solid";
import { useId } from "@reach/auto-id";
import { useMutation } from "react-query";
import "twin.macro";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import { MenuItem } from "../shared/Menu";
import { useUpsertMutation } from "./CrudQueries";

export const CrudImport = () => {
  const { mutateAsync: upsertItem } = useUpsertMutation();
  const { mutateAsync: importFile, status } = useMutation(
    async (file) => {
      const { default: ExcelJS } = await import("exceljs");
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(file);
      const worksheet = workbook.getWorksheet(1);
      const rows = [];
      worksheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
        const tirf = row.getCell(1).value;
        const serialNumber = row.getCell(5).value;
        const dto = row.getCell(5).value?.substr(0, 8);
        const dimension = row.getCell(3).value;
        if (rowNumber > 4 && tirf && serialNumber) {
          rows.push({
            tirf,
            dto,
            dimension,
            serialNumber,
          });
        }
      });

      for (const row of rows) {
        const { tirf, dto: dtoValue, serialNumber } = row;

        const item = {
          tirf,
          dto: dtoValue,
          serialNumber,
        };

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
      <MenuItem as="label" tw="cursor-pointer" disabled={status === "loading"} htmlFor={id}>
        {status === "loading" ? <LoadingIndicator /> : <DocumentAddIcon />}
        Import
      </MenuItem>
    </>
  );
};
