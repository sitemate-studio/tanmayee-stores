import { STORE_CONFIG } from "@/lib/storeData";

/**
 * Store CTA section
 */
export default function CtaBar() {
  const mapsUrl = STORE_CONFIG.googleMaps;

  return (
    <div
      style={{
        background: "#2d0a1c",
        padding: "20px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          color: "#9a6878",
          fontSize: 12,
          lineHeight: 1.8,
        }}
      >
        <strong
          style={{
            color: "#f0c96e",
            display: "block",
            fontSize: 15,
            marginBottom: 2,
          }}
        >
          Visit us in Nizamabad
        </strong>

        Mon – Sun · 10 am to 8 pm
      </div>

      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: "#f0c96e",
          color: "#2d0a1c",
          fontSize: 12,
          fontWeight: 600,
          padding: "9px 16px",
          borderRadius: 6,
          textDecoration: "none",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#2d0a1c"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />

          <circle
            cx="12"
            cy="9"
            r="2.5"
            fill="#2d0a1c"
            stroke="none"
          />
        </svg>

        Get Directions
      </a>
    </div>
  );
}