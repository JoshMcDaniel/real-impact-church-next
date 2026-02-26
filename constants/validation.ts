
export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const phoneNumberRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

export const nameRegex = /^[a-zA-Z\s'\-]+$/;

// ─── Email ────────────────────────────────────────────────────────────────────

export const emailInputProps = {
  maxLength: 50,
  minLength: 5,
};

export const isValidEmail = (email: string): boolean => {
  const trimmed = email.trim();
  return (
    !!trimmed &&
    trimmed.length >= emailInputProps.minLength &&
    trimmed.length <= emailInputProps.maxLength &&
    !!trimmed.match(emailRegex)
  );
};

export const getEmailError = (email: string): string | null => {
  if (!email) return null;
  if (!email.match(emailRegex)) return 'Enter a valid email address';
  if (email.length > emailInputProps.maxLength) return `Must be ${emailInputProps.maxLength} characters or fewer`;
  return null;
};

// ─── Name ─────────────────────────────────────────────────────────────────────

export const nameInputProps = {
  maxLength: 30,
  minLength: 2,
};

export const isValidName = (name: string): boolean => {
  const trimmed = name.trim();
  return (
    !!trimmed &&
    trimmed.length >= nameInputProps.minLength &&
    trimmed.length <= nameInputProps.maxLength &&
    nameRegex.test(trimmed)
  );
};

export const getNameError = (name: string): string | null => {
  if (!name) return null;
  const trimmed = name.trim();
  if (!nameRegex.test(trimmed)) return 'Only letters, hyphens, and apostrophes allowed';
  if (trimmed.length < nameInputProps.minLength) return `Must be at least ${nameInputProps.minLength} characters`;
  if (trimmed.length > nameInputProps.maxLength) return `Must be ${nameInputProps.maxLength} characters or fewer`;
  return null;
};

export const toTitleCase = (value: string): string =>
  value.replace(/\b\w/g, (char) => char.toUpperCase());

// ─── Phone ────────────────────────────────────────────────────────────────────

export const phoneNumberInputProps = {
  maxLength: 14, // (XXX) XXX-XXXX
};

export const formatPhoneNumber = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

export const isValidPhoneNumber = (phoneNumber: string | number): boolean => {
  const pn = phoneNumber?.toString();
  return !!pn && !!pn.match(phoneNumberRegex);
};

export const getPhoneError = (phoneNumber: string): string | null => {
  if (!phoneNumber) return null;
  if (!phoneNumber.match(phoneNumberRegex)) return 'Enter a 10-digit US phone number';
  return null;
};

// ─── Comments ─────────────────────────────────────────────────────────────────

export const commentsInputProps = {
  maxLength: 500,
};

export const getCommentsError = (comments: string): string | null => {
  if (!comments) return null;
  if (comments.length > commentsInputProps.maxLength)
    return `Must be ${commentsInputProps.maxLength} characters or fewer`;
  return null;
};
