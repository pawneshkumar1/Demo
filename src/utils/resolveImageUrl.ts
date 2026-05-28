export const resolveImageUrl = (src?: string | null): string => {
  if (!src) return "";

  if (/^https?:\/\//i.test(src)) return src;
  if (src.startsWith("data:") || src.startsWith("blob:")) return src;

  const baseUrl = import.meta.env.VITE_BASE_URL ?? "";
  const path = src.replace(/^\/+/, "");

  // In development, use root-relative paths for uploads to leverage the Vite proxy
  // and avoid NotSameOrigin errors.
  if (import.meta.env.DEV && path.startsWith("uploads/")) {
    return `/${path}`;
  }

  return `${baseUrl}/${path}`;
};