"use client";

import { useSyncExternalStore } from "react";

/** Same values as the Tailwind defaults, so JS and CSS agree on breakpoints. */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS | "xs";
export type Device = "mobile" | "tablet" | "desktop";

export type Dimension = {
  width: number;
  height: number;
  /** Coarse bucket: < 768 mobile, < 1024 tablet, otherwise desktop. */
  device: Device;
  /** Largest Tailwind breakpoint the viewport satisfies. */
  breakpoint: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isPortrait: boolean;
  isTouch: boolean;
  /** False during SSR and the first paint, when no size is known yet. */
  ready: boolean;
};

/* ---------------------------------------------------------------- store */

// The snapshot is a plain string so React can compare it cheaply; the hook
// derives the object from it. Resizes are coalesced to one per frame.
let snapshot = "0x0";
let frame = 0;

function subscribe(onChange: () => void) {
  const read = () => {
    const next = `${window.innerWidth}x${window.innerHeight}`;
    if (next === snapshot) return;
    snapshot = next;
    onChange();
  };

  const onResize = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(read);
  };

  read();
  window.addEventListener("resize", onResize);
  window.addEventListener("orientationchange", onResize);
  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("orientationchange", onResize);
  };
}

const getSnapshot = () => snapshot;
// The server has no viewport — every consumer starts at `ready: false`.
const getServerSnapshot = () => "0x0";

function breakpointFor(width: number): Breakpoint {
  if (width >= BREAKPOINTS["2xl"]) return "2xl";
  if (width >= BREAKPOINTS.xl) return "xl";
  if (width >= BREAKPOINTS.lg) return "lg";
  if (width >= BREAKPOINTS.md) return "md";
  if (width >= BREAKPOINTS.sm) return "sm";
  return "xs";
}

/* ---------------------------------------------------------------- hooks */

/**
 * Viewport size + device bucket, updated on resize / orientation change.
 *
 * Use it for behavior that CSS can't express (which component to mount, how
 * many items to fetch, closing a drawer). For pure styling prefer Tailwind's
 * responsive classes — they work before hydration.
 */
export function useDimension(): Dimension {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [w, h] = raw.split("x").map(Number);
  const ready = w > 0;

  return {
    width: w,
    height: h,
    device: w >= BREAKPOINTS.lg ? "desktop" : w >= BREAKPOINTS.md ? "tablet" : "mobile",
    breakpoint: breakpointFor(w),
    isMobile: ready && w < BREAKPOINTS.md,
    isTablet: ready && w >= BREAKPOINTS.md && w < BREAKPOINTS.lg,
    isDesktop: ready && w >= BREAKPOINTS.lg,
    isPortrait: ready && h >= w,
    isTouch:
      ready &&
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches,
    ready,
  };
}

/** `useBreakpoint("lg")` → true once the viewport is at least 1024px wide. */
export function useBreakpoint(min: keyof typeof BREAKPOINTS) {
  const { width, ready } = useDimension();
  return ready && width >= BREAKPOINTS[min];
}

export default useDimension;
