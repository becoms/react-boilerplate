import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  InfoIcon,
  UploadIcon,
  ChevronsUpDownIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/tooltip";
import { Progress } from "@/components/progress";
import { ImportResponse } from "@/api/tires/import.mutation";
import { Button } from "@/components/button";
import { Spinner } from "@/components/spinner";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/collapsible";


export const ImportReport = ({ importResult }: { importResult: ImportResponse }) => {
  return (
    <div className="space-y-4">
      <section>
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
        <div>
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
        </div>
      </section>

      <section className="grid grid-cols-3 gap-4">
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
      </section>

      {(importResult?.errorDetails?.length || 0) > 0 && (
        <Collapsible className="space-y-2">
          <CollapsibleTrigger className="flex items-end gap-2 cursor-pointer">
            <div className="font-semibold text-sm">Détails des erreurs</div>
            <ChevronsUpDownIcon className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="max-h-48 overflow-y-auto border rounded-lg p-2 space-y-1">
            {importResult?.errorDetails?.map((error, index) => (
              <div key={index} className="text-sm text-red-600">
                <span className="font-medium">Ligne {error.row} :</span>{" "}
                {error.error}
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
};

type ImportButtonsProps = {
  importResult: ImportResponse | undefined;
  selectedFile: File | undefined;
  handleImport: () => void;
  handleClose: () => void;
  handleRetry: () => void;
};
export const ImportButtons = ({ importResult, selectedFile, handleImport, handleClose, handleRetry }: ImportButtonsProps) => {
  const numberOfProcessedRows = (importResult?.errors ?? 0) + (importResult?.ignored ?? 0) + (importResult?.created ?? 0);
  const totalRows = importResult?.total ?? 0;

  if (selectedFile && totalRows > 0 && numberOfProcessedRows === totalRows) {
    return (
      <Button
        type="button"
        variant="outline"
        onClick={handleRetry}
      >
        Recommencer
      </Button>
    );
  } else {
    return (
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
          {importResult ? (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              Import en cours...
            </>
          ) : (
            <>
              <UploadIcon className="mr-2 h-4 w-4" />
              Importer
            </>
          )}
        </Button>
      </>
    );
  }
};
