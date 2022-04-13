import './chats-top.scss';

import Block from '../../../../utils/Block';
import { Button } from '../../../../components/button/button';
import { Popup } from '../../../../components/popup/popup';
import { PopupAddUser } from '../popup-add-user/popup-add-user';
import { PopupDeleteUser } from '../popup-delete-user/popup-delete-user';

import store from '../../../../services/store';

const chatsTopTemplate = require('./chats-top-template.pug');

class ChatsTop extends Block {
    constructor() {
        super({})

        this.renderAddUserPopup = this.renderAddUserPopup.bind(this);
    }

    public renderAddUserPopup(): void {
        const popup = new Popup();
        popup.renderElement('.popup__wrap', new PopupAddUser({
            closePopupCallback: () => {
                popup.destroyElement()
            }
        }))
        this.renderElement('.chats__popup', popup);
    }

    public renderDeleteUserPopup(): void {
        const popup = new Popup()
        popup.renderElement('.popup__wrap', new PopupDeleteUser({
            closePopupCallback: () => {
                popup.destroyElement()
            }
        }))
        this.renderElement('.chats__popup', popup);
    }

    private createMenuBtn(): void {
        const btn = new Button({
            classNames: [ 'chats__open-menu' ],
            btnType: 'button',
            text: '<svg width="3" height="16" viewBox="0 0 3 16" xmlns="http://www.w3.org/2000/svg"><circle cx="1.5" cy="2" r="1.5" fill="currentColor"/><circle cx="1.5" cy="8" r="1.5" fill="currentColor"/><circle cx="1.5" cy="14" r="1.5" fill="currentColor"/></svg>'
        });

        this.renderElement('.chats__menu-wrap', btn);
    }

    private addUserBtn(): void {
        const btn = new Button({
            classNames: [ 'chats__menu-btn', 'chats__menu-btn--add' ],
            btnType: 'button',
            text: '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="10.25" stroke="#3369F3" stroke-width="1.5"/><path stroke="#3369F3" stroke-width="1.5" d="M11 5.5v11M5.5 11h11"/></svg> Добавить пользователя',
            clickCallback: () => {
                this.renderAddUserPopup();
            }
        });

        this.renderElement('.chats__menu-list', btn)
    }

    private deleteUserBtn(): void {
        const btn = new Button({
            classNames: [ 'chats__menu-btn', 'chats__menu-btn--delete' ],
            btnType: 'button',
            text: '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="10.25" stroke="#3369F3" stroke-width="1.5"/><path stroke="#3369F3" stroke-width="1.5" d="M11 5.5v11M5.5 11h11"/></svg> Удалить пользователя',
            clickCallback: () => {
                this.renderDeleteUserPopup();
            }
        })

        this.renderElement('.chats__menu-list', btn)
    }

    public render() {
        const activeChat = (store.getState().chats as any[]).find(item => item.id === store.getState().activeChat);

        return chatsTopTemplate({ title: activeChat.title });
    }

    public componentDidMount(): void {
        this.element.classList.add('chats__top');

        this.createMenuBtn();
        this.addUserBtn();
        this.deleteUserBtn();
    }
}

export { ChatsTop }
