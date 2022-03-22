import * as pug from 'pug';
import store from '../../../../services/store';
import { UserController } from '../../../../services/user';

import Block from '../../../../utils/Block';

import { avatarTemplate } from './avatar.template';

class Avatar extends Block {
    constructor() {
        super('form', {});
    }

    public render() {
        return pug.render(avatarTemplate);
    }

    public componentDidMount() {
        const input = this.getElement().querySelector('input');
        const imgWrap = this.getElement().querySelector('img');
        const formData = new FormData();

        if (imgWrap && store.getState().user?.avatar) {
            imgWrap.src = `https://ya-praktikum.tech/api/v2/resources${store.getState().user.avatar}`;
        }

        input?.addEventListener('input', async () => {
            formData.append('avatar', input?.files[0])

            const user = await new UserController().changeAvatar(formData);
            store.set('user', user)
        })
    }

    public componentDidUpdate() {
        return true;
    }
}

export { Avatar };
