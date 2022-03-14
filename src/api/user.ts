import HTTP from '../utils/HTTPTransport';

import { changePasswordType, loginType, profileType } from '../pages/profile/profile.types';

const userAPIInstance = new HTTP('https://ya-praktikum.tech/api/v2/user');

export class UserAPI {
    public changeProfile(payload: profileType) {
        return userAPIInstance.put('/profile', { data: payload, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    }

    public changeAvatar(payload: FormData) {
        return userAPIInstance.put('/profile/avatar', { data: payload })
    }

    public changePassword(payload: changePasswordType) {
        return userAPIInstance.put('/password', { data: payload })
    }

    public searchUserByLogin(payload: loginType) {
        return userAPIInstance.post('/search', { data: payload, headers: { 'Content-Type': 'application/json; charset=utf-8' } })
    }
}
