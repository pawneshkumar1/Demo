export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateMobile = (mobile: string): boolean => {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(mobile);
};

export const validateAmount = (amount: string): boolean => {
  const regex = /^\d+(\.\d{1,2})?$/;
  return regex.test(amount) && parseFloat(amount) > 0;
};

export const validateRequired = (value: any): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string' && value.trim() === '') return false;
  if (typeof value === 'boolean') return value;
  return true;
};
export const isValidNumericInput = (val: string): boolean => {
  return val === "" || /^\d*$/.test(val);
};

export const isValidDecimalInput = (val: string): boolean => {
  return val === "" || /^\d*\.?\d*$/.test(val);
};
export const validatePan = (pan: string): boolean => {
  const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return regex.test(pan);
};

export const validatePinCode = (pin: string): boolean => {
  const regex = /^[1-9][0-9]{5}$/;
  return regex.test(pin);
};

export const validateIfsc = (ifsc: string): boolean => {
  const regex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  return regex.test(ifsc);
};

export const validateAccountNumber = (account: string): boolean => {
  const regex = /^\d{9,18}$/;
  return regex.test(account);
};

export const validateCIN = (cin: string): boolean => {
  const regex = /^[LU][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/;
  return regex.test(cin);
};

export const validateGSTIN = (gstin: string): boolean => {
  const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return regex.test(gstin);
};
