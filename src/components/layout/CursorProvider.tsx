"use client";

import { useEffect } from "react";
import { CustomCursor } from "@/components/ui/CustomCursor";

export function CursorProvider() {
  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!coarse && !reduced) {
      document.body.classList.add("has-custom-cursor");
    }

    return () => {
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return <CustomCursor />;
}
