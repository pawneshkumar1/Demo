/**
 * Helper to format any DD-MM-YYYY to YYYY-MM-DD for the API
 * Use this to ensure date query parameters are standardized.
 */
export const formatToISO = (dateStr: string) => {
  if (!dateStr || !dateStr.includes("-")) return dateStr;
  const parts = dateStr.split("-");
  
  // If the first part is 4 digits, it's already YYYY-MM-DD
  if (parts[0].length === 4) return dateStr;
  
  // Otherwise assume DD-MM-YYYY and convert to YYYY-MM-DD
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
};
