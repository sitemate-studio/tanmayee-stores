import Link from "next/link";
import { STORE_CONFIG } from "@/lib/storeData";

const LINKS = [
  { path: "/", label: "Home" },
  { path: "/collections", label: "Collections" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

const NecklaceLogo = () => (
  <svg width="32" height="32" viewBox="0 0 44 44">
    <path d="M 6 10 Q 22 30 38 10" fill="none" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="6" cy="10" r="3.5" fill="#c9a84c"/>
    <circle cx="38" cy="10" r="3.5" fill="#c9a84c"/>
    <circle cx="12" cy="17" r="2.5" fill="#8b6320"/>
    <circle cx="22" cy="23" r="3" fill="#c9a84c"/>
    <circle cx="32" cy="18" r="2.5" fill="#8b6320"/>
    <line x1="22" y1="26" x2="22" y2="32" stroke="#c9a84c" strokeWidth="1.5"/>
    <polygon points="22,32 17,39 22,44 27,39" fill="#c9a84c"/>
    <circle cx="22" cy="39" r="2.5" fill="#fdf6ed"/>
    <circle cx="22" cy="39" r="1.2" fill="#c9a84c"/>
  </svg>
);

export default function Footer() {
  return (
    <footer style={{ background: "#fdf6ed", padding: "28px 24px", borderTop: "0.5px solid #e8d5b0" }}>
      <Link href="/" prefetch={true} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, textDecoration: "none" }}>
        <NecklaceLogo />
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 20, color: "#2d0a1c", lineHeight: 1 }}>
            Tanmayee
          </div>
          <span style={{ fontSize: 8, color: "#9a6050", letterSpacing: 3, textTransform: "uppercase", display: "block", marginTop: 3 }}>
            Fancy Store
          </span>
        </div>
      </Link>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px", marginBottom: 14 }}>
        {LINKS.map((l) => (
          <Link key={l.path} href={l.path} prefetch={true} style={{ fontSize: 11, color: "#9a7060", textDecoration: "none" }}>
            {l.label}
          </Link>
        ))}
      </div>

      <div style={{ fontSize: 11, color: "#b09080", lineHeight: 1.8 }}>
        {STORE_CONFIG.address}<br />
        Open daily 10am – 8pm
      </div>

      <div style={{ fontSize: 10, color: "#d4b896", marginTop: 16, paddingTop: 16, borderTop: "0.5px solid #e8d5b0" }}>
        © {new Date().getFullYear()} Tanmayee Fancy Store
      </div>
    </footer>
  );
}