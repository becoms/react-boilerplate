import { useState, useRef } from "react";
import {
  Upload,
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
  InfoIcon,
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
import { Spinner } from "@/components/spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/tooltip";
import { Progress } from "@/components/progress";
import { ImportResponse, useImport } from "@/api/tires/import.mutation";


export const ImportDialog = () => {
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
      setImportResult(undefined);
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
    } finally {
      // Remove selected file so if user clicks import again, he will be asked to select another file
      setSelectedFile(undefined);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleReset = () => {
    setSelectedFile(undefined);
    setImportResult(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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
        <UploadIcon /> Import
      </Button>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl! max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Import</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            {!importResult ? (
              <>
                <div className="text-sm text-muted-foreground">
                  Sélectionnez un fichier CSV contenant les données des convives à
                  importer.
                </div>
                <div className="flex gap-4 items-center">
                  <div className="flex items-center gap-4">
                    <input
                      ref={fileInputRef}
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
              </>
            ) : (
              <div className="space-y-4">
                <Alert>
                  <AlertTitle>
                    <div className="flex items-center gap-2 mb-2">
                      {(importResult.current ?? 0) > 0 ? (
                        <AlertCircle className="h-4 w-4" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      )}
                      {(importResult.current ?? 0) > 0
                        ? `${importResult.current} / ${importResult.total}`
                        : `${importResult.total} / ${importResult.total}`}
                    </div>
                  </AlertTitle>
                  <AlertDescription>
                    {(importResult.current ?? 0) > 0 ? (
                      <Progress
                        value={
                          ((importResult.current ?? 0) /
                            (importResult.total ?? 1)) *
                          100
                        }
                      />
                    ) : (
                      "L'importation du fichier CSV est terminée."
                    )}
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center p-4 border rounded-lg">
                    <CheckCircle2 className="h-8 w-8 text-green-600 mb-2" />
                    <div className="text-2xl font-bold">
                      {importResult?.created}
                    </div>
                    <div className="text-sm text-muted-foreground">Créés</div>
                  </div>
                  <div className="flex flex-col items-center p-4 border rounded-lg">
                    <AlertCircle className="h-8 w-8 text-yellow-600 mb-2" />
                    <div className="text-2xl font-bold">
                      {importResult?.ignored}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      Ignorés
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Les lignes ignorées sont celles déjà présentes dans la base de données.
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="flex flex-col items-center p-4 border rounded-lg">
                    <XCircle className="h-8 w-8 text-red-600 mb-2" />
                    <div className="text-2xl font-bold">
                      {importResult?.errors}
                    </div>
                    <div className="text-sm text-muted-foreground">Erreurs</div>
                  </div>
                </div>

                {(importResult?.errorDetails?.length || 0) > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">
                      Détails des erreurs :
                    </h4>
                    <div className="max-h-48 overflow-y-auto border rounded-lg p-2 space-y-1">
                      {importResult?.errorDetails?.map((error, index) => (
                        <div key={index} className="text-sm text-red-600">
                          <span className="font-medium">Ligne {error.row} :</span>{" "}
                          {error.error}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <DialogFooter>
            {selectedFile ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={(importResult?.current ?? 0) > 0}
                >
                  Annuler
                </Button>
                <Button
                  onClick={handleImport}
                  disabled={!selectedFile || (importResult?.current ?? 0) > 0}
                >
                  {(importResult?.current ?? 0) > 0 ? (
                    <>
                      <Spinner className="mr-2 h-4 w-4" />
                      Import en cours...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Importer
                    </>
                  )}
                </Button>
              </>
            ) : (
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={(importResult?.current ?? 0) > 0}
              >
                Fermer
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
