export interface User {
  login: string;
  password: string;
  email?: string;
  fullName?: string;
  role?: 'ADMINISTRATOR' | 'USER';
}
