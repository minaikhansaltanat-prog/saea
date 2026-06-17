function toBase64Url(bytes) {
  return Buffer.from(bytes).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hashPassword(password) {
  const c = globalThis.crypto;
  const salt = c.getRandomValues(new Uint8Array(16));
  const keyMaterial = await c.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, [
    "deriveBits",
  ]);
  const bits = await c.subtle.deriveBits({ name: "PBKDF2", salt, iterations: 120_000, hash: "SHA-256" }, keyMaterial, 256);
  return `${toBase64Url(salt)}:${toBase64Url(new Uint8Array(bits))}`;
}

const accounts = [
  ["super.admin@caea.kz", "Admin#12345"],
  ["content.admin@caea.kz", "Content#12345"],
  ["membership.admin@caea.kz", "Member#12345"],
  ["partner.admin@caea.kz", "Partner#12345"],
  ["finance.admin@caea.kz", "Finance#12345"],
  ["analytics@caea.kz", "Analytics#12345"],
  ["support@caea.kz", "Support#12345"],
  ["member.demo@caea.kz", "Demo#12345"],
];

for (const [email, pw] of accounts) {
  const hash = await hashPassword(pw);
  console.log(`${email} | ${pw} | ${hash}`);
}
