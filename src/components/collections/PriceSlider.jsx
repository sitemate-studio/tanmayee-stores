import { useRef } from "react";

export default function PriceSlider({ min, max, value, onChange }) {
  const rangeRef = useRef(null);

  const handleMin = (e) => {
    const v = Math.min(Number(e.target.value), value[1] - 1);
    onChange([v, value[1]]);
  };

  const handleMax = (e) => {
    const v = Math.max(Number(e.target.value), value[0] + 1);
    onChange([value[0], v]);
  };

  const minPct = ((value[0] - min) / (max - min)) * 100;
  const maxPct = ((value[1] - min) / (max - min)) * 100;

  return (
    <div style={{ padding: "0 4px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <span style={{ fontSize: 11, color: "#8b6320", fontWeight: 600 }}>
          ₹{value[0].toLocaleString("en-IN")}
        </span>
        <span style={{ fontSize: 11, color: "#8b6320", fontWeight: 600 }}>
          ₹{value[1].toLocaleString("en-IN")}
        </span>
      </div>

      <div ref={rangeRef} style={{ position: "relative", height: 20 }}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: 0,
            right: 0,
            height: 4,
            background: "#e8d5b0",
            borderRadius: 2,
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: `${minPct}%`,
            right: `${100 - maxPct}%`,
            height: 4,
            background: "#c9a84c",
            borderRadius: 2,
          }}
        />

        <input
          type="range"
          min={min}
          max={max}
          value={value[0]}
          onChange={handleMin}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            opacity: 0,
            cursor: "pointer",
            zIndex: 2,
          }}
        />

        <input
          type="range"
          min={min}
          max={max}
          value={value[1]}
          onChange={handleMax}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            opacity: 0,
            cursor: "pointer",
            zIndex: 3,
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: `${minPct}%`,
            transform: "translate(-50%, -50%)",
            width: 16,
            height: 16,
            background: "#2d0a1c",
            border: "2px solid #c9a84c",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: `${maxPct}%`,
            transform: "translate(-50%, -50%)",
            width: 16,
            height: 16,
            background: "#2d0a1c",
            border: "2px solid #c9a84c",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      </div>
    </div>
  );
}
