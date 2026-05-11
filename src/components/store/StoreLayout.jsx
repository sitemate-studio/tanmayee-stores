"use client";

import { usePathname } from "next/navigation";
import AnnouncementBar from "./AnnouncementBar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";

export default function StoreLayout({ children }) {
  const pathname = usePathname();
  const hideFloatingWhatsApp = /^\/[^/]+\/[^/]+\/?$/.test(pathname || "");

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
      {!hideFloatingWhatsApp && <WhatsAppButton />}
    </div>
  );
}