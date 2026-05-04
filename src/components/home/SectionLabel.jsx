/**
 * @param {{
 *  text: string
 * }} props
 */
export default function SectionLabel({ text }) {
  return (
    <div
      className="flex items-center gap-[14px] px-6"
      style={{
        background: "#f5efe4",
        padding: "8px 24px",
        borderTop: "0.5px solid #e8d5b0",
        borderBottom: "0.5px solid #e8d5b0",
      }}
    >
      <div
        style={{
          flex: 1,
          height: 0.5,
          background: "#d4b896",
        }}
      />

      <div
        style={{
          fontSize: 10,
          color: "#9a7060",
          letterSpacing: 3,
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </div>

      <div
        style={{
          flex: 1,
          height: 0.5,
          background: "#d4b896",
        }}
      />
    </div>
  );
}