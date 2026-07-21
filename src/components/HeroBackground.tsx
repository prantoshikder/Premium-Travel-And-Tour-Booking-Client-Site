"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Props = {
  /** Poster frame — also the fallback when the clip can't play. */
  image: string;
  alt: string;
  /** Public-folder paths, best format first. */
  sources?: string[];
};

/** Seconds of overlap between the outgoing and incoming copy. */
const FADE = 1.6;
/** Slightly slow motion reads as calmer and stretches the loop. */
const RATE = 0.8;

/**
 * Hero backdrop.
 *
 * The clip is short, so a plain `loop` would snap back to frame one in full
 * view. Instead two copies play out of phase: as one nears its end the other
 * starts from the top and they crossfade, which hides the seam and reads as
 * one continuous shot. The first copy is server-rendered with the poster, so a
 * refresh paints the right frame immediately.
 */
export default function HeroBackground({
  image,
  alt,
  sources = ["/hero.webm", "/hero.mp4"],
}: Props) {
  const aRef = useRef<HTMLVideoElement>(null);
  const bRef = useRef<HTMLVideoElement>(null);
  const swapping = useRef(false);
  const [front, setFront] = useState<"a" | "b">("a");
  const [failed, setFailed] = useState(false);

  // Plays everywhere, phones included — `muted` + `playsInline` is what iOS
  // needs to autoplay. Only a motion-sensitive visitor keeps the still frame.
  const paused = usePrefersReducedMotion();

  useEffect(() => {
    const videos = [aRef.current, bRef.current].filter(
      Boolean
    ) as HTMLVideoElement[];
    for (const video of videos) {
      if (paused) {
        video.pause();
      } else {
        video.playbackRate = RATE;
        // Autoplay can be refused (low power mode); retry once interactive.
        if (video === (front === "a" ? aRef.current : bRef.current)) {
          video.play().catch(() => {});
        }
      }
    }
  }, [paused, front]);

  /** Hand over to the other copy once the current one is `FADE` from the end. */
  const handleTimeUpdate = useCallback(
    (side: "a" | "b") => () => {
      if (paused || swapping.current || side !== front) return;
      const current = side === "a" ? aRef.current : bRef.current;
      const other = side === "a" ? bRef.current : aRef.current;
      if (!current || !other || !current.duration) return;

      if (current.duration - current.currentTime > FADE) return;

      swapping.current = true;
      other.currentTime = 0;
      other.playbackRate = RATE;
      other
        .play()
        .catch(() => {})
        .finally(() => setFront(side === "a" ? "b" : "a"));

      // Park the outgoing copy once it's fully hidden, ready for its next turn.
      window.setTimeout(() => {
        current.pause();
        current.currentTime = 0;
        swapping.current = false;
      }, FADE * 1000);
    },
    [front, paused]
  );

  const videoClass = (side: "a" | "b") =>
    `absolute inset-0 h-full w-full object-cover transition-opacity ease-linear ${
      front === side ? "opacity-100" : "opacity-0"
    }`;

  return (
    <>
      {/* Sits underneath purely as the LCP image — optimised by next/image. */}
      <Image
        src={image}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {!failed && (
        <>
          <video
            ref={aRef}
            autoPlay
            muted
            playsInline
            preload="auto"
            poster={image}
            aria-hidden
            style={{ transitionDuration: `${FADE}s` }}
            onTimeUpdate={handleTimeUpdate("a")}
            onError={() => setFailed(true)}
            className={videoClass("a")}
          >
            {sources.map((src) => (
              <source
                key={src}
                src={src}
                type={src.endsWith(".webm") ? "video/webm" : "video/mp4"}
              />
            ))}
          </video>

          {/* Second copy: same file, so it comes from cache. */}
          <video
            ref={bRef}
            muted
            playsInline
            preload="auto"
            aria-hidden
            style={{ transitionDuration: `${FADE}s` }}
            onTimeUpdate={handleTimeUpdate("b")}
            className={videoClass("b")}
          >
            {sources.map((src) => (
              <source
                key={src}
                src={src}
                type={src.endsWith(".webm") ? "video/webm" : "video/mp4"}
              />
            ))}
          </video>
        </>
      )}
    </>
  );
}
