import { useEffect } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/**
 * @param {{
 *   images: Array<any>,
 *   activeIndex: number,
 *   onClose: () => void,
 *   onPrev: () => void,
 *   onNext: () => void
 * }} props
 */
export default function Lightbox({
  images,
  activeIndex,
  onClose,
  onPrev,
  onNext,
}) {
  useEffect(() => {
    /**
     * @param {KeyboardEvent} e
     */
    const handleKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }

      if (e.key === "ArrowLeft") {
        onPrev();
      }

      if (e.key === "ArrowRight") {
        onNext();
      }
    };

    document.addEventListener(
      "keydown",
      handleKey
    );

    document.body.style.overflow =
      "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleKey
      );

      document.body.style.overflow =
        "";
    };
  }, [onClose, onPrev, onNext]);

  const currentImage =
    images[activeIndex];

  return (
    <div className="fixed inset-0 z-[100] bg-foreground/90 flex items-center justify-center">
      <button
        onClick={onClose}
      >
        <X size={20} />
      </button>

      <button
        onClick={onPrev}
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={onNext}
      >
        <ChevronRight size={20} />
      </button>

      <img
        src={
          currentImage?.image_url ||
          currentImage
        }
        alt={
          currentImage?.caption_en ||
          ""
        }
      />

      <div>
        {activeIndex + 1} /{" "}
        {images.length}
      </div>
    </div>
  );
}