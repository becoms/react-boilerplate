import { Tire } from "@/api/tires/type";
import { useCreateTire } from "@/api/tires/mutations";
import { Button } from "@/components/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import { Sheet, SheetContent } from "@/components/sheet";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { TireForm } from "../form/tire.form";

export function CreateTireDialog() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const createTire = useCreateTire();

  const onSubmit = async (values: Partial<Tire>) => {
    await createTire.mutateAsync(values, {
      onSuccess: () => {
        setDialogOpen(false);
        toast.success("Le pneu a été créé avec succès");
      },
      onError: (e: Error) => {
        toast.error(`Nous n'avons pas pu créer le pneu : ${e.message}`);
      },
    });
  };

  const onFormCancel = () => setDialogOpen(false);

  return (
    <>
      <Button onClick={() => setDialogOpen(true)}>
        <PlusIcon /> Nouveau pneu
      </Button>
      <Sheet open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild></DialogTrigger>

        <SheetContent>
          <DialogHeader>
            <DialogTitle>Nouveau pneu</DialogTitle>
            <DialogDescription>
              Complétez le formulaire pour créer un nouveau pneu
            </DialogDescription>
          </DialogHeader>
          <TireForm onSubmit={onSubmit} onCancel={onFormCancel} />
        </SheetContent>
      </Sheet>
    </>
  );
}
