import { Fragment } from "react";
import Link from "next/link";

export default function Breadcrumbs({ items = [], style, className }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        flexWrap: "wrap",
        ...style,
      }}
      className={className}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <Fragment key={`${item.label}-${index}`}>
            {item.to ? (
              <Link
                href={item.to}
                prefetch={true}
                style={{
                  fontSize: 11,
                  color: "#8b6320",
                  textDecoration: "none",
                }}
              >
                {item.label}
              </Link>
            ) : (
              <span
                style={{
                  fontSize: 11,
                  color: "#b09080",
                }}
              >
                {item.label}
              </span>
            )}

            {!isLast && (
              <span
                style={{
                  fontSize: 11,
                  color: "#d4b896",
                }}
              >
                ›
              </span>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
