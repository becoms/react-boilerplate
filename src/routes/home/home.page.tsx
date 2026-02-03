import { useFindAllTiresOptions } from "@/api/tires/queries";
import { Empty, EmptyDescription, EmptyTitle } from "@/components/empty";
import { Page, PageHeader } from "@/components/page";
import { Skeleton } from "@/components/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { useQuery } from "@tanstack/react-query";
import { ALargeSmallIcon, BarcodeIcon, Calendar1Icon, ChevronRightIcon, TextInitialIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CreateTireDialog } from "./dialogs/create-tire.dialog";
import { formatDate } from "@/utils/date.utils";
import { ImportCsvDialog } from "./dialogs/import-csv-dialog";
import { ImportXlsxDialog } from "./dialogs/import-xls-dialog";

// Must match import.service.ts columnsHeaders
const columns = [
  { icon: ALargeSmallIcon, model: "cai", label: "CAI", format: "^[a-zA-Z0-9]{6}$", defaultValue: "A" },
  { icon: TextInitialIcon, model: "cbl", label: "CBL", format: "^[a-zA-Z0-9]{256}$", defaultValue: "B" },
  { icon: BarcodeIcon, model: "cab_routage", label: "DATE_FIA", format: "^[a-zA-Z0-9]{8}$", defaultValue: "C" },
  { icon: BarcodeIcon, model: "cab_fia", label: "CAB FIA", format: "^[a-zA-Z0-9]{8}$", defaultValue: "D" },
  { icon: Calendar1Icon, model: "date_fia", label: "Date FIA", format: "^[a-zA-Z0-9]{19}$", formatLabel: "ex: 01/01/2026", defaultValue: "E" },
];

export const HomePage = () => {
  return (
    <Page title="Liste des codes à barres">
      <PageHeader>
        <div>
          <p className="text-sm text-muted-foreground">
            Gestions des pneus à l'individu
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ImportCsvDialog />
          <ImportXlsxDialog columns={columns} />
          <CreateTireDialog />
        </div>
      </PageHeader>
      <TiresList />
    </Page>
  );
};

function TiresList() {
  const navigate = useNavigate();
  const tiresOptions = useFindAllTiresOptions();
  const tires = useQuery(tiresOptions);

  if (!tires.isFetching && !tires.data?.totalCount)
    return (
      <Empty>
        <EmptyTitle>Pas de pneus</EmptyTitle>
        <EmptyDescription>
          Importez-les depuis un fichier.
        </EmptyDescription>
      </Empty>
    );

  return (
    <div className="overflow-hidden mb-5 rounded-md border">
      <Table className="pb-2">
        <TableHeader>
          <TableRow>
            <TableHead>
              <span>CAI</span>
            </TableHead>
            <TableHead>
              <span>Code-barres FIA</span>
            </TableHead>
            <TableHead>
              <span>Code-barres de routage</span>
            </TableHead>
            <TableHead>
              <span>Date de fabrication</span>
            </TableHead>
            <TableHead>
              <span>Usine</span>
            </TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tires.isFetching &&
            Array.from(Array(5)).map((_, index) => (
              <TableRow key={index}>
                {Array.from(Array(5)).map((_, index) => (
                  <TableCell key={index}>
                    <Skeleton className="h-8 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          {!tires.isFetching &&
            tires.data?.list.map((row) => (
              <TableRow
                key={row._id}
                className="cursor-pointer"
                onClick={() => navigate(row._id)}
              >
                <TableCell>
                  <span className="font-mono font-medium">{row.cai}</span>
                </TableCell>
                <TableCell>
                  <span className="font-mono text-sm">
                    {row.fiaBarcode || "-"}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-mono text-sm">
                    {row.routingBarcode || "-"}
                  </span>
                </TableCell>
                <TableCell>
                  <span>
                    {row.tireManufactureDate
                      ? formatDate(row.tireManufactureDate)
                      : "-"}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-foreground/75">
                    {row.factoryTrigram || "-"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <ChevronRightIcon className="h-5 w-auto text-foreground/50" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
