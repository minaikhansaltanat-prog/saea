function toBase64Url(bytes: Uint8Array): string {
  let str = "";
  for (let i = 0; i < bytes.length; i++) str += String.fromCharCode(bytes[i]);
  const b64 = typeof btoa !== "undefined" ? btoa(str) : Buffer.from(bytes).toString("base64");
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array {
  const b64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = b64 + "===".slice((b64.length + 3) % 4);
  if (typeof atob !== "undefined") {
    const str = atob(padded);
    const bytes = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) bytes[i] = str.charCodeAt(i);
    return bytes;
  }
  return new Uint8Array(Buffer.from(padded, "base64"));
}

function textToBytes(text: string): Uint8Array {
  return new TextEncoder().encode(text);
}

function bytesToText(bytes: Uint8Array): string {
  return new TextDecoder().decode(bytes);
}

function getCrypto(): Crypto {
  // Available globally in both the Node.js (>=19) runtime and the Edge runtime.
  return globalThis.crypto as Crypto;
}

function asBuffer(bytes: Uint8Array): BufferSource {
  return bytes as unknown as BufferSource;
}

async function hmacKey(secret: string) {
  return getCrypto().subtle.importKey("raw", asBuffer(textToBytes(secret)), { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
    "verify",
  ]);
}

/** Minimal HMAC-SHA256 signed token, structurally similar to a JWT (header omitted for brevity). */
export async function signToken(payload: Record<string, unknown>, secret: string): Promise<string> {
  const body = toBase64Url(textToBytes(JSON.stringify(payload)));
  const key = await hmacKey(secret);
  const sig = await getCrypto().subtle.sign("HMAC", key, asBuffer(textToBytes(body)));
  const sigStr = toBase64Url(new Uint8Array(sig));
  return `${body}.${sigStr}`;
}

export async function verifyToken<T = Record<string, unknown>>(token: string, secret: string): Promise<T | null> {
  try {
    const [body, sig] = token.split(".");
    if (!body || !sig) return null;
    const key = await hmacKey(secret);
    const expected = await getCrypto().subtle.sign("HMAC", key, asBuffer(textToBytes(body)));
    const expectedStr = toBase64Url(new Uint8Array(expected));
    if (expectedStr !== sig) return null;
    const payload = JSON.parse(bytesToText(fromBase64Url(body))) as T & { exp?: number };
    if (payload && typeof payload === "object" && "exp" in payload && payload.exp) {
      if (Date.now() > payload.exp) return null;
    }
    return payload;
  } catch {
    return null;
  }
}

/** PBKDF2-based password hashing using Web Crypto only (no native deps). */
export async function hashPassword(password: string): Promise<string> {
  const c = getCrypto();
  const salt = c.getRandomValues(new Uint8Array(16));
  const keyMaterial = await c.subtle.importKey("raw", asBuffer(textToBytes(password)), "PBKDF2", false, ["deriveBits"]);
  const bits = await c.subtle.deriveBits(
    { name: "PBKDF2", salt: asBuffer(salt), iterations: 120_000, hash: "SHA-256" },
    keyMaterial,
    256
  );
  return `${toBase64Url(salt)}:${toBase64Url(new Uint8Array(bits))}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [saltB64, hashB64] = stored.split(":");
  if (!saltB64 || !hashB64) return false;
  const c = getCrypto();
  const salt = fromBase64Url(saltB64);
  const keyMaterial = await c.subtle.importKey("raw", asBuffer(textToBytes(password)), "PBKDF2", false, ["deriveBits"]);
  const bits = await c.subtle.deriveBits(
    { name: "PBKDF2", salt: asBuffer(salt), iterations: 120_000, hash: "SHA-256" },
    keyMaterial,
    256
  );
  return toBase64Url(new Uint8Array(bits)) === hashB64;
}
