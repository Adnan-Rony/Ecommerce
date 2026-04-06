import { useEffect } from "react";

/**
 * useSEO — sets page title and meta description dynamically
 * Call this at the top of any page component.
 *
 * Usage:
 *   useSEO({
 *     title: "iPhone 15 Pro | ZapZoneBD",
 *     description: "Buy iPhone 15 Pro at best price in Bangladesh...",
 *     image: "https://res.cloudinary.com/..."  // optional
 *   })
 */
const useSEO = ({ title, description, image, url }) => {
  useEffect(() => {
    const siteName = "ZapZoneBD";
    const fullTitle = title ? `${title} | ${siteName}` : `${siteName} — Gadgets, Electronics & More`;
    const desc = description || "Buy latest gadgets, electronics, kitchen & pet items at best price in Bangladesh. Free delivery above ৳1000.";
    const img = image || "https://zapzonebd.vercel.app/og-image.jpg";
    const pageUrl = url || window.location.href;

    // Title
    document.title = fullTitle;

    // Helper to set meta tag
    const setMeta = (selector, value) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        const attr = selector.includes("property") ? "property" : "name";
        const key = selector.match(/["']([^"']+)["']/)?.[1];
        if (key) el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };

    setMeta('meta[name="description"]',          desc);
    setMeta('meta[property="og:title"]',         fullTitle);
    setMeta('meta[property="og:description"]',   desc);
    setMeta('meta[property="og:image"]',         img);
    setMeta('meta[property="og:url"]',           pageUrl);
    setMeta('meta[name="twitter:title"]',        fullTitle);
    setMeta('meta[name="twitter:description"]',  desc);
    setMeta('meta[name="twitter:image"]',        img);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", pageUrl);

    // Cleanup — restore default on unmount
    return () => {
      document.title = `${siteName} — Gadgets, Electronics & More`;
    };
  }, [title, description, image, url]);
};

export default useSEO;