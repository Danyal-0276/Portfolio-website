const canonicalOrigin = (process.env.SITE_URL || "https://danyal.portfilio.live").replace(/\/$/, "");
const targetOrigin = (process.argv[2] || process.env.SEO_BASE_URL || canonicalOrigin).replace(/\/$/, "");
const canonicalRoot = `${canonicalOrigin}/`;
const staleHostname = "portfolio-website-git-main-danyal-tanveer-s-projects.vercel.app";

async function get(path) {
  const response = await fetch(`${targetOrigin}${path}`, { redirect: "follow" });
  if (!response.ok) {
    throw new Error(`${path} returned ${response.status}`);
  }

  return {
    body: await response.text(),
    contentType: response.headers.get("content-type") || "",
  };
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function hasTagWithValue(html, attribute, key, value) {
  const escapedKey = escapeRegExp(key);
  const escapedValue = escapeRegExp(value);
  const firstOrder = new RegExp(`<[^>]+${attribute}=["']${escapedKey}["'][^>]+(?:content|href)=["']${escapedValue}["']`, "i");
  const reverseOrder = new RegExp(`<[^>]+(?:content|href)=["']${escapedValue}["'][^>]+${attribute}=["']${escapedKey}["']`, "i");
  return firstOrder.test(html) || reverseOrder.test(html);
}

function hasTagWithAnyValue(html, attribute, key, values) {
  return values.some((value) => hasTagWithValue(html, attribute, key, value));
}

const [home, sitemap, robots, manifest, socialImage] = await Promise.all([
  get("/"),
  get("/sitemap.xml"),
  get("/robots.txt"),
  get("/manifest.webmanifest"),
  get("/opengraph-image"),
]);

const checks = [
  ["canonical link", hasTagWithAnyValue(home.body, "rel", "canonical", [canonicalOrigin, canonicalRoot])],
  ["Open Graph URL", hasTagWithAnyValue(home.body, "property", "og:url", [canonicalOrigin, canonicalRoot])],
  ["Open Graph image", home.body.includes(`${canonicalOrigin}/opengraph-image`)],
  ["Twitter large card", hasTagWithValue(home.body, "name", "twitter:card", "summary_large_image")],
  ["JSON-LD", home.body.includes('type="application/ld+json"') && home.body.includes('"@type":"ProfilePage"')],
  ["web manifest link", home.body.includes('rel="manifest"') && home.body.includes("/manifest.webmanifest")],
  ["sitemap canonical URL", sitemap.body.includes(`<loc>${canonicalRoot}</loc>`) && !sitemap.body.includes(staleHostname)],
  ["robots sitemap URL", robots.body.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`) && robots.body.includes("Disallow: /api/")],
  ["manifest content type", manifest.contentType.includes("application/manifest+json") || manifest.contentType.includes("application/json")],
  ["social image content type", socialImage.contentType.includes("image/png")],
  ["no stale hostname in homepage", !home.body.includes(staleHostname)],
];

let failures = 0;
for (const [name, passed] of checks) {
  console.log(`${passed ? "PASS" : "FAIL"}  ${name}`);
  if (!passed) failures += 1;
}

if (failures) {
  console.error(`\n${failures} SEO check${failures === 1 ? "" : "s"} failed for ${targetOrigin}.`);
  process.exitCode = 1;
} else {
  console.log(`\nAll ${checks.length} SEO checks passed for ${targetOrigin}.`);
}
