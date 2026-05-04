/**
 * @param {{
 *  settings?: Array<{
 *    key: string,
 *    value?: string,
 *    is_active?: boolean
 *  }>
 * }} props
 */
export default function SaleBanner({ settings = [] }) {
  const saleSetting = settings.find(
    (item) =>
      item.key === "sale_banner" &&
      item.is_active
  );

  if (!saleSetting) {
    return null;
  }

  return (
    <section
      style={{
        background: "#f0c96e",
        color: "#2d0a1c",
        padding: "16px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontWeight: 700,
          fontSize: "18px",
          margin: 0,
        }}
      >
        {saleSetting.value ||
          "🎉 Special Sale — Up to 30% off on selected items!"}
      </p>
    </section>
  );
}