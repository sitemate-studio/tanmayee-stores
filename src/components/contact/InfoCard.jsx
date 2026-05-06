export default function InfoCard({
  icon,
  iconBg = "#fdf6ed",
  iconBorder = "#e8d5b0",
  label,
  value,
  sub,
  link,
}) {
  return (
    <div
      style={{
        background: "#fff9f2",
        border: "0.5px solid #e8d5b0",
        borderRadius: 12,
        padding: 18,
        marginBottom: 12,
        display: "flex",
        alignItems: "flex-start",
        gap: 14,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: `0.5px solid ${iconBorder}`,
          background: iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div
          style={{
            fontSize: 10,
            color: "#b09080",
            letterSpacing: 1.5,
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "#2d0a1c",
            lineHeight: 1.5,
            marginBottom: 3,
          }}
        >
          {value}
        </div>
        {sub && (
          <div
            style={{
              fontSize: 11,
              color: "#b09080",
              lineHeight: 1.6,
            }}
          >
            {sub}
          </div>
        )}
        {link && (
          <a
            href={link.href}
            target={link.target}
            rel="noopener noreferrer"
            style={{
              fontSize: 11,
              color: link.color || "#8b6320",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              marginTop: 6,
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke={link.color || "#8b6320"}
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15,3 21,3 21,9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            {link.text}
          </a>
        )}
      </div>
    </div>
  );
}
