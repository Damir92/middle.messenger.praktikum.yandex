import { AuthAPI } from '../api/auth';

export class AuthController {
    public signUp(payload: any) {
        new AuthAPI().signup(payload)
            .then(() => {
                window.location.href = '/messenger'
            })
            .catch(err => {
                console.log(err)
            })
    }

    public signIn(payload: any) {
        new AuthAPI().signin(payload)
            .then((data: any) => {
                if (data?.response === 'OK') {
                    window.location.href = '/messenger'
                } else {
                    window.location.href = '/404'
                }
            })
    }

    public signOut() {
        new AuthAPI().signout()
            .then(() => {
                window.location.href = '/'
            })
    }

    public async user() {
        let result: any = false;
        await new AuthAPI().user()
            .then((data: any) => {
                result = data;
            })

        return result;
    }
}
