import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export default function ProductImageGallery({ images = [], alt = "" }) {
  const normalizedImages = useMemo(
    () => (Array.isArray(images) ? images.filter(Boolean) : []),
    [images]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollerRef = useRef(null);
  const rafRef = useRef(null);

  const scrollToIndex = useCallback(
    (index) => {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const safeIndex = clamp(index, 0, normalizedImages.length - 1);
      const width = scroller.clientWidth || 0;
      scroller.scrollTo({ left: safeIndex * width, behavior: "smooth" });
    },
    [normalizedImages.length]
  );

  const syncActiveFromScroll = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const width = scroller.clientWidth || 1;
    const nextIndex = clamp(
      Math.round(scroller.scrollLeft / width),
      0,
      Math.max(0, normalizedImages.length - 1)
    );
    setActiveIndex(nextIndex);
  }, [normalizedImages.length]);

  const onScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(syncActiveFromScroll);
  }, [syncActiveFromScroll]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    // If the scroller size changes (responsive layout), keep it snapped to the active slide.
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const handler = () => {
      const width = scroller.clientWidth || 0;
      scroller.scrollTo({ left: activeIndex * width, behavior: "auto" });
    };

    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [activeIndex]);

  if (!normalizedImages.length) {
    return (
      <div
        style={{
          width: "100%",
          aspectRatio: "1",
          background: "#fbeaf2",
          borderRadius: 12,
          border: "0.5px solid #e8d5b0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div style={{ fontSize: 60, color: "#c9a84c" }}>✦</div>
      </div>
    );
  }

  return (
    <div>
      {/* Main preview (swipeable carousel) */}
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden"
        style={{
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
          borderRadius: 12,
        }}
        aria-label="Product images"
      >
        {normalizedImages.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="w-full shrink-0 snap-center"
            style={{ paddingBottom: 0 }}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: "1",
                background: "#fbeaf2",
                borderRadius: 12,
                border: "0.5px solid #e8d5b0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img
                src={src}
                alt={alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: "block",
                }}
                loading={i === 0 ? "eager" : "lazy"}
                draggable={false}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Thumbnails */}
      {normalizedImages.length > 1 && (
        <div
          className="[&::-webkit-scrollbar]:hidden"
          style={{
            display: "flex",
            gap: 8,
            overflowX: "auto",
            scrollbarWidth: "none",
            paddingTop: 12,
          }}
          aria-label="Image thumbnails"
        >
          {normalizedImages.map((src, i) => {
            const isActive = activeIndex === i;
            return (
              <button
                key={`thumb-${src}-${i}`}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`View image ${i + 1}`}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 10,
                  overflow: "hidden",
                  border: isActive ? "1.5px solid #2d0a1c" : "0.5px solid #e8d5b0",
                  cursor: "pointer",
                  flexShrink: 0,
                  padding: 0,
                  background: "transparent",
                }}
              >
                <img
                  src={src}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                  loading="lazy"
                  draggable={false}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
