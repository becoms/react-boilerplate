import { useFindOneTireOptions } from "@/api/tires/queries";
import { Tire } from "@/api/tires/type";
import { Page, PageHeader } from "@/components/page";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ErrorPage from "../error.page";
import { DeleteTireDialog } from "./dialogs/delete-tire.dialog";
import { LoadingSpinner } from "@/components/loadingIndicator";
import { EditTireDialog } from "./dialogs/edit-tire.dialog";
import { Card, CardContent } from "@/components/card";
import { Label } from "@radix-ui/react-label";
import { Badge } from "@/components/badge";
import { Separator } from "@/components/separator";
import { Barcode, Calendar, Factory, FileText } from "lucide-react";
import { formatDate } from "@/utils/date.utils";

export const DetailsPage = () => {
  const params = useParams();
  console.log("🚀 ~ DetailsPage ~ params:", params)
  const tireOptions = useFindOneTireOptions(params.id ?? "");
  const tire = useQuery(tireOptions);

  if (!tire.isFetching && !tire.data) return <ErrorPage />;

  return (
    <Page title={tire.data?.cai ?? "Détails du pneu"}>
      {tire.isFetching ? (
        <LoadingSpinner className="h-5" />
      ) : (
        tire.data && (
          <>
            <PageHeader>
              <div>
                <span className="text-foreground/60">Créé par</span>
                <span className="font-semibold text-foreground/80">
                  {" "}
                  {tire.data.createdBy ?? "Système"}{" "}
                </span>
                {tire.data.createdDate && (
                  <>
                    <span className="text-foreground/60"> le </span>
                    <span className="font-semibold text-foreground/80">
                      {new Date(tire.data.createdDate).toLocaleString("fr-FR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                    <span className="text-foreground/60"> à </span>
                    <span className="font-semibold text-foreground/80">
                      {new Date(tire.data.createdDate).toLocaleString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </>
                )}
              </div>
              <div className="flex justify-end gap-3">
                <EditTireDialog tire={tire.data} />
                <DeleteTireDialog tire={tire.data} />
              </div>
            </PageHeader>

            <TireDetails tire={tire.data} />
          </>
        )
      )}
    </Page>
  );
};

function TireDetails({ tire }: { tire: Tire }) {
  return (
    <div className="overflow-hidden mb-5">
      <Card>
        <CardContent className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-5 w-5" />
              <h3 className="text-sm font-medium">Référence commerciale</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-muted-foreground">CAI</Label>
                <p className="font-mono text-lg font-semibold">{tire.cai}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Barcode className="h-5 w-5" />
              <h3 className="text-sm font-medium">Codes-barres</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-muted-foreground">Code-barres FIA</Label>
                <p className="font-mono">
                  {tire.fiaBarcode || (
                    <span className="text-muted-foreground">Non renseigné</span>
                  )}
                </p>
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">
                  Code-barres de routage
                </Label>
                <p className="font-mono">
                  {tire.routingBarcode || (
                    <span className="text-muted-foreground">Non renseigné</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-5 w-5" />
              <h3 className="text-sm font-medium">Fabrication</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-muted-foreground">
                  Date de fabrication
                </Label>
                <p>
                  {tire.tireManufactureDate ? (
                    formatDate(tire.tireManufactureDate)
                  ) : (
                    <span className="text-muted-foreground">Non renseignée</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Factory className="h-5 w-5" />
              <h3 className="text-sm font-medium">Usine</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-muted-foreground">Trigram</Label>
                {tire.factoryTrigram ? (
                  <Badge variant="secondary" className="font-mono">
                    {tire.factoryTrigram}
                  </Badge>
                ) : (
                  <p className="text-muted-foreground">Non renseigné</p>
                )}
              </div>
            </div>
          </div>

          {tire.importDate && (
            <>
              <Separator />
              <div>
                <h3 className="text-sm font-medium mb-3">
                  Informations d'import
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">
                      Date d'import
                    </Label>
                    <p>
                      {formatDate(tire.importDate)}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
