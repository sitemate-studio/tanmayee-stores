import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { STORE_CONFIG } from "@/lib/storeData";

const WA_ICON = (fill = "#fff", size = 20) => (
  <svg
    viewBox="0 0 24 24"
    fill={fill}
    style={{
      width: size,
      height: size,
      flexShrink: 0,
    }}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.112 1.523 5.84L.057 23.43a.5.5 0 0 0 .608.61l5.7-1.49A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.887 9.887 0 0 1-5.031-1.378l-.36-.214-3.733.977.999-3.645-.235-.374A9.862 9.862 0 0 1 2.1 12C2.1 6.534 6.534 2.1 12 2.1c5.466 0 9.9 4.434 9.9 9.9 0 5.466-4.434 9.9-9.9 9.9z" />
  </svg>
);

const WEEKLY_HOURS = [
  { label: "Sunday", time: "11:00 am – 7:00 pm" },
  { label: "Monday", time: "10:00 am – 8:00 pm" },
  { label: "Tuesday", time: "10:00 am – 8:00 pm" },
  { label: "Wednesday", time: "10:00 am – 8:00 pm" },
  { label: "Thursday", time: "10:00 am – 8:00 pm" },
  { label: "Friday", time: "10:00 am – 8:00 pm" },
  { label: "Saturday", time: "10:00 am – 9:00 pm" },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const todayIndex = new Date().getDay();

  const waUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}`;
  const mapsUrl = STORE_CONFIG.googleMaps;

  const hours = useMemo(() => {
    return WEEKLY_HOURS.map((item, index) => ({
      ...item,
      today: index === todayIndex,
    }));
  }, [todayIndex]);

  /**
   * @param {"name" | "phone" | "message"} field
   * @param {string} value
   */
  const handleInput = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /**
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const phone = form.phone.trim();

    if (!name || !phone) {
      alert("Please fill all required fields.");
      return;
    }

    const message = `
Hi! I'm ${name}

Phone: ${phone}

${form.message.trim()}
    `.trim();

    window.open(
      `${waUrl}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div style={{ background: "#fdf6ed", minHeight: "100vh" }}>
      <div style={{ padding: "14px 24px" }}>
        <Link to="/">Home</Link> / Contact
      </div>

      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: 24,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
        }}
      >
        <div>
          <form onSubmit={handleSubmit}>
            <InputField
              label="Name"
              value={form.name}
              onChange={(v) => handleInput("name", v)}
            />

            <InputField
              label="Phone"
              value={form.phone}
              onChange={(v) => handleInput("phone", v)}
            />

            <TextAreaField
              label="Message"
              value={form.message}
              onChange={(v) => handleInput("message", v)}
            />

            <button type="submit">
              {WA_ICON()}
              Send on WhatsApp
            </button>
          </form>
        </div>

        <div>
          <InfoCard
            label="Phone"
            value={STORE_CONFIG.phone}
          />

          <InfoCard
            label="Location"
            value={STORE_CONFIG.address}
          />

          <a href={mapsUrl} target="_blank" rel="noreferrer">
            Open Maps
          </a>

          <div style={{ marginTop: 20 }}>
            {hours.map((item, index) => (
              <div key={index}>
                {item.label}: {item.time}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20 }}>
            <SocialLink
              href={waUrl}
              label="WhatsApp"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * @param {{
 * label: string,
 * value: string,
 * onChange: (value: string) => void
 * }} props
 */
function InputField({ label, value, onChange }) {
  return (
    <div>
      <label>{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

/**
 * @param {{
 * label: string,
 * value: string,
 * onChange: (value: string) => void
 * }} props
 */
function TextAreaField({ label, value, onChange }) {
  return (
    <div>
      <label>{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

/**
 * @param {{
 * label: string,
 * value: string
 * }} props
 */
function InfoCard({ label, value }) {
  return (
    <div>
      <strong>{label}: </strong>
      {value}
    </div>
  );
}

/**
 * @param {{
 * href: string,
 * label: string
 * }} props
 */
function SocialLink({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {label}
    </a>
  );
}