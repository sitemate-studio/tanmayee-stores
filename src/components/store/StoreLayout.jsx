import { matchPath, Outlet, useLocation } from "react-router-dom";
import AnnouncementBar from "./AnnouncementBar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";

export default function StoreLayout() {
  const { pathname } = useLocation();
  const hideFloatingWhatsApp =
    matchPath("/:categorySlug/:productSlug", pathname) != null;

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      {!hideFloatingWhatsApp && <WhatsAppButton />}
    </div>
  );
}