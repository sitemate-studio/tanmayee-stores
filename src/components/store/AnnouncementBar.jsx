const ITEMS = [
  "New saree collection arrived",
  "✦",
  "Visit us in Nizamabad",
  "✦",
  "WhatsApp for custom orders",
  "✦",
  "New saree collection arrived",
  "✦",
  "Visit us in Nizamabad",
  "✦",
  "WhatsApp for custom orders",
  "✦",
];

export default function AnnouncementBar() {
  return (
    <div
      className="overflow-hidden py-[7px]"
      style={{
        background: "#2d0a1c",
      }}
    >
      <div className="animate-marquee whitespace-nowrap">
        {ITEMS.map((msg, i) => (
          <span
            key={i}
            className="inline-block px-8"
            style={{
              fontSize: 11,
              color: "#c9a84c",
              letterSpacing: 2,
            }}
          >
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}