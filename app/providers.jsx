"use client";

import { LanguageProvider } from "../src/context/LanguageContext.jsx";
import { Toaster } from "../src/components/ui/toaster";

export default function Providers({ children }) {
  return (
    <LanguageProvider>
      {children}
      <Toaster />
    </LanguageProvider>
  );
}
