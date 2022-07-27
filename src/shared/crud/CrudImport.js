/** @jsxImportSource @emotion/react */
import { useEffect, useMemo, useState } from "react";
import * as ExcelJS from "exceljs";
import { useId } from "@reach/auto-id";
import "twin.macro";
import { Modal } from "../Modal";
import { PrimaryButton } from "../Buttons";

/**
 * Fields is the list of columns to import.
 * FieldsProcessors is the list of function (matching fields index) to apply to each cell value
 */
export const CrudImport = ({ fieldNames, fieldsProcessors, useUpsertManyMutation }) => {
  const [message, setMessage] = useState(undefined);
  const { mutateAsync: upsertItems, status: upsertStatus, error: upsertError } = useUpsertManyMutation(false);
  const [readStatus, setReadStatus] = useState(undefined);

  const id = useId();

  const handleImportFile = async (e) => {
    const file = e.target.files[0];
    try {
      const items = await readExcelFile(file, fieldNames, fieldsProcessors);
      upsertItems(items);
    } catch (err) {
      setReadStatus("error");
      setMessage(`${message}\n${err}`);
    }
  };

  const globalStatus = useMemo(() => readStatus === "success" ? upsertStatus : readStatus, [upsertStatus, readStatus]);
  useEffect(() => {
    console.log(upsertError);
  }, [upsertError]);

  return (
    <>
      <input
        type="file"
        tw="sr-only"
        id={id}
        disabled={globalStatus === "loading"}
        onChange={handleImportFile}
      />
      <PrimaryButton as="label" status={globalStatus} htmlFor={id}>
        Importer
      </PrimaryButton>
      <Modal message={message} setMessage={setMessage} />
    </>
  );
};

export const readExcelFile = async (file, fieldNames, fieldsProcessors) => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(file);
  const worksheet = workbook.getWorksheet(1);
  const items = [];
  worksheet.eachRow({ includeEmpty: true }, async (row, rowNumber) => {
    if (rowNumber !== 1) {
      // ignore header
      const item = {};
      for (let i = 0; i < fieldNames.length; i++) {
        const field = fieldNames[i];
        const fieldProcessors = fieldsProcessors[i] ?? ((val) => val);
        const value = row.getCell(i + 1).value;
        const processedValue = fieldProcessors(value);
        item[field] = processedValue;
      }
      items.push(item);
    }
  });
  return items;
};
