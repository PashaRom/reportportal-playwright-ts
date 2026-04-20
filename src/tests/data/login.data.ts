export const LoginCredentials = {
  valid: {
    login: 'superadmin',
    password: 'erebus',
  },
  invalid: {
    login: 'unknown_user',
    password: 'wrong_password',
  },
} as const;
