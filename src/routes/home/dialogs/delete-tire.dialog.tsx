import { Tire } from "@/api/tires/type";
import { useDeleteTire } from "@/api/tires/mutations";
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

export function DeleteTireDialog({ tire }: { tire: Tire }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const onDissmiss = () => {
    setDialogOpen(false);
  };

  const deleteTire = useDeleteTire();

  const onDeleteConfirm = async () => {
    try {
      await deleteTire.mutateAsync({ id: tire._id });
      setDialogOpen(false);
            toast.success(`Le pneu ${tire.cai} a été supprimé`);
            navigate("../");
    } catch (e) {
      toast.error(`Nous n'avons pas pu supprimer le pneu : ${(e as Error).message}`);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={"destructive"} onClick={() => setDialogOpen(true)}>
          <Trash2Icon /> Supprimer
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Êtes-vous sûr de vouloir supprimer le pneu "{tire.cai}" ?
          </DialogTitle>
          <DialogDescription>
            Cette action est définitive et le pneu ne pourra plus être récupéré.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant={"outline"}
            onClick={onDissmiss}
            disabled={deleteTire.isPending}
          >
            Annuler
          </Button>
          <Button
            variant={"destructive"}
            onClick={onDeleteConfirm}
            disabled={deleteTire.isPending}
          >
            Supprimer le pneu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
