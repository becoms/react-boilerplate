import { useDeleteSelection } from "@/api/selections/delete-selection.mutation";
import { TourSelection } from "@/api/selections/find-all-selections.options";
import { Button } from "@/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function DeleteSelectionDialog({
  selection,
}: {
  selection: TourSelection;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const onDissmiss = () => {
    setDialogOpen(false);
  };
  const deleteSelection = useDeleteSelection();
  const onDeleteConfirm = async () => {
    await deleteSelection.mutateAsync(
      {
        id: selection._id,
      },
      {
        onSuccess: () => {
          setDialogOpen(false);
          toast.success(`La sélection ${selection.name} a été supprimée`);
          navigate("/controler/selections",);
        },
        onError: (e: Error) => {
          toast.error(
            `Nous n'avons pas pu supprimer la sélection : ${e.message}`
          );
        },
      }
    );
  };
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" onClick={() => setDialogOpen(true)}>
          <Trash2Icon className="text-destructive" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Êtes-vous sûr de vouloir supprimer la sélection "{selection.name}" ?
          </DialogTitle>
          <DialogDescription>
            Cette action est définitive et la sélection ne pourra plus être
            récupérée.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant={"outline"}
            onClick={onDissmiss}
            disabled={deleteSelection.isPending}
          >
            Annuler
          </Button>
          <Button
            variant={"destructive"}
            onClick={onDeleteConfirm}
            disabled={deleteSelection.isPending}
          >
            Supprimer la sélection
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
