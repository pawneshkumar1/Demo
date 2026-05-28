import CryptoJS from "crypto-js";

const ENCRYPT_SECRET_KEY = import.meta.env.VITE_PARTNER_ENCRYPT_SECRET_KEY;
const DECRYPT_SECRET_KEY = import.meta.env.VITE_PARTNER_DECRYPT_SECRET_KEY;
const LOCAL_STORAGE_SECRET_KEY =
  import.meta.env.VITE_PARTNER_STORAGE_SECRET_KEY ||
  ENCRYPT_SECRET_KEY ||
  DECRYPT_SECRET_KEY;

function createKey(secretKey: string) {
  return CryptoJS.SHA256(secretKey);
}

function encryptWithKey(data: any, secretKey: string) {
  const jsonString = JSON.stringify(data);
  const key = createKey(secretKey);
  const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(jsonString, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return {
    data: encrypted.ciphertext.toString(CryptoJS.enc.Hex),
    iv: iv.toString(CryptoJS.enc.Hex),
    encrypted: true,
  };
}

function decryptWithKey(data: any, secretKey: string) {
  const { data: encryptedData, iv: ivHex } = data;
  const key = createKey(secretKey);
  const iv = CryptoJS.enc.Hex.parse(ivHex);
  const decrypted = CryptoJS.AES.decrypt(
    CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Hex.parse(encryptedData),
    }),
    key,
    { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 },
  );
  const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

  if (!decryptedText) {
    throw new Error("Decryption returned an empty payload");
  }

  return JSON.parse(decryptedText);
}

export function encryptData(data: any) {
  try {
    return encryptWithKey(data, ENCRYPT_SECRET_KEY);
  } catch (error) {
    console.error("Encryption failed:", error);
    return data;
  }
}

export function decryptData(data: any) {
  return decryptWithKey(data, DECRYPT_SECRET_KEY);
}

export function encryptStoredData(data: any) {
  try {
    return encryptWithKey(data, LOCAL_STORAGE_SECRET_KEY);
  } catch (error) {
    console.error("Stored data encryption failed:", error);
    return data;
  }
}

export function decryptStoredData(data: any) {
  return decryptWithKey(data, LOCAL_STORAGE_SECRET_KEY);
}
