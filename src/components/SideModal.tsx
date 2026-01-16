import { XIcon } from "lucide-react";
import { PageTitle } from "./page";
import { Dialog, DialogContent } from "./dialog";

interface SideModalProps {
  open: boolean;
  setOpen: (bool: boolean) => void;
  title?: string;
  isDetails?: boolean;
  isTissueModale?: boolean;
  children: React.ReactNode;
  onDelete?: () => void;
}

const SideModal = ({
  open,
  setOpen,
  children,
  title,
}: SideModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="relative z-40">
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div className="relative flex h-full flex-col gap-4 overflow-y-scroll bg-white py-6 px-8 shadow-xl rounded-tl-lg">
                <div>
                  <div className="flex w-full justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="relative z-10 rounded-md bg-white text-gray-400  hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      <span className="sr-only">Close panel</span>
                      <XIcon
                        aria-hidden="true"
                        className="h-6 border rounded-md"
                      />
                    </button>
                  </div>
                  {title && <PageTitle>{title}</PageTitle>}
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SideModal;
