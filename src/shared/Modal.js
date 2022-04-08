/** @jsxImportSource @emotion/react */
import { DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";
import "twin.macro";
import { Button } from "./Buttons";

export const Modal = ({ isOpen, onDismiss, children, ...props }) => {
  return isOpen
    ? (
      <DialogOverlay
        tw="fixed z-10 inset-0 overflow-y-auto bg-transparent"
        onDismiss={onDismiss}
      >
        <div tw="flex items-end justify-center min-h-screen pt-20 text-center sm:block sm:p-0">
          {/* Off-canvas menu overlay, show/hide based on off-canvas menu state. */}
          <div tw="fixed inset-0">
            <div tw="absolute inset-0 bg-gray-500 opacity-75" />
          </div>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span tw="hidden sm:inline-block sm:align-middle sm:h-screen" />

          {/* Off-canvas menu, show/hide based on off-canvas menu state. */}
          <DialogContent
            tw="inline-block align-bottom bg-white rounded-t-lg sm:rounded-lg px-4 pt-5 pb-4 text-left shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 m-0 w-full"
            {...props}
          >
            {children}
          </DialogContent>
        </div>
      </DialogOverlay>
      )
    : "";
};

export const ModalActions = (props) => {
  return (
    <div
      tw="flex flex-col mt-5 space-y-3 sm:(mt-4 flex-row-reverse space-y-0 space-x-3 space-x-reverse)"
      {...props}
    />
  );
};

export const ModalButton = ({ as: Component = Button, ...props }) => {
  return <Component tw="w-full justify-center sm:w-auto" {...props} />;
};
