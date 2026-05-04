/**
 * @typedef {{
 *  label: string,
 *  sub: string,
 *  icon: React.ReactNode
 * }} TrustItem
 */

export default function TrustStrip() {
  /** @type {TrustItem[]} */
  const items = [
    {
      label: "Local Store",
      sub: "Nizamabad, Telangana",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 14 14"
        >
          <rect
            x="2"
            y="4"
            width="10"
            height="8"
            rx="1"
            fill="none"
            stroke="#8b6320"
            strokeWidth="1.2"
          />

          <path
            d="M 4 4 L 4 3 Q 4 1 7 1 Q 10 1 10 3 L 10 4"
            fill="none"
            stroke="#8b6320"
            strokeWidth="1.2"
          />
        </svg>
      ),
    },

    {
      label: "New Stock",
      sub: "Every week",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 14 14"
        >
          <polygon
            points="7,1 8.5,5 13,5 9.5,8 11,12 7,9.5 3,12 4.5,8 1,5 5.5,5"
            fill="none"
            stroke="#8b6320"
            strokeWidth="1.2"
          />
        </svg>
      ),
    },

    {
      label: "Latest Trends",
      sub: "Ethnic & modern",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 14 14"
        >
          <path
            d="M 2 10 Q 3 4 7 3 Q 11 4 12 10"
            fill="none"
            stroke="#8b6320"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          <circle
            cx="7"
            cy="11"
            r="2"
            fill="none"
            stroke="#8b6320"
            strokeWidth="1.2"
          />
        </svg>
      ),
    },
  ];

  return (
    <div
      style={{
        background: "#f5efe4",
        padding: "20px 24px",
        display: "grid",
        gridTemplateColumns:
          "repeat(3, 1fr)",
        gap: 12,
        borderTop:
          "0.5px solid #e8d5b0",
        borderBottom:
          "0.5px solid #e8d5b0",
      }}
    >
      {items.map((item) => (
        <div
          key={item.label}
          style={{
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#fdf6ed",
              border:
                "0.5px solid #e8d5b0",
              display: "flex",
              alignItems: "center",
              justifyContent:
                "center",
              margin:
                "0 auto 8px",
            }}
          >
            {item.icon}
          </div>

          <div
            style={{
              fontSize: 11,
              color: "#2d0a1c",
              fontWeight: 500,
              lineHeight: 1.4,
            }}
          >
            {item.label}
          </div>

          <div
            style={{
              fontSize: 10,
              color: "#b09080",
              marginTop: 3,
              lineHeight: 1.4,
            }}
          >
            {item.sub}
          </div>
        </div>
      ))}
    </div>
  );
}