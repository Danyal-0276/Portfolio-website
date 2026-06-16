export const SITE_INTRO_EVENT = "site-intro-complete";

const INTRO_KEY = "portfolio-intro-seen";

export function hasSeenIntro(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(INTRO_KEY) === "1";
  } catch {
    return false;
  }
}

export function markIntroSeen(): void {
  try {
    sessionStorage.setItem(INTRO_KEY, "1");
  } catch {
    /* private browsing */
  }
}

export function completeIntro(): void {
  if (typeof document === "undefined") return;
  document.documentElement.classList.remove("is-loading");
  document.documentElement.classList.add("is-ready");
  markIntroSeen();
  window.dispatchEvent(new Event(SITE_INTRO_EVENT));
}

export function waitForIntro(): Promise<void> {
  if (typeof window === "undefined" || hasSeenIntro()) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    window.addEventListener(SITE_INTRO_EVENT, () => resolve(), { once: true });
  });
}

export function runAfterIntro(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  if (hasSeenIntro() || document.documentElement.classList.contains("is-ready")) {
    callback();
    return () => {};
  }

  window.addEventListener(SITE_INTRO_EVENT, callback, { once: true });
  return () => window.removeEventListener(SITE_INTRO_EVENT, callback);
}
