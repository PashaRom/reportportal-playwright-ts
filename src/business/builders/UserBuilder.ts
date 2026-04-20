import { User } from '@business/models/User';
import { RandomHelper } from '@core/utils/RandomHelper';

export class UserBuilder {
  private user: User = {
    login: `user_${RandomHelper.string(6)}`,
    password: 'Test@1234',
    email: RandomHelper.email('user'),
    role: 'USER',
  };

  withLogin(login: string): this {
    this.user.login = login;
    return this;
  }

  withPassword(password: string): this {
    this.user.password = password;
    return this;
  }

  withEmail(email: string): this {
    this.user.email = email;
    return this;
  }

  withRole(role: User['role']): this {
    this.user.role = role;
    return this;
  }

  build(): User {
    return { ...this.user };
  }
}
