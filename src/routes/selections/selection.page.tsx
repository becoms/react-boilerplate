
import { Page, PageHeader, PageTitle } from "@/components/page";
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
import { CreateSelectionDialog } from "./dialogs/create-selection.dialog";
import { DeleteSelectionDialog } from "./dialogs/delete-selection.dialog";
import { EditSelectionDialog } from "./dialogs/edit-selection.dialog";
import { Empty, EmptyDescription, EmptyTitle } from "@/components/empty";
import { findAllSelectionsOptions } from "@/api/selections/find-all-selections.options";

export const SelectionPage = () => {
  return (
    <Page>
      <PageHeader>
        <div>
          <PageTitle>Sélections</PageTitle>
          <p className="text-sm text-muted-foreground">
            Configurez vos sélections pour le doublage des tournées
          </p>
        </div>
        <CreateSelectionDialog />
      </PageHeader>
      <SelectionsList />
    </Page>
  );
};

function SelectionsList() {
  const selections = useQuery(findAllSelectionsOptions());

  if (!selections.isFetching && !selections.data?.totalCount)
    return (
      <Empty>
        <EmptyTitle>No selection</EmptyTitle>
        <EmptyDescription>Create your first selection.</EmptyDescription>
      </Empty>
    );

  return (
    <div className="overflow-hidden mb-5 rounded-md border">
      <Table className="pb-2">
        <TableHeader>
          <TableRow>
            <TableHead>
              <span>Kitchen</span>
            </TableHead>
            <TableHead>
              <span>Name</span>
            </TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selections.isFetching &&
            Array.from(Array(3)).map((_, index) => (
              <TableRow key={index}>
                {Array.from(Array(3)).map((_, index) => (
                  <TableCell key={index}>
                    <Skeleton className="h-[20px] w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          {!selections.isFetching &&
            selections.data?.list.map((row) => (
              <TableRow key={row._id}>
                <TableCell>
                  <span>{row.kitchenId}</span>
                </TableCell>
                <TableCell>
                  <span>{row.name}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <EditSelectionDialog selection={row} />
                    <DeleteSelectionDialog selection={row} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
