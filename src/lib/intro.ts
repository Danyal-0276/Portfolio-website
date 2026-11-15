export const INTRO_STORAGE_KEY = "danyal-curtain-intro-v3";

// Runs in the document head before the page can paint or React hydrates.
export const INTRO_BOOTSTRAP_SCRIPT = `(() => {
  const root = document.documentElement;
  let seen = false;
  try { seen = sessionStorage.getItem(${JSON.stringify(INTRO_STORAGE_KEY)}) === "seen"; } catch {}
  const shouldPlay = !seen && !location.hash && !matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.dataset.intro = shouldPlay ? "pending" : "done";
  if (shouldPlay) setTimeout(() => {
    if (root.dataset.intro === "pending") root.dataset.intro = "done";
  }, 8000);
})();`;
