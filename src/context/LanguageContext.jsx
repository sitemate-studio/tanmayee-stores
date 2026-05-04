import React, { createContext, useContext, useState } from "react";

/** @type {React.Context<any>} */
const LanguageContext = createContext(null);

/**
 * @param {{ children: React.ReactNode }} props
 */
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLang must be used inside LanguageProvider");
  }

  return context;
}