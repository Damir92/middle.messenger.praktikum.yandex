import store from '../../../../services/store';

import Block from '../../../../utils/Block';
import { Form } from '../../../../modules/form/form';
import { FormInput } from '../../../../components/form-input/form-input';
import { Button } from '../../../../components/button/button';

import { UserController } from '../../../../services/user';
import { ChatsController } from '../../../../services/chat';

import { LoginType } from '../../../profile/profile.types';
import { PopupAddUserPropsType } from './popup-add-user.types';

const popupAddUserTemplate = require('./popup-add-user-template.pug');

export class PopupAddUser extends Block {
    private readonly closePopupCallback: () => void

    public form: Form | null
    public input: FormInput | null

    constructor({ closePopupCallback }: PopupAddUserPropsType) {
        super({})

        this.closePopupCallback = closePopupCallback

        this.form = null
        this.input = null
    }

    public createForm(): void {
        const form = new Form({
            method: 'PUT',
            submitCallback: async (data: LoginType) => {
                console.log(data);

                if (data && data.login) {
                    const users = await new UserController().searchUserByLogin(data);

                    console.log(users);


                    if (users && users.length) {
                        const userId = users[0].id;
                        const chatId = store.getState().activeChat;

                        const res = await new ChatsController().addUserToChat({
                            users: [ userId ],
                            chatId
                        });

                        if (res === 'OK') {
                            this.closePopupCallback();
                        }
                    } else {
                        this.input?.element.classList.add('is-error');
                    }
                }
            }
        });

        this.renderElement('.popup__form-wrap', form);

        const input = new FormInput({
            inputType: 'text',
            name: 'login',
            label: 'Логин',
            value: '',
            disabled: false,
            error: 'Пользователь не найден',
            withLabelAnimation: true,
            validateCallback: () => {}
        });

        const buttonSubmit = new Button({
            classNames: ['button', 'popup__btn'],
            clickCallback: () => {},
            btnType: 'submit',
            text: 'Добавить',
        });

        this.renderElement('.popup__form-wrap form', input);
        this.renderElement('.popup__form-wrap form', buttonSubmit);
    }

    public render(): string {
        return popupAddUserTemplate();
    }

    public componentDidMount(): void {
        this.element.classList.add('popup__add-user');

        this.createForm();
    }
}
