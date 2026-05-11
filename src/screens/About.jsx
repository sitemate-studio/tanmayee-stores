import Breadcrumbs from "@/components/store/Breadcrumbs";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import SocialLink from "@/components/contact/SocialLink";
import { STORE_CONFIG, STORE_HOURS, WHATSAPP_URL } from "@/lib/storeData";

const VALUES = [
  {
    title: "Trusted Quality",
    desc: "Carefully selected imitation jewellery and clothing from reliable suppliers",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8b6320" strokeWidth="1.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
  {
    title: "New Stock Weekly",
    desc: "Fresh arrivals every week so there is always something new to find",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8b6320" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  },
  {
    title: "Customer First",
    desc: "Friendly service and a warm shopping experience every visit",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8b6320" strokeWidth="1.5" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  },
  {
    title: "Affordable Prices",
    desc: "Premium look at prices that work for everyday budgets",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8b6320" strokeWidth="1.5" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  },
];

const OFFERS = [
  { title: "Jewellery & Accessories", sub: "Necklace sets, bangles, Jhumka earrings, Chandbali, Mangalsutra and more" },
  { title: "Sarees", sub: "Traditional sarees with decorative borders for all occasions" },
  { title: "Dress Materials", sub: "Unstitched and semi-stitched suit pieces and fabrics" },
  { title: "Ready-to-wear", sub: "Long gowns, nighties and maxi dresses in various colours and patterns" },
  { title: "Handbags & Purses", sub: "Modern ladies handbags, clutches and purses for everyday and occasions" },
  { title: "Hair Accessories", sub: "Colourful hair scrunchies, clips and bands for all hair types" },
];

export default function About() {
  const waUrl = WHATSAPP_URL;
  const mapsUrl = STORE_CONFIG.googleMapsStore;

  return (
    <div style={{ background: "#fdf6ed", minHeight: "100vh" }}>

      {/* Breadcrumb */}
      <div style={{ padding: "14px 24px", borderBottom: "0.5px solid #e8d5b0" }} className="max-[480px]:!px-4">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "About Us" }]} />
      </div>

      {/* Hero */}
      <div style={{ background: "#2d0a1c", padding: "52px 24px 48px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }} className="max-[480px]:!px-4 max-[480px]:!py-10">
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <div style={{ width: 48, height: 0.5, background: "#4a1a2c" }} />
          <div style={{ width: 8, height: 8, background: "#c9a84c", transform: "rotate(45deg)" }} />
          <div style={{ width: 48, height: 0.5, background: "#4a1a2c" }} />
        </div>
        <div style={{ fontSize: 10, color: "#9a6050", letterSpacing: 4, textTransform: "uppercase", marginBottom: 14 }}>Our Story</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(32px, 6vw, 54px)", color: "#f0c96e", lineHeight: 1.2, marginBottom: 8 }}>
          Tanmayee Fancy Store
        </h1>
        <div style={{ fontSize: 16, color: "#7a5060", marginBottom: 22 }}>తన్మయీ ఫ్యాన్సీ స్టోర్</div>
        <p style={{ fontSize: 14, color: "#c9a0a8", lineHeight: 1.8, maxWidth: 480 }}>
          Nizamabad's favourite destination for ethnic fashion, jewellery and accessories — bringing beauty and tradition to every woman's wardrobe.
        </p>
      </div>

      {/* Story */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "52px 24px", borderBottom: "0.5px solid #e8d5b0" }} className="max-[480px]:!px-4 max-[480px]:!py-9">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }} className="max-[680px]:!grid-cols-1 max-[680px]:!gap-7">
          <div style={{ aspectRatio: "4/5", background: "#fbeaf2", borderRadius: 12, border: "0.5px solid #e8d5b0", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="120" height="120" viewBox="0 0 48 48">
              <path d="M 8 16 Q 24 34 40 16" fill="none" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round"/>
              <circle cx="8" cy="16" r="3.5" fill="#c9a84c"/>
              <circle cx="40" cy="16" r="3.5" fill="#c9a84c"/>
              <circle cx="14" cy="22" r="2.5" fill="#e8c97a"/>
              <circle cx="24" cy="29" r="3" fill="#f0d48a"/>
              <circle cx="34" cy="23" r="2.5" fill="#e8c97a"/>
              <line x1="24" y1="32" x2="24" y2="38" stroke="#c9a84c" strokeWidth="1.2"/>
              <polygon points="24,38 19,45 24,48 29,45" fill="#c9a84c"/>
              <circle cx="24" cy="43" r="2.5" fill="#fbeaf2"/>
              <circle cx="24" cy="43" r="1.2" fill="#c9a84c"/>
            </svg>
          </div>
          <div>
            <span style={{ fontSize: 10, color: "#8b6320", letterSpacing: 3, textTransform: "uppercase", marginBottom: 10, display: "block" }}>Who we are</span>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: "#2d0a1c", marginBottom: 18, lineHeight: 1.3, letterSpacing: -0.3 }}>A store built on love for ethnic fashion</h2>
            <p style={{ fontSize: 13, color: "#5a3a2a", lineHeight: 1.9, marginBottom: 14 }}>
              Tanmayee Fancy Store was born out of a simple belief — every woman deserves to feel beautiful without spending a fortune. Located in the heart of Nizamabad, Telangana, we have been serving local women with a wide range of ethnic jewellery, sarees, dress materials, and fashion accessories.
            </p>
            <p style={{ fontSize: 13, color: "#5a3a2a", lineHeight: 1.9, marginBottom: 14 }}>
              From colourful silk thread bangles to gold-tone necklace sets, from traditional sarees to modern ready-to-wear gowns — our store brings together the best of ethnic and contemporary fashion under one roof.
            </p>
            <p style={{ fontSize: 13, color: "#5a3a2a", lineHeight: 1.9 }}>
              We pride ourselves on being a trusted neighbourhood store where customers feel at home. Our collection is refreshed regularly so there is always something new to discover.
            </p>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{ background: "#2d0a1c", padding: "36px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 0.5px 1fr 0.5px 1fr", gap: 0 }} className="max-[480px]:!grid-cols-1 max-[480px]:!gap-6">
          {[
            { num: "500+", label: "Products in store" },
            null,
            { num: "8+", label: "Categories" },
            null,
            { num: "Daily", label: "New arrivals" },
          ].map((item, i) =>
            item === null ? (
              <div key={i} style={{ background: "#4a1a2c" }} className="max-[480px]:hidden" />
            ) : (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: "#f0c96e", fontWeight: 700, lineHeight: 1, marginBottom: 6 }}>{item.num}</div>
                <div style={{ fontSize: 11, color: "#9a6878", letterSpacing: 1 }}>{item.label}</div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Values */}
      <div style={{ background: "#fff9f2", borderTop: "0.5px solid #e8d5b0", borderBottom: "0.5px solid #e8d5b0", padding: "52px 24px" }} className="max-[480px]:!px-4 max-[480px]:!py-9">
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <span style={{ fontSize: 10, color: "#8b6320", letterSpacing: 3, textTransform: "uppercase", display: "block", marginBottom: 8 }}>Why choose us</span>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: "#2d0a1c", letterSpacing: -0.3 }}>What makes us different</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="max-[720px]:!grid-cols-2 max-[400px]:!gap-3">
            {VALUES.map((v, i) => (
              <div key={i} style={{ background: "#fdf6ed", border: "0.5px solid #e8d5b0", borderRadius: 12, padding: "24px 16px", textAlign: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", border: "0.5px solid #e8d5b0", background: "#fff9f2", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                  {v.icon}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#2d0a1c", marginBottom: 6, lineHeight: 1.3 }}>{v.title}</div>
                <div style={{ fontSize: 11, color: "#b09080", lineHeight: 1.6 }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What we offer */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "52px 24px", borderBottom: "0.5px solid #e8d5b0" }} className="max-[480px]:!px-4 max-[480px]:!py-9">
        <div style={{ marginBottom: 28 }}>
          <span style={{ fontSize: 10, color: "#8b6320", letterSpacing: 3, textTransform: "uppercase", display: "block", marginBottom: 10 }}>Our collection</span>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: "#2d0a1c", letterSpacing: -0.3 }}>What we offer</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }} className="max-[500px]:!grid-cols-1">
          {OFFERS.map((o, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: 16, background: "#fff9f2", border: "0.5px solid #e8d5b0", borderRadius: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#c9a84c", flexShrink: 0, marginTop: 5 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#2d0a1c", marginBottom: 3 }}>{o.title}</div>
                <div style={{ fontSize: 11, color: "#b09080", lineHeight: 1.5 }}>{o.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Come visit us label */}
      <div style={{ background: "#f5efe4", padding: "8px 24px", display: "flex", alignItems: "center", gap: 14, borderTop: "0.5px solid #e8d5b0", borderBottom: "0.5px solid #e8d5b0" }}>
        <div style={{ flex: 1, height: 0.5, background: "#d4b896" }} />
        <div style={{ fontSize: 10, color: "#9a7060", letterSpacing: 3, textTransform: "uppercase", whiteSpace: "nowrap" }}>Come visit us</div>
        <div style={{ flex: 1, height: 0.5, background: "#d4b896" }} />
      </div>

      {/* Visit section */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "52px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }} className="max-[640px]:!grid-cols-1 max-[640px]:!gap-7 max-[480px]:!px-4 max-[480px]:!py-9">
        <div>
          <span style={{ fontSize: 10, color: "#8b6320", letterSpacing: 3, textTransform: "uppercase", display: "block", marginBottom: 10 }}>Find us</span>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: "#2d0a1c", marginBottom: 18, letterSpacing: -0.3 }}>We'd love to see you in store</h2>
          <div style={{ fontSize: 13, color: "#5a3a2a", lineHeight: 2, marginBottom: 20 }}>
            <strong style={{ color: "#2d0a1c", fontWeight: 600, display: "block", marginBottom: 4 }}>Tanmayee Fancy Store</strong>
            Nizamabad, Telangana, India
          </div>
          <div style={{ background: "#fff9f2", border: "0.5px solid #e8d5b0", borderRadius: 10, padding: 16, marginBottom: 20 }}>
            <div style={{ fontSize: 11, color: "#8b6320", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>Store Hours</div>
            {STORE_HOURS.map((h, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#5a3a2a", padding: "5px 0", borderBottom: i < STORE_HOURS.length - 1 ? "0.5px solid #f0e4d0" : "none" }}>
                <span style={{ color: "#8b6320" }}>{h.day}</span>
                <span>{h.time}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <a
              href={STORE_CONFIG.googleMapsStore}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#f0c96e", color: "#2d0a1c", padding: "13px 20px", borderRadius: 6, fontSize: 13, fontWeight: 600, textDecoration: "none" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2d0a1c" strokeWidth="2" strokeLinecap="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5" fill="#2d0a1c" stroke="none"/></svg>
              Get Directions on Google Maps
            </a>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#25d366", color: "#fff", padding: "13px 20px", borderRadius: 6, fontSize: 13, fontWeight: 600, textDecoration: "none" }}
            >
              <WhatsAppIcon fill="#fff" size={18} />
              Message us on WhatsApp
            </a>
          </div>
        </div>

        {/* Map placeholder */}
        <div style={{ borderRadius: 12, overflow: "hidden", border: "0.5px solid #e8d5b0", background: "#f5efe4", aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 10 }}>
          <iframe
            title="Store Location"
            src="https://maps.google.com/maps?q=Nizamabad,Telangana,India&output=embed"
            style={{ width: "100%", height: "100%", border: "none", display: "block" }}
            loading="lazy"
          />
        </div>
      </div>

      {/* WhatsApp CTA */}
      <div style={{ background: "#2d0a1c", padding: "40px 24px" }} className="max-[480px]:!px-4 max-[480px]:!py-8">
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}
          className="max-[600px]:!flex-col max-[600px]:!items-start">
          <div>
            <div style={{ fontSize: 10, color: "#9a6050", letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>Quickest way to reach us</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 22, color: "#f0c96e", marginBottom: 6, lineHeight: 1.3 }}>Have a question? WhatsApp us.</div>
            <div style={{ fontSize: 12, color: "#9a6878", lineHeight: 1.7 }}>Ask about a product, check availability, or enquire about a custom order — we reply fast during store hours.</div>
          </div>
          <a href={waUrl} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#25d366", color: "#fff", padding: "14px 24px", borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none", flexShrink: 0, whiteSpace: "nowrap" }}
            className="max-[600px]:!w-full max-[600px]:!justify-center">
            <WhatsAppIcon fill="#fff" size={20} />
            Start WhatsApp Chat
          </a>
        </div>
      </div>

      {/* Social strip */}
      <div style={{ background: "#f5efe4", borderTop: "0.5px solid #e8d5b0", borderBottom: "0.5px solid #e8d5b0", padding: "20px 24px" }} className="max-[480px]:!px-4">
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, color: "#8b6320", fontWeight: 500 }}>Find us online</span>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <SocialLink href="#" icon={<svg viewBox="0 0 24 24" fill="none" stroke="#6b3a2a" strokeWidth="1.8" strokeLinecap="round" style={{ width: 14, height: 14 }}><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="#6b3a2a" stroke="none"/></svg>} label="Instagram" />
            <SocialLink href={mapsUrl} target="_blank" icon={<svg viewBox="0 0 24 24" fill="none" stroke="#6b3a2a" strokeWidth="1.8" strokeLinecap="round" style={{ width: 14, height: 14 }}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5" fill="#6b3a2a" stroke="none"/></svg>} label="Google Maps" />
            <SocialLink href={waUrl} target="_blank" icon={<WhatsAppIcon fill="#25d366" size={14} />} label="WhatsApp" />
          </div>
        </div>
      </div>

    </div>
  );
}
