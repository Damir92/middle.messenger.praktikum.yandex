import HTTP from '../utils/HTTPTransport';

import { registrationType } from '../pages/registration/registration.types';
import { authType } from '../pages/auth/auth.types';

const authAPIInstance = new HTTP('https://ya-praktikum.tech/api/v2/auth');

export class AuthAPI {
    public signup(payload: registrationType) {
        return authAPIInstance.post('/signup', { data: payload, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    }

    public signin(payload: authType) {
        return authAPIInstance.post('/signin', { data: payload, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    }

    public signout() {
        return authAPIInstance.post('/logout')
    }

    public user() {
        return authAPIInstance.get('/user');
    }
}
