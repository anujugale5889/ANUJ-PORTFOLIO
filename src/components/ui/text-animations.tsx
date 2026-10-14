"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "motion/react";

/* ──────────────────────────────────────────────────────────
   WordReveal — splits text into words, reveals word-by-word
   on scroll. Darshan-portfolio style.
────────────────────────────────────────────────────────── */
interface WordRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  once?: boolean;
}

export const WordReveal: React.FC<WordRevealProps> = ({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
  duration = 0.8,
  stagger = 0.06,
  once = false,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  const words = text.split(" ");

  return (
    <span ref={ref} className={`inline-block overflow-visible ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden" style={{ verticalAlign: "bottom" }}>
          <motion.span
            className={`inline-block ${wordClassName}`}
            initial={{ y: "110%", opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{
              duration,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
};

/* ──────────────────────────────────────────────────────────
   CharReveal — char-by-char stagger, good for headings
────────────────────────────────────────────────────────── */
interface CharRevealProps {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  once?: boolean;
  direction?: "up" | "down";
}

export const CharReveal: React.FC<CharRevealProps> = ({
  text,
  className = "",
  charClassName = "",
  delay = 0,
  duration = 0.55,
  stagger = 0.025,
  once = false,
  direction = "up",
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  const chars = text.split("");
  const yInitial = direction === "up" ? "120%" : "-120%";

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`} aria-label={text}>
      {chars.map((char, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden pb-3 -mb-3"
          style={{ verticalAlign: "bottom" }}
        >
          <motion.span
            className={`inline-block ${charClassName}`}
            style={{ whiteSpace: char === " " ? "pre" : "normal" }}
            initial={{ y: yInitial, opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : { y: yInitial, opacity: 0 }}
            transition={{
              duration,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {char === " " ? "\u00a0" : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

/* ──────────────────────────────────────────────────────────
   ScrambleText — matrix/hacker scramble reveal
────────────────────────────────────────────────────────── */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

interface ScrambleTextProps {
  text: string;
  className?: string;
  trigger?: boolean;
  duration?: number;
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = "",
  trigger = true,
  duration = 1200,
}) => {
  const [displayed, setDisplayed] = useState(text);
  const frameRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) return;
    startRef.current = Date.now();
    frameRef.current = setInterval(() => {
      const elapsed = Date.now() - (startRef.current ?? 0);
      const progress = Math.min(elapsed / duration, 1);
      const revealCount = Math.floor(progress * text.length);

      setDisplayed(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < revealCount) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (progress >= 1) {
        clearInterval(frameRef.current!);
        setDisplayed(text);
      }
    }, 30);

    return () => {
      if (frameRef.current) clearInterval(frameRef.current);
    };
  }, [trigger, text, duration]);

  return <span className={className}>{displayed}</span>;
};

/* ──────────────────────────────────────────────────────────
   FadeSlide — simple fade + translate reveal for paragraphs
────────────────────────────────────────────────────────── */
interface FadeSlideProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}

export const FadeSlide: React.FC<FadeSlideProps> = ({
  children,
  className = "",
  delay = 0,
  y = 28,
  once = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y }
      }
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

/* ──────────────────────────────────────────────────────────
   LuminousText — Darshan-portfolio style word-by-word
   luminescence: muted gray to luminous bold white on hover & scroll
────────────────────────────────────────────────────────── */
interface LuminousTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  as?: 'p' | 'span' | 'div';
}

export const LuminousText: React.FC<LuminousTextProps> = ({
  text,
  className = "",
  wordClassName = "",
  as = "p",
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-40px" });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const words = text.split(/\s+/).filter(Boolean);
  const Component = as as any;

  return (
    <Component
      ref={containerRef}
      className={`inline-flex flex-wrap gap-x-1.5 gap-y-0.5 select-none cursor-default ${className}`}
    >
      {words.map((word, idx) => {
        const isDirectHover = hoveredIdx === idx;
        const isNearHover = hoveredIdx !== null && Math.abs(hoveredIdx - idx) === 1;

        return (
          <span
            key={idx}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            className={`inline-block transition-all duration-200 transform-gpu ${
              isDirectHover
                ? "text-gray-950 dark:text-white font-bold scale-110 drop-shadow-[0_2px_10px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_0_16px_rgba(255,255,255,0.95)] -translate-y-0.5 z-10 relative"
                : isNearHover
                ? "text-gray-900 dark:text-white/85 font-semibold scale-105 z-[5] relative"
                : isInView
                ? "text-gray-700 dark:text-white/60 font-normal hover:text-white"
                : "text-gray-400/40 dark:text-white/25 font-normal"
            } ${wordClassName}`}
          >
            {word}
          </span>
        );
      })}
    </Component>
  );
};

