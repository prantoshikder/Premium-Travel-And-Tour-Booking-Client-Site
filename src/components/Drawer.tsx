"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Side = "left" | "right" | "top" | "bottom";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  side?: Side;
  /** Panel width (left/right) or height (top/bottom). Any CSS size. */
  size?: string;
  /** Extra classes for the sliding panel. */
  className?: string;
  /** Close when the backdrop is clicked. Default true. */
  closeOnBackdrop?: boolean;
  /** Show the dark backdrop overlay. Default true. */
  showBackdrop?: boolean;
  /** Accessible label for the dialog. */
  ariaLabel?: string;
  children: React.ReactNode;
};

const isHorizontal = (side: Side) => side === "left" || side === "right";

// Where the panel sits, and how far it slides out when closed.
const positionClasses: Record<Side, string> = {
  left: "top-0 left-0 h-full",
  right: "top-0 right-0 h-full",
  top: "top-0 inset-x-0 w-full",
  bottom: "bottom-0 inset-x-0 w-full",
};

const hiddenTransform: Record<Side, string> = {
  left: "-translate-x-full",
  right: "translate-x-full",
  top: "-translate-y-full",
  bottom: "translate-y-full",
};

export default function Drawer({
  open,
  onClose,
  side = "left",
  size,
  className = "",
  closeOnBackdrop = true,
  showBackdrop = true,
  ariaLabel = "Menu",
  children,
}: DrawerProps) {
  const [mounted, setMounted] = useState(false);

  // Portals need the DOM — mount only on the client (avoids SSR hydration mismatch).
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  // Lock body scroll while open + close on Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!mounted) return null;

  const defaultSize = isHorizontal(side) ? "20rem" : "auto";
  const sizeStyle = isHorizontal(side)
    ? { width: size ?? defaultSize, maxWidth: "90vw" }
    : { height: size ?? defaultSize, maxHeight: "90vh" };

  // Let the consumer override the panel background; only apply the default
  // when no bg-* utility was passed (otherwise both classes fight in the CSS).
  const hasBg = /(^|\s)bg-/.test(className);

  return createPortal(
    <div
      className={`fixed inset-0 z-100 ${
        open ? "" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      {showBackdrop && (
        <div
          onClick={closeOnBackdrop ? onClose : undefined}
          className={`absolute inset-0 bg-navy-900/60 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Sliding panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        style={sizeStyle}
        className={`absolute ${positionClasses[side]} overflow-y-auto shadow-2xl transition-transform duration-300 ease-out ${
          hasBg ? "" : "bg-white"
        } ${open ? "translate-x-0 translate-y-0" : hiddenTransform[side]} ${className}`}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
