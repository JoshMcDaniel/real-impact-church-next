
export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const phoneNumberRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

export const emailInputProps = {
  maxLength: 50,
  minLength: 12,
}

export const isValidEmail = (email: string): boolean => {
  return !!email &&
    email.length >= emailInputProps.minLength &&
    email.length <= emailInputProps.maxLength &&
    !!email.match(emailRegex)
}

export const nameInputProps = {
  maxLength: 20,
  minLength: 2,
}

export const isValidName = (name: string): boolean => {
  return !!name && name.length >= nameInputProps.minLength && name.length <= nameInputProps.maxLength;
}

export const phoneNumberInputProps = {
  maxLength: 13,
}

export const isValidPhoneNumber = (phoneNumber: string | number): boolean => {
  const pn = phoneNumber?.toString();
  return !!pn &&
    pn.length <= phoneNumberInputProps.maxLength &&
    !!pn.match(phoneNumberRegex)
}