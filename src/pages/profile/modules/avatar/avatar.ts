import store from '../../../../services/store';
import { UserController } from '../../../../services/user';

import Block from '../../../../utils/Block';

const avatarTemplate = require('./avatar-template.pug');

class Avatar extends Block {
    constructor() {
        super({ tagName: 'form' });
    }

    public render() {
        return avatarTemplate();
    }

    public componentDidMount() {
        const input = this.getElement().querySelector('input');
        const imgWrap = this.getElement().querySelector('img');
        const formData = new FormData();

        if (imgWrap && store.getState().user?.avatar) {
            imgWrap.src = `https://ya-praktikum.tech/api/v2/resources${store.getState().user.avatar}`;
        }

        input?.addEventListener('input', async () => {
            if (input?.files) {
                formData.append('avatar', input?.files[0])

                const user = await new UserController().changeAvatar(formData);
                store.set('user', user)
            }
        })
    }

    public componentDidUpdate() {
        return true;
    }
}

export { Avatar };
