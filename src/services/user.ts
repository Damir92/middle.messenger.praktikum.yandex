import { UserAPI } from '../api/user';

import { changePasswordType, loginType, profileType } from '../pages/profile/profile.types';

export class UserController {
    public async changeProfile(payload: profileType) {
        let result: any = null;
        await new UserAPI().changeProfile(payload)
            .then((data: any) => {
                result = JSON.parse(data.response);
            })

        return result;
    }

    public async changePassword(payload: changePasswordType) {
        let result: any = null;

        await new UserAPI().changePassword(payload)
            .then((data: any) => {
                result = data;
            })

        return result;
    }

    public async changeAvatar(payload: FormData) {
        let result: any = null;

        await new UserAPI().changeAvatar(payload)
            .then((data: any) => {
                result = JSON.parse(data.response);
            })

        return result;
    }

    public async searchUserByLogin(payload: loginType) {
        let result: any = null;

        await new UserAPI().searchUserByLogin(payload)
            .then((data: any) => {
                result = JSON.parse(data.response)
            })

        return result;
    }
}
