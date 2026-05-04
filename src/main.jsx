import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.jsx";
import { LanguageProvider } from "@/context/LanguageContext.jsx";
import "@/index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </React.StrictMode>
  );
}