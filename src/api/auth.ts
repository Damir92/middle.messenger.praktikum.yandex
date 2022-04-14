import HTTP from '../utils/HTTPTransport';

import { RegistrationType } from '../pages/registration/registration.types';
import { AuthType } from '../pages/auth/auth.types';

const authAPIInstance = new HTTP('https://ya-praktikum.tech/api/v2/auth');

export class AuthAPI {
    public signup(payload: RegistrationType) {
        return authAPIInstance.post('/signup', { data: payload, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    }

    public signin(payload: AuthType) {
        return authAPIInstance.post('/signin', { data: payload, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    }

    public signout() {
        return authAPIInstance.post('/logout')
    }

    public user() {
        return authAPIInstance.get('/user');
    }
}
