import { useState } from "react";

/** @type {(initialState: boolean | (() => boolean) => ({ isOpen: boolean, onOpen: () => void, onClose: () => void, onToggle: () => void })} =>  */
export const useDisclosure = (initialState) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onToggle = () => setIsOpen((isOpen) => !isOpen);
  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  };
};
