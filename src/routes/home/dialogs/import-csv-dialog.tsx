import { useState, useRef, PropsWithChildren, RefObject } from "react";
import {
  Upload,
  FileText,
  UploadIcon,
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
import { ImportButtons, ImportReport } from "./import-common";


export const ImportCsvDialog = () => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [importResult, setImportResult] = useState<
    ImportResponse | undefined
  >();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const importMutation = useImport();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (
      (file && file.type === "text/csv") ||
      (file && file.name.endsWith(".csv"))
    ) {
      setSelectedFile(file);
      setImportResult(undefined);
    }
  };

  const readFile = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsText(file, "Windows-1252");
    });
  };

  const handleImport = async () => {
    if (!selectedFile) return;

    try {
      setImportResult({
        created: 0,
        ignored: 0,
        errors: 0,
        errorDetails: [],
        total: 0,
      });
      const fileContent = await readFile(selectedFile);
      await importMutation.mutateAsync({
        csvContent: fileContent,
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

  const handleReset = () => {
    if ((importResult?.current ?? 0) === 0 || (importResult?.errors ?? 0) + (importResult?.ignored ?? 0) + (importResult?.created ?? 0) === (importResult?.total ?? 0)) {
      setSelectedFile(undefined);
      setImportResult(undefined);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    handleReset();
    setOpen(false);
  };

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <UploadIcon /> Import CSV
      </Button>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl! max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Import</DialogTitle>
          </DialogHeader>

          {!importResult ? <FileInputCsv ref={fileInputRef} handleFileSelect={handleFileSelect} selectedFile={selectedFile} /> : <ImportReport importResult={importResult} />}

          <DialogFooter>
            <ImportButtons importResult={importResult} selectedFile={selectedFile} handleImport={handleImport} handleClose={handleClose} handleRetry={handleReset} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const FileInputCsv = ({ ref, handleFileSelect, selectedFile }: PropsWithChildren<{ ref: RefObject<HTMLInputElement | null>; handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void, selectedFile: File | undefined }>) => {
  return (
    <div className="py-4 space-y-4">
      <div className="text-sm text-muted-foreground">
        Sélectionnez un fichier contenant les donnée à importer.
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-4">
          <input
            ref={ref}
            type="file"
            accept=".csv,text/csv"
            onChange={handleFileSelect}
            className="hidden"
            id="csv-file-input"
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
                Choisir un fichier CSV
              </span>
            </Button>
          </label>
          {selectedFile && (
            <div className="flex items-center gap-2 text-sm">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span>{selectedFile.name}</span>
            </div>
          )}
        </div>
        {!selectedFile && (
          <a
            href="/samples/client-import-example.csv"
            className="flex gap-1 items-center"
          >
            <FileText className="h-4 w-4 text-muted-foreground" />
            Fichier d'exemple
          </a>
        )}
      </div>
    </div>
  );
};
