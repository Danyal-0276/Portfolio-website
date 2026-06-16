"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/data/portfolio";

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export function HeroMeta() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(formatTime(new Date()));
    const id = setInterval(() => setTime(formatTime(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  const locationShort = siteConfig.location.split(",")[0];

  return (
    <div className="hero-meta flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] tracking-[0.2em] text-cream/45 uppercase sm:text-xs">
      <span className="inline-flex items-center gap-2">
        <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
        {locationShort}, PKT
      </span>
      <span className="font-mono tabular-nums" suppressHydrationWarning>
        {time ?? "--:--:--"}
      </span>
    </div>
  );
}
