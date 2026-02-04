import { useState, useRef, ChangeEvent, ForwardRefExoticComponent, RefAttributes, RefObject } from "react";
import {
  Upload,
  UploadIcon,
  ArrowRight,
  LucideProps,
  TableIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/dialog";
import { Button } from "@/components/button";
import { ImportResponse, useImport } from "@/api/tires/import.mutation";
import { Input } from "@/components/input";
import { toast } from "sonner";
import ExcelJS from "exceljs";
import { ImportButtons, ImportReport } from "./import-common";

type ImportXlsxDialogProps = {
  columns: {
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    model: string;
    label: string;
    format: string;
    formatLabel?: string;
    defaultValue: string;
  }[];
};

export const ImportXlsxDialog = (props: ImportXlsxDialogProps) => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [importResult, setImportResult] = useState<
    ImportResponse | undefined
  >();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const importMutation = useImport();


  const handleImport = async () => {
    if (!selectedFile) return;

    const fileData = await readDataFromXslx(columns, selectedFile as unknown as ExcelJS.Buffer);

    try {
      setImportResult({
        created: 0,
        ignored: 0,
        errors: 0,
        errorDetails: [],
        total: 0,
      });
      await importMutation.mutateAsync({
        jsonContent: fileData,
        onProgress: (progress) => {
          setImportResult(progress);
        },
      });
    } catch (error) {
      console.error("Error importing CSV:", error);
      setImportResult({
        created: 0,
        ignored: 0,
        errors: 1,
        errorDetails: [
          {
            row: 0,
            error:
              error instanceof Error
                ? error.message
                : "Une erreur est survenue lors de l'import",
          },
        ],
        total: 0,
      });
    }
  };

  const initializeColumns = (): Record<string, string> => {
    const initialState = {} as Record<string, string>;
    props.columns.forEach((column) => {
      const key = column.model
        .replace(/\s+/g, "");
      initialState[key] = column.defaultValue;
    });
    return initialState;
  };

  const [columns, setColumns] = useState(initializeColumns);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setColumns((prev) => ({
      ...prev,
      [name]: value.toUpperCase(),
    }));
  };

  const reset = () => {
    setSelectedFile(undefined);
    setImportResult(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const [open, setOpen] = useState(false);

  // Retry button
  const handleRetry = () => {
    reset();
  };

  // Close button
  const handleClose = () => {
    // Reset only if the import is not in progress
    if ((importResult?.current ?? 0) === 0 || (importResult?.errors ?? 0) + (importResult?.ignored ?? 0) + (importResult?.created ?? 0) === (importResult?.total ?? 0)) {
      reset();
    }
    setOpen(false);
  };

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <UploadIcon /> Import Excel
      </Button>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl! max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Import</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            {!importResult && (
              <>
                {selectedFile ? (
                  <ColumnsGenerator columns={importModalGroup.columns} handleInputChange={handleInputChange} />
                ) : (
                  <FileInputXlsx ref={fileInputRef} handleFileSelect={(file) => setSelectedFile(file)} />
                )}
              </>
            )}
            {importResult && <ImportReport importResult={importResult} />}
          </div>
          <DialogFooter>
            <ImportButtons importResult={importResult} selectedFile={selectedFile} handleImport={handleImport} handleClose={handleClose} handleRetry={handleRetry} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

type ColumnsGeneratorProps = {
  columns: ImportXlsxDialogProps["columns"];
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const ColumnsGenerator = ({
  columns,
  handleInputChange,
}: ColumnsGeneratorProps) => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-sm text-muted-foreground">
        Voici les colonnes qui seront importées depuis la première feuille du fichier Excel. Si besoin, vous pouvez modifier la lettre des colonnes correspondantes.
      </div>
      {/* Fields */}
      <div className="grid grid-cols-3 gap-2 mt-6">
        {columns.map((column) => (
          <div key={column.model} className="col-span-3 flex items-center gap-2">
            <div className="flex items-center relative">
              <TableIcon className="h-5 w-5 absolute left-2 text-emerald-600" />
              <Input
                type="text"
                className="w-full pl-10 focus:(outline-none ring-0 ring-offset-0 border-gray-300) placeholder:italic placeholder:text-xs"
                placeholder="Entrez la lettre de la colonne"
                defaultValue={column.defaultValue}
                onChange={handleInputChange}
              />
            </div>
            <ArrowRight className="h-4 w-4 text-gray-500" />
            <div className="flex flex-1 items-center gap-2 bg-gray-100 rounded-md p-2">
              <column.icon className="h-5 w-5 " />
              <p className="text-sm">{column.label}</p>
              { column.formatLabel && <p className="text-sm">{column.formatLabel}</p> }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export type FileData = Record<string, string>[];


const generateColumnReference = () =>
  Object.fromEntries(
    Array.from({ length: 26 }, (_, i) => [String.fromCharCode(65 + i), i + 1])
  ) as Record<string, number>;

const columnReference = generateColumnReference();

// Function to convert the choosen columns (letter) to cell numbers
const convertColumnsToCellNumbers = (columnsObject: {
  [key: string]: string;
}): { [key: string]: number } => {
  const result: { [key: string]: number } = {};

  for (const [key, value] of Object.entries(columnsObject)) {
    result[key] = columnReference[value];
  }
  return result;
};

// Function to get the data from the XSLX file
const readDataFromXslx = async (
  columns: Record<string, string>,
  file: ExcelJS.Buffer) => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(file);

  const worksheet = workbook.worksheets[0];
  if (!worksheet) throw new Error("No worksheet found");

  const columnMap = convertColumnsToCellNumbers(columns);
  const fileData: FileData = [];

  worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    if (rowNumber === 1) return; // skip header

    const rowData: Record<string, string> = {};
    for (const [key, cellNumber] of Object.entries(columnMap)) {
      const value = row.getCell(cellNumber).value;
      rowData[key] = value?.toString().trim() ?? "";
    }
    fileData.push(rowData);
  });

  return fileData;
};


const FileInputXlsx = ({
  ref,
  handleFileSelect,
}: { ref: RefObject<HTMLInputElement | null>; handleFileSelect: (file: File) => void }) => {
  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // reset input for re-selection

    if (!file) return;

    const isXLSX =
      file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.name.toLowerCase().endsWith(".xlsx");

    if (!isXLSX) {
      toast.error("Le document n'est pas un fichier .xlsx");
      return;
    }

    handleFileSelect(file);
  };
  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-sm text-muted-foreground">
        Sélectionnez un fichier contenant les données à importer.
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-4">
          <input
            type="file"
            accept=".xlsx"
            onChange={handleImportFile}
            className="hidden"
            id="csv-file-input"
            ref={ref}
          />
          <label htmlFor="csv-file-input">
            <Button
              type="button"
              variant="outline"
              asChild
              className="cursor-pointer"
            >
              <span>
                <Upload className="mr-2 h-4 w-4" />
                Choisir un fichier Excel
              </span>
            </Button>
          </label>
        </div>
      </div>
    </div>
  );
};

