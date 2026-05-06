import { WHATSAPP_URL } from "@/lib/storeData";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: 28,
        right: 24,
        background: "#25d366",
        borderRadius: 24,
        padding: "10px 16px 10px 12px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        zIndex: 999,
        textDecoration: "none",
        boxShadow: "0 2px 12px rgba(37,211,102,0.25)",
      }}
      className="animate-wa-pulse"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon fill="#fff" size={20} />
      <span style={{ fontSize: 12, color: "#fff", fontWeight: 500 }}>WhatsApp</span>
    </a>
  );
}