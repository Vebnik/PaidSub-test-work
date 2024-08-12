import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

export const useModalStore = create<ModalStore>()((set) => ({
  isOpen: false,
  setOpen: (isOpen) => {
    return set({ isOpen });
  },
}));

interface ModalStore {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

export const useCardModalStore = create<ModalStore>()((set) => ({
  isOpen: false,
  setOpen: (isOpen) => {
    return set({ isOpen });
  },
}));
