"use client";

import { usePathname } from "next/navigation";

export default function PageNotFound() {
  const pathname = usePathname();
  const pageName = pathname?.substring(1) || "unknown";

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background: "#fdf6ed",
      }}
    >
      <div
        style={{
          maxWidth: 500,
          width: "100%",
          textAlign: "center",
        }}
      >
        <div
          style={{
            marginBottom: 20,
          }}
        >
          <h1
            style={{
              fontSize: 72,
              color: "#d4b896",
              margin: 0,
            }}
          >
            404
          </h1>

          <div
            style={{
              width: 60,
              height: 1,
              background: "#c9a84c",
              margin: "12px auto",
            }}
          />
        </div>

        <h2
          style={{
            fontSize: 28,
            color: "#2d0a1c",
            marginBottom: 12,
          }}
        >
          Page Not Found
        </h2>

        <p
          style={{
            color: "#6b3a2a",
            marginBottom: 30,
            lineHeight: 1.6,
          }}
        >
          The page "
          {pageName}
          " could not be found.
        </p>

        <button
          onClick={() => {
            window.location.href = "/";
          }}
          style={{
            background: "#2d0a1c",
            color: "#f0c96e",
            border: "none",
            padding: "12px 24px",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Go Home
        </button>
      </div>
    </div>
  );
}