import { useUpdateSelection } from "@/api/selections/update-selection.mutation";
import { Button } from "@/components/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import { PenBoxIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { TourSelection } from "@/api/selections/find-all-selections.options";
import { SelectionForm } from "../form/selection.form";
import { Sheet, SheetContent } from "@/components/sheet";

export function EditSelectionDialog({
  selection,
}: {
  selection: TourSelection;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const updateSelection = useUpdateSelection();

  const onSubmit = async (values: Partial<TourSelection>) => {
    await updateSelection.mutateAsync(
      {
        selectionData: values,
        id: selection._id,
      },
      {
        onSuccess: () => {
          setDialogOpen(false);
          toast.success("Vos modifications ont bien été sauvegardées");
        },
        onError: (e: Error) => {
          toast.error(
            `Nous n'avons pas pu sauvegarder vos modifications : ${e.message}`
          );
        },
      }
    );
  };

  const onFormCancel = () => setDialogOpen(false);

  return (
    <>
      <Button variant="ghost" onClick={() => setDialogOpen(true)}>
        <PenBoxIcon />
      </Button>
      <Sheet open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild></DialogTrigger>

        <SheetContent>
          <DialogHeader>
            <DialogTitle>Modifiez la sélection {selection.name}</DialogTitle>
            <DialogDescription>
              N'oubliez pas de cliquer sur "Sauvegarder" pour modifier la
              sélection.
            </DialogDescription>
          </DialogHeader>
          <SelectionForm
            defaultValues={selection}
            onSubmit={onSubmit}
            onCancel={onFormCancel}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}
