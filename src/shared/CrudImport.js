/** @jsxImportSource @emotion/react */
import { useEffect, useMemo, useState } from "react";
import { useId } from "@reach/auto-id";
import "twin.macro";
import { readExcelFile } from "../functions/Import";
import { Alert } from "./Modal";
import { ImportButton } from "./Buttons";
import { handleError } from "../functions/ErrorHandling";

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
    handleError(upsertError).then((errMsg) => setMessage(errMsg));
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
      <ImportButton as="label" status={globalStatus} htmlFor={id}>
        Importer
      </ImportButton>
      <Alert message={message} setMessage={setMessage} />
    </>
  );
};
