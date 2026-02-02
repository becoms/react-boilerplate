import { Tire } from "@/api/tires/type";
import { useUpdateTire } from "@/api/tires/mutations";
import { Button } from "@/components/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import { Sheet, SheetContent } from "@/components/sheet";
import { PenBoxIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { TireForm } from "../form/tire.form";

export function EditTireDialog({ tire }: { tire: Tire }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const updateTire = useUpdateTire(tire._id);

  const onSubmit = async (values: Partial<Tire>) => {
    await updateTire.mutateAsync(
      { tireData: values },
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
      <Button onClick={() => setDialogOpen(true)}>
        <PenBoxIcon /> Modifier
      </Button>
      <Sheet open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild></DialogTrigger>

        <SheetContent>
          <DialogHeader>
            <DialogTitle>Modifier le pneu {tire.cai}</DialogTitle>
            <DialogDescription>
              N'oubliez pas de cliquer sur "Sauvegarder" pour modifier le pneu.
            </DialogDescription>
          </DialogHeader>
          <TireForm
            defaultValues={tire}
            onSubmit={onSubmit}
            onCancel={onFormCancel}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}
