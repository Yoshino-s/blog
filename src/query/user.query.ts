import { query, Return } from './query';

type LoginReturn = {
  jwt?: string
};
export function login(username: string, password: string): Promise<Return<LoginReturn>> {
  return query('/user/login', {
    method: 'POST',
    body: {
      username, password
    }
  });
}

export function register(username: string, password: string, email: string): Promise<Return> {
  return query('/user/register', {
    method: 'POST',
    body: {
      username, password, email
    }
  });
}

type UserInfo = {
  name: string,
  email: string,
  introduction: string,
  avatar: string
}

export function profile(): Promise<Return<UserInfo>> {
  return query('/user/profile', {jwt: true});
}