import { loginComplete } from '../actions/LoginActionCreators';
import { post } from './Request';

export function login({ email, password }) {
  return post('/v1/auth/login', { email, password })
    .then(res => res.json())
    .then(res => {
      loginComplete(res);
      return res;
    });
}
