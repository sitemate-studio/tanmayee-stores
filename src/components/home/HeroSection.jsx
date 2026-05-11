import Link from "next/link";

/**
 * Decorative necklace illustration
 */
function NecklaceSVG() {
  return (
    <svg
      width="240"
      height="100"
      viewBox="0 0 200 88"
      style={{ marginBottom: 6 }}
    >
      <path
        d="M 20 16 Q 100 70 180 16"
        fill="none"
        stroke="#c9a84c"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      <circle cx="20" cy="16" r="5" fill="#c9a84c" />
      <circle cx="180" cy="16" r="5" fill="#c9a84c" />

      <circle cx="20" cy="16" r="2.5" fill="#2d0a1c" />
      <circle cx="180" cy="16" r="2.5" fill="#2d0a1c" />

      <circle cx="38" cy="30" r="4" fill="#e8c97a" />
      <circle cx="60" cy="47" r="4" fill="#e8c97a" />
      <circle cx="82" cy="58" r="4.5" fill="#f0d48a" />
      <circle cx="100" cy="62" r="5" fill="#f5e09a" />
      <circle cx="118" cy="58" r="4.5" fill="#f0d48a" />
      <circle cx="140" cy="47" r="4" fill="#e8c97a" />
      <circle cx="162" cy="31" r="4" fill="#e8c97a" />

      <line
        x1="100"
        y1="67"
        x2="100"
        y2="74"
        stroke="#c9a84c"
        strokeWidth="1.8"
      />

      <polygon
        points="100,74 93,83 100,90 107,83"
        fill="#c9a84c"
      />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section
      className="flex flex-col items-center text-center"
      style={{
        background: "#2d0a1c",
        padding: "48px 24px 40px",
      }}
    >
      <NecklaceSVG />

      <h1
        style={{
          fontFamily:
            "'Playfair Display', serif",
          fontStyle: "italic",
          fontSize:
            "clamp(40px, 8vw, 72px)",
          color: "#f0c96e",
          lineHeight: 1,
          marginBottom: 6,
        }}
      >
        Tanmayee
      </h1>

      <div
        className="flex items-center justify-center"
        style={{
          gap: 14,
          marginBottom: 8,
        }}
      >
        <div
          style={{
            width: 40,
            height: 1,
            background: "#4a1a2c",
          }}
        />

        <div
          style={{
            fontSize: 10,
            color: "#9a6050",
            letterSpacing: 4,
            textTransform:
              "uppercase",
          }}
        >
          Fancy Store
        </div>

        <div
          style={{
            width: 40,
            height: 1,
            background: "#4a1a2c",
          }}
        />
      </div>

      <div
        style={{
          fontSize: 16,
          color: "#9a7060",
          marginBottom: 20,
        }}
      >
        తన్మయీ ఫ్యాన్సీ స్టోర్
      </div>

      <p
        style={{
          fontSize: 14,
          color: "#c9a0a8",
          lineHeight: 1.7,
          marginBottom: 28,
          maxWidth: 420,
        }}
      >
        Your one-stop destination
        for ethnic fashion,
        jewellery & accessories
      </p>

      <Link
        href="/collections"
        style={{
          background: "#f0c96e",
          color: "#2d0a1c",
          padding: "14px 36px",
          borderRadius: 6,
          fontSize: 14,
          fontWeight: 600,
          textDecoration: "none",
          display: "inline-block",
        }}
      >
        Browse Collection
      </Link>
    </section>
  );
}