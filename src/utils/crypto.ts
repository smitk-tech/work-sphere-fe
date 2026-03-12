/**
 * E2EE Crypto Utilities using Web Crypto API
 * Implements RSA-OAEP for encryption.
 */

export const generateKeyPair = async (): Promise<CryptoKeyPair> => {
  return await crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
  );
};

export const exportPublicKey = async (key: CryptoKey): Promise<string> => {
  const exported = await crypto.subtle.exportKey("spki", key);
  const exportedAsString = String.fromCharCode.apply(null, new Uint8Array(exported) as unknown as number[]);
  return window.btoa(exportedAsString);
};

export const exportPrivateKey = async (key: CryptoKey): Promise<string> => {
  const exported = await crypto.subtle.exportKey("pkcs8", key);
  const exportedAsString = String.fromCharCode.apply(null, new Uint8Array(exported) as unknown as number[]);
  return window.btoa(exportedAsString);
};

export const importPublicKey = async (pemBase64: string): Promise<CryptoKey> => {
  const binaryDerString = window.atob(pemBase64);
  const binaryDer = new Uint8Array(binaryDerString.length);
  for (let i = 0; i < binaryDerString.length; i++) {
    binaryDer[i] = binaryDerString.charCodeAt(i);
  }
  return await crypto.subtle.importKey(
    "spki",
    binaryDer.buffer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["encrypt"]
  );
};

export const importPrivateKey = async (pemBase64: string): Promise<CryptoKey> => {
  const binaryDerString = window.atob(pemBase64);
  const binaryDer = new Uint8Array(binaryDerString.length);
  for (let i = 0; i < binaryDerString.length; i++) {
    binaryDer[i] = binaryDerString.charCodeAt(i);
  }
  return await crypto.subtle.importKey(
    "pkcs8",
    binaryDer.buffer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["decrypt"]
  );
};

export const encryptMessage = async (publicKeyPem: string, messageText: string): Promise<string> => {
  const publicKey = await importPublicKey(publicKeyPem);
  const encoder = new TextEncoder();
  const encodedMessage = encoder.encode(messageText);

  const encryptedBuf = await crypto.subtle.encrypt(
    {
      name: "RSA-OAEP"
    },
    publicKey,
    encodedMessage
  );

  const encryptedString = String.fromCharCode.apply(null, new Uint8Array(encryptedBuf) as unknown as number[]);
  return window.btoa(encryptedString);
};

export const decryptMessage = async (privateKeyPem: string, ciphertextBase64: string): Promise<string> => {
  const privateKey = await importPrivateKey(privateKeyPem);
  
  const encryptedString = window.atob(ciphertextBase64);
  const encryptedBuf = new Uint8Array(encryptedString.length);
  for (let i = 0; i < encryptedString.length; i++) {
    encryptedBuf[i] = encryptedString.charCodeAt(i);
  }

  const decryptedBuf = await crypto.subtle.decrypt(
    {
      name: "RSA-OAEP"
    },
    privateKey,
    encryptedBuf
  );

  const decoder = new TextDecoder();
  return decoder.decode(decryptedBuf);
};
