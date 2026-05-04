import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLang } from "@/context/LanguageContext";

const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/collections", label: "Collections" },
  { path: "/gallery", label: "Gallery" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

const NecklaceLogo = () => (
  <svg width="26" height="26" viewBox="0 0 44 44">
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

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const { lang, setLang } = useLang();

  return (
    <nav style={{ background: "#fdf6ed", borderBottom: "0.5px solid #e8d5b0", position: "sticky", top: 0, zIndex: 100 }}>
      <div className="px-6 py-[14px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-[10px] no-underline">
          <NecklaceLogo />
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 20, color: "#2d0a1c", lineHeight: 1 }}>
              Tanmayee
            </div>
            <span style={{ fontSize: 8, color: "#9a6050", letterSpacing: 2, textTransform: "uppercase", display: "block", marginTop: 2 }}>
              Fancy Store
            </span>
          </div>
        </Link>

        {/* Desktop nav + lang toggle */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                fontSize: 13,
                color: pathname === link.path ? "#2d0a1c" : "#6b3a2a",
                textDecoration: "none",
                letterSpacing: 0.3,
                fontWeight: pathname === link.path ? 600 : 400,
              }}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center border rounded-full overflow-hidden ml-1" style={{ borderColor: "#e8d5b0" }}>
            {[{code:"en",label:"EN"},{code:"te",label:"తె"},{code:"hi",label:"हि"}].map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                style={{
                  padding: "4px 10px",
                  fontSize: 11,
                  background: lang === l.code ? "#2d0a1c" : "transparent",
                  color: lang === l.code ? "#c9a84c" : "#9a6050",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] cursor-pointer p-2 bg-transparent border-none"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span style={{ width: 22, height: 1.5, background: "#2d0a1c", display: "block" }} />
          <span style={{ width: 22, height: 1.5, background: "#2d0a1c", display: "block" }} />
          <span style={{ width: 22, height: 1.5, background: "#2d0a1c", display: "block" }} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ background: "#fdf6ed", borderTop: "0.5px solid #e8d5b0" }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block",
                padding: "12px 24px",
                fontSize: 13,
                color: pathname === link.path ? "#2d0a1c" : "#6b3a2a",
                textDecoration: "none",
                fontWeight: pathname === link.path ? 600 : 400,
              }}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-1 px-6 py-3">
            {[{code:"en",label:"EN"},{code:"te",label:"తె"},{code:"hi",label:"हि"}].map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                style={{
                  padding: "6px 14px",
                  fontSize: 12,
                  background: lang === l.code ? "#2d0a1c" : "transparent",
                  color: lang === l.code ? "#c9a84c" : "#9a6050",
                  border: "0.5px solid #e8d5b0",
                  borderRadius: 20,
                  cursor: "pointer",
                }}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}