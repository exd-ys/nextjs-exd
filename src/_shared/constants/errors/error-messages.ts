export const ERRORS = {
  unexpectedError: 'unexpected-error',
  wrongPassword: 'wrong-password',
  invalidCredentials: 'auth/invalid-login-credentials',
  unauthorized: 'unauthorized',
}

export const ERROR_MESSAGES: Record<string, string> = {
  [ERRORS.invalidCredentials]: 'Incorrect email address or password.',
  [ERRORS.wrongPassword]:
    'Incorrect email address or password. Please check your credentials and try again.',
  [ERRORS.unexpectedError]:
    'An unexpected error occurred when processing this request. Please try again later.',
}
