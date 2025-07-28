import {
  EmailRequirement,
  PasswordRequirement,
  PhoneNumberRequirement,
} from '@/_shared/enums/validations'

export const PASSWORD_MIN_LENGTH = 8

export const FIELD_ERROR_MESSAGES: Record<
  string,
  (fieldName: string) => string
> = {
  required: (fieldName) => `${fieldName} is required`,
  notEmpty: (fieldName) => `${fieldName} must not be empty`,
  numeric: (fieldName) => `${fieldName} must be numeric`,
  mustMatch: (fieldName) => `${fieldName} must match`,
  email: (fieldName) => `${fieldName} must be a valid email address`,
  [PasswordRequirement.lowerCase]: (fieldName) =>
    `${fieldName} must contain a lowercase letter`,
  [PasswordRequirement.upperCase]: (fieldName) =>
    `${fieldName} must contain an uppercase letter`,
  [PasswordRequirement.number]: (fieldName) =>
    `${fieldName} must contain a number`,
  [PasswordRequirement.specialCharacter]: (fieldName) =>
    `${fieldName} must contain a special character`,
  [PasswordRequirement.length]: (fieldName) =>
    `${fieldName} must contain at least ${PASSWORD_MIN_LENGTH} characters`,
  [EmailRequirement.emailExistsNotAllowed]: (fieldName) =>
    'Email already exists.',
  [EmailRequirement.freeEmailNotAllowed]: (fieldName) =>
    'Cannot register using a free email. Please use your organization email.',
  [EmailRequirement.disposableEmailNotAllowed]: (fieldName) =>
    'Cannot register using a disposable email. Please use your organization email.',
  [PhoneNumberRequirement.invalidNumber]: (fieldName) =>
    `${fieldName} is not a valid phone number.`,
  [PhoneNumberRequirement.invalidCountryCode]: (fieldName) =>
    `${fieldName} has invalid country code.`,
  [PhoneNumberRequirement.tooLong]: (fieldName) => `${fieldName} is too long.`,
  [PhoneNumberRequirement.tooShort]: (fieldName) =>
    `${fieldName} is too short.`,
}
