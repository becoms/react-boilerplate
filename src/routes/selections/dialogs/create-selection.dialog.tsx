import { Button } from "@/components/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { SelectionForm } from "../form/selection.form";
import { Sheet, SheetContent } from "@/components/sheet";

export function CreateSelectionDialog() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const onSubmit = async (_: unknown) => {};

  const onFormCancel = () => setDialogOpen(false);

  return (
    <>
      <Button onClick={() => setDialogOpen(true)}>
        <PlusIcon /> Nouvelle sélection
      </Button>
      <Sheet open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild></DialogTrigger>

        <SheetContent>
          <DialogHeader>
            <DialogTitle>Nouvelle sélection</DialogTitle>
            <DialogDescription>
              Complétez le formulaire pour créer une nouvelle sélection
            </DialogDescription>
          </DialogHeader>
          <SelectionForm onSubmit={onSubmit} onCancel={onFormCancel} />
        </SheetContent>
      </Sheet>
    </>
  );
}
