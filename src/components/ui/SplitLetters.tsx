"use client";

interface SplitLettersProps {
  text: string;
  className?: string;
  charClassName?: string;
}

export function SplitLetters({ text, className, charClassName = "hero-char" }: SplitLettersProps) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          className={`${charClassName} inline-block`}
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
