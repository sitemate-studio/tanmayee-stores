export default function SocialLink({ href, target, icon, label }) {
  return (
    <a
      href={href}
      target={target}
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "8px 14px",
        borderRadius: 6,
        border: "0.5px solid #d4b896",
        background: "#fdf6ed",
        fontSize: 12,
        color: "#6b3a2a",
        textDecoration: "none",
      }}
      className="hover:border-[#c9a84c] transition-colors"
    >
      {icon}
      {label}
    </a>
  );
}
