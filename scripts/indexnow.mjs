// scripts/indexnow.mjs
//
// Notifies IndexNow (Bing, Yandex, Seznam, Naver, ...) about every URL in the
// live sitemap so search engines discover new/updated pages within minutes.
//
// Setup (already done in this repo): the key file lives at
//   public/<KEY>.txt   ->   https://www.nbabite.org/<KEY>.txt
//
// Usage:  node scripts/indexnow.mjs   (or: npm run indexnow)
//
// Requires Node 18+ (uses the global fetch API).

const KEY = "fda2e085c749239a50061171dae021f4";
const HOST = "www.nbabite.org";
const SITE = `https://${HOST}`;
const KEY_LOCATION = `${SITE}/${KEY}.txt`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getUrls() {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap fetch failed: HTTP ${res.status}`);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
  return [...new Set(urls)];
}

async function submit(urlList) {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });
  return res.status;
}

(async () => {
  try {
    const urls = await getUrls();
    if (!urls.length) {
      console.log("No URLs found in sitemap — nothing to submit.");
      return;
    }
    console.log(`Sitemap has ${urls.length} URLs. Submitting to IndexNow...`);

    // Retry so the key file has time to go live right after a deploy.
    const MAX = 6;
    for (let attempt = 1; attempt <= MAX; attempt++) {
      let status;
      try {
        status = await submit(urls);
      } catch (e) {
        status = `error: ${e.message}`;
      }
      // 200 = accepted, 202 = accepted (key validation pending)
      if (status === 200 || status === 202) {
        console.log(`IndexNow accepted (HTTP ${status}) on attempt ${attempt}.`);
        return;
      }
      console.error(`Attempt ${attempt}/${MAX} — IndexNow returned ${status}`);
      if (attempt < MAX) await sleep(30000);
    }
    console.error("IndexNow submission failed after all retries.");
    process.exitCode = 1;
  } catch (e) {
    console.error(`IndexNow failed: ${e.message}`);
    process.exitCode = 1;
  }
})();
