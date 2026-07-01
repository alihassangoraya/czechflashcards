function hasWorkingUrl() {
  try {
    const url = new URL("https://example.com/path?query=1#hash");
    return url.protocol === "https:" && url.hostname === "example.com" && url.pathname === "/path";
  } catch (_error) {
    return false;
  }
}

function splitUrl(rawUrl) {
  const match = String(rawUrl).match(/^([a-z][a-z\d+\-.]*:)?(?:\/\/([^/?#]*))?([^?#]*)(\?[^#]*)?(#.*)?$/i);
  if (!match) throw new TypeError(`Invalid URL: ${rawUrl}`);
  const authority = match[2] || "";
  const hostMatch = authority.match(/^(?:([^:@]*)(?::([^@]*))?@)?(\[[^\]]+\]|[^:]*)(?::(\d+))?$/);
  if (!hostMatch) throw new TypeError(`Invalid URL host: ${rawUrl}`);
  const protocol = match[1] || "";
  const hostname = hostMatch[3] || "";
  const port = hostMatch[4] || "";
  const pathname = match[3] || "/";
  const search = match[4] || "";
  const hash = match[5] || "";

  return {
    protocol,
    username: hostMatch[1] || "",
    password: hostMatch[2] || "",
    host: port ? `${hostname}:${port}` : hostname,
    hostname,
    port,
    pathname: pathname.startsWith("/") ? pathname : `/${pathname}`,
    search,
    hash
  };
}

function resolveUrl(input, base) {
  const value = String(input);
  if (/^[a-z][a-z\d+\-.]*:/i.test(value)) return value;
  if (!base) return value;

  const baseUrl = new NativeSafeURL(String(base));
  if (value.startsWith("//")) return `${baseUrl.protocol}${value}`;
  if (value.startsWith("/")) return `${baseUrl.origin}${value}`;

  const basePath = baseUrl.pathname.endsWith("/")
    ? baseUrl.pathname
    : baseUrl.pathname.slice(0, baseUrl.pathname.lastIndexOf("/") + 1);
  return `${baseUrl.origin}${basePath}${value}`;
}

const NativeURL = globalThis.URL;

class NativeSafeURL {
  constructor(input, base) {
    const parsed = splitUrl(resolveUrl(input, base));
    this.protocol = parsed.protocol;
    this.username = parsed.username;
    this.password = parsed.password;
    this.host = parsed.host;
    this.hostname = parsed.hostname;
    this.port = parsed.port;
    this.pathname = parsed.pathname;
    this.hash = parsed.hash;
    this.searchParams = new URLSearchParams(parsed.search.replace(/^\?/, ""));
  }

  get origin() {
    return this.host ? `${this.protocol}//${this.host}` : "null";
  }

  get search() {
    const params = this.searchParams.toString();
    return params ? `?${params}` : "";
  }

  set search(value) {
    this.searchParams = new URLSearchParams(String(value).replace(/^\?/, ""));
  }

  get href() {
    return `${this.origin}${this.pathname}${this.search}${this.hash}`;
  }

  toJSON() {
    return this.href;
  }

  toString() {
    return this.href;
  }
}

if (NativeURL?.createObjectURL) {
  NativeSafeURL.createObjectURL = NativeURL.createObjectURL.bind(NativeURL);
}

if (NativeURL?.revokeObjectURL) {
  NativeSafeURL.revokeObjectURL = NativeURL.revokeObjectURL.bind(NativeURL);
}

if (!hasWorkingUrl()) {
  globalThis.URL = NativeSafeURL;
}
