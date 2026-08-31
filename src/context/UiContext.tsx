import React, { createContext, useContext, useState, type ReactNode } from "react";

interface UiContextValue {
  mobileNavOpen: boolean;
  aiModalOpen: boolean;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  openMobileNav: () => void;
  closeMobileNav: () => void;
  openAiModal: () => void;
  closeAiModal: () => void;
}

const UiContext = createContext<UiContextValue | undefined>(undefined);

export function UiProvider({ children }: { children: ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const value: UiContextValue = {
    mobileNavOpen,
    aiModalOpen,
    searchQuery,
    setSearchQuery,
    openMobileNav: () => setMobileNavOpen(true),
    closeMobileNav: () => setMobileNavOpen(false),
    openAiModal: () => setAiModalOpen(true),
    closeAiModal: () => setAiModalOpen(false),
  };

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export function useUi() {
  const ctx = useContext(UiContext);
  if (!ctx) throw new Error("useUi must be used within a <UiProvider>");
  return ctx;
}
