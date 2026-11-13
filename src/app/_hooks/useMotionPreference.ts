"use client";

import { useEffect, useState } from "react";

export function useMotionPreference() {
  const [motion, setMotion] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("motion-off", !motion);
    return () => document.documentElement.classList.remove("motion-off");
  }, [motion]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotion(!media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return { motion, setMotion };
}
