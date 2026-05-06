import { useState } from "react";
import Breadcrumbs from "@/components/store/Breadcrumbs";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import InfoCard from "@/components/contact/InfoCard";
import SocialLink from "@/components/contact/SocialLink";
import { STORE_CONFIG, STORE_HOURS, WHATSAPP_URL } from "@/lib/storeData";

const waUrl = WHATSAPP_URL;
const mapsUrl = STORE_CONFIG.googleMapsStore;

const HOURS = STORE_HOURS.map((h, index) => ({
  ...h,
  today: index === 0,
}));

export default function Contact() {
  const [form, _setForm] = useState({ name: "", phone: "", message: "" });

  const _handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Hi! I'm ${form.name}.\nPhone: ${form.phone}\n\n${form.message}`;
    window.open(`${waUrl}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div style={{ background: "#fdf6ed", minHeight: "100vh" }}>

      {/* Breadcrumb */}
      <div style={{ padding: "14px 24px", borderBottom: "0.5px solid #e8d5b0" }} className="max-[480px]:!px-4">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Contact" }]} />
      </div>

      {/* Hero */}
      <div style={{ background: "#2d0a1c", padding: "44px 24px 40px", textAlign: "center" }} className="max-[480px]:!px-4 max-[480px]:!py-9">
        <div style={{ fontSize: 10, color: "#9a6050", letterSpacing: 4, textTransform: "uppercase", marginBottom: 12 }}>Get in touch</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(28px, 5vw, 46px)", color: "#f0c96e", lineHeight: 1.2, marginBottom: 6 }}>
          We're here for you
        </h1>
        <div style={{ fontSize: 15, color: "#7a5060", marginBottom: 16 }}>మాతో సంప్రదించండి</div>
        <p style={{ fontSize: 13, color: "#c9a0a8", lineHeight: 1.7, maxWidth: 400, margin: "0 auto" }}>
          Visit us in store, call us, or send a WhatsApp message — we're happy to help you find exactly what you're looking for.
        </p>
      </div>

      {/* Quick reach strip */}
      <div style={{ background: "#fff9f2", borderBottom: "0.5px solid #e8d5b0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }} className="max-[600px]:!grid-cols-1">
          {[
            {
              href: waUrl, target: "_blank",
              icon: <WhatsAppIcon fill="#25d366" size={20} />,
              iconBg: "#e6f9ef", iconBorder: "#c0e8ce",
              label: "WhatsApp", value: STORE_CONFIG.phone || "+91 XXXXX XXXXX", hint: "Quickest way to reach us",
              borderRight: true,
            },
            {
              href: `tel:${STORE_CONFIG.phoneTel || STORE_CONFIG.phone}`,
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b4060" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 16z"/>
                </svg>
              ),
              iconBg: "#fbeaf2", iconBorder: "#f0c9d8",
              label: "Call Us", value: STORE_CONFIG.phone || "+91 XXXXX XXXXX", hint: "Mon – Sun, 10am to 8pm",
              borderRight: true,
            },
            {
              href: mapsUrl, target: "_blank",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b6320" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5" fill="#8b6320" stroke="none"/>
                </svg>
              ),
              iconBg: "#faf0e4", iconBorder: "#e8d5b0",
              label: "Visit the Store", value: "Nizamabad, Telangana", hint: "Get directions on Google Maps",
            },
          ].map((item, i) => (
            <a key={i} href={item.href} target={item.target} rel="noopener noreferrer"
              style={{ padding: "24px 20px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 10, borderRight: item.borderRight ? "0.5px solid #e8d5b0" : "none", textDecoration: "none" }}
              className="hover:bg-[#fdf6ed] transition-colors max-[600px]:!border-r-0 max-[600px]:![border-bottom:0.5px_solid_#e8d5b0] max-[600px]:last:border-b-0"
            >
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: item.iconBg, border: `0.5px solid ${item.iconBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {item.icon}
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#2d0a1c" }}>{item.label}</div>
              <div style={{ fontSize: 11, color: "#8b6320" }}>{item.value}</div>
              <div style={{ fontSize: 10, color: "#b09080" }}>{item.hint}</div>
            </a>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}
        className="max-[680px]:!grid-cols-1 max-[680px]:!gap-8 max-[480px]:!px-4 max-[480px]:!pt-7">

        {/* Info column */}
        <div>
          <span style={{ fontSize: 10, color: "#8b6320", letterSpacing: 3, textTransform: "uppercase", display: "block", marginBottom: 8 }}>Store details</span>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: "#2d0a1c", marginBottom: 20, letterSpacing: -0.3, lineHeight: 1.3 }}>Everything you need to know</h2>

          {/* Address card */}
          <InfoCard
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b6320" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5" fill="#8b6320" stroke="none"/></svg>}
            label="Address" value="Tanmayee Fancy Store" sub="Nizamabad, Telangana, India"
            link={{ href: mapsUrl, target: "_blank", text: "Open in Google Maps" }}
          />

          {/* Phone card */}
          <InfoCard
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b6320" strokeWidth="1.8" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 16z"/></svg>}
            label="Phone" value={STORE_CONFIG.phone || "+91 XXXXX XXXXX"} sub="Available during store hours"
            link={{ href: `tel:${STORE_CONFIG.phoneTel || STORE_CONFIG.phone}`, text: "Tap to call" }}
          />

          {/* WhatsApp card */}
          <InfoCard
            icon={<WhatsAppIcon fill="#25d366" size={18} />} iconBg="#e6f9ef" iconBorder="#c0e8ce"
            label="WhatsApp" value={STORE_CONFIG.phone || "+91 XXXXX XXXXX"}
            sub="Send us a message anytime — we reply during store hours"
            link={{ href: waUrl, target: "_blank", text: "Open WhatsApp chat", color: "#25d366" }}
          />

          {/* Hours */}
          <div style={{ background: "#fff9f2", border: "0.5px solid #e8d5b0", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", background: "#f5efe4", borderBottom: "0.5px solid #e8d5b0", display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b6320" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#2d0a1c", letterSpacing: 0.5 }}>Store Hours</span>
              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#3a8a4a" }} />
                <span style={{ fontSize: 10, color: "#3a8a4a", fontWeight: 500 }}>Open today</span>
              </div>
            </div>
            <div>
              {HOURS.map((h, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 18px", borderBottom: i < HOURS.length - 1 ? "0.5px solid #f0e4d0" : "none", background: h.today ? "#fdf6ed" : "transparent" }}>
                  <span style={{ fontSize: 12, color: h.today ? "#8b6320" : "#6b3a2a", fontWeight: h.today ? 600 : 400 }}>{h.day}</span>
                  <span style={{ fontSize: 12, color: h.today ? "#8b6320" : "#2d0a1c", fontWeight: 500 }}>{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map column */}
        <div>
          <span style={{ fontSize: 10, color: "#8b6320", letterSpacing: 3, textTransform: "uppercase", display: "block", marginBottom: 8 }}>Find us</span>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: "#2d0a1c", marginBottom: 20, letterSpacing: -0.3, lineHeight: 1.3 }}>We're in Nizamabad</h2>

          <div style={{ borderRadius: 12, overflow: "hidden", border: "0.5px solid #e8d5b0", aspectRatio: "4/3", marginBottom: 14 }}>
            <iframe
              title="Store Location"
              src="https://maps.google.com/maps?q=Nizamabad,Telangana,India&output=embed"
              style={{ width: "100%", height: "100%", border: "none", display: "block" }}
              loading="lazy"
            />
          </div>

          <a href={mapsUrl} target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#f0c96e", color: "#2d0a1c", padding: "13px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none", marginBottom: 12 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2d0a1c" strokeWidth="2" strokeLinecap="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5" fill="#2d0a1c" stroke="none"/></svg>
            Get Directions on Google Maps
          </a>

          <InfoCard
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b6320" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>}
            label="Region" value="Nizamabad, Telangana"
            sub="We serve customers across Nizamabad and surrounding areas. WhatsApp us for enquiries from other cities."
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