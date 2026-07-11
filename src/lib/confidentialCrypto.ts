// Hybrid RSA-OAEP + AES-GCM encryption, entirely client-side via the
// browser's native Web Crypto API. RSA alone can't encrypt an
// arbitrary-length message (2048-bit OAEP tops out around 190 bytes), so
// we generate a one-time AES-256 key per message, encrypt the message with
// it, then encrypt only that small AES key with the firm's RSA public key.
// The payload format is a single string: "GPENC1.<b64 rsaKey>.<b64 iv>.<b64 ciphertext>"

const FORMAT_TAG = 'GPENC1';

function pemToArrayBuffer(pem: string): ArrayBuffer {
  const b64 = pem
    .replace(/-----BEGIN [^-]+-----/, '')
    .replace(/-----END [^-]+-----/, '')
    .replace(/\s+/g, '');
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

function bufToB64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function b64ToBuf(b64: string): ArrayBuffer {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

async function importPublicKey(pem: string): Promise<CryptoKey> {
  return crypto.subtle.importKey('spki', pemToArrayBuffer(pem), { name: 'RSA-OAEP', hash: 'SHA-256' }, false, [
    'encrypt',
  ]);
}

async function importPrivateKey(pem: string): Promise<CryptoKey> {
  return crypto.subtle.importKey('pkcs8', pemToArrayBuffer(pem), { name: 'RSA-OAEP', hash: 'SHA-256' }, false, [
    'decrypt',
  ]);
}

export async function encryptMessage(publicKeyPem: string, message: string): Promise<string> {
  const publicKey = await importPublicKey(publicKeyPem);

  const aesKey = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt']);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(message);
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, aesKey, encoded);

  const rawAesKey = await crypto.subtle.exportKey('raw', aesKey);
  const encryptedAesKey = await crypto.subtle.encrypt({ name: 'RSA-OAEP' }, publicKey, rawAesKey);

  return [FORMAT_TAG, bufToB64(encryptedAesKey), bufToB64(iv.buffer), bufToB64(ciphertext)].join('.');
}

export async function decryptMessage(privateKeyPem: string, payload: string): Promise<string> {
  const parts = payload.trim().split('.');
  if (parts.length !== 4 || parts[0] !== FORMAT_TAG) {
    throw new Error('bad_format');
  }
  const [, encAesKeyB64, ivB64, ciphertextB64] = parts;

  const privateKey = await importPrivateKey(privateKeyPem);
  const rawAesKey = await crypto.subtle.decrypt({ name: 'RSA-OAEP' }, privateKey, b64ToBuf(encAesKeyB64));
  const aesKey = await crypto.subtle.importKey('raw', rawAesKey, { name: 'AES-GCM' }, false, ['decrypt']);

  const iv = new Uint8Array(b64ToBuf(ivB64));
  const plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, aesKey, b64ToBuf(ciphertextB64));

  return new TextDecoder().decode(plaintext);
}
