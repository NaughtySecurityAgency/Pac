// If you're not using a proxy, set: pass = "DIRECT"
// If you are using a proxy, set: pass = "PROXY hostname:port"
let pass = "DIRECT";

// For use with BlackHole Proxy, set: blackhole = "PROXY 127.0.0.1:3421"
// For use with a local http server, set: blackhole = "PROXY 127.0.0.1:80"
// Otherwise use: blackhole = "PROXY 0.0.0.0"
const blackhole = "PROXY 127.0.0.1:3421";

// To autostart with the browser set to 1
let isEnabled = 1;

// Whitelist domains (these are allowed no matter what)
const whitelist = [];

// Regular expression patterns for popular ad domains and subdomains
const adRegex = new RegExp(
  [
    "^(.+[-_.])?(ad[sxv]?|teads?|doubleclick|adservice|adtrack(er|ing)?|advertising|adnxs|admeld|advert|adx(addy|pose|pr[io])?|adform|admulti|adbutler|adblade|adroll|adgr[ao]|adinterax|admarvel|admed(ia|ix)|adperium|adplugg|adserver|adsolut|adtegr(it|ity)|adtraxx|advertising|aff(iliat(es?|ion))|akamaihd|amazon-adsystem|appnexus|appsflyer|audience2media|bingads|bidswitch|brightcove|casalemedia|contextweb|criteo|doubleclick|emxdgt|e-planning|exelator|eyewonder|flashtalking|goog(le(syndication|tagservices))|gunggo|hurra(h|ynet)|imrworldwide|insightexpressai|kontera|lifestreetmedia|lkntracker|mediaplex|ooyala|openx|pixel(e|junky)|popcash|propellerads|pubmatic|quantserve|revcontent|revenuehits|sharethrough|skimresources|taboola|traktrafficx|twitter[.]com|undertone|yieldmo)",
  ].join("|"),
  "i"
);

function FindProxyForURL(url, host) {
  host = host.toLowerCase();
  url = url.toLowerCase();

  // Normal passthrough if AntiAd is disabled
  if (!isEnabled) {
    return pass;
  }

  // Allow domains and sites explicitly from the whitelist
  if (whitelist.length > 0 && whitelist.includes(host)) {
    return pass;
  }

  // Block ads using regular expressions
  if (adRegex.test(host)) {
    return blackhole;
  }

  // All else fails, just pass through
  return pass;
}
