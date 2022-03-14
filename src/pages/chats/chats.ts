import './chats.scss';

import * as pug from 'pug';

import Block from '../../utils/Block';
import store from '../../services/store';

import ChatsItem from './modules/chats-item/chats-item';

import { chatsTemplate } from './chats.template';

import { ChatsController } from '../../services/chat';
import ChatsActive from './modules/chats-active/chats-active';
import { chatsItemType } from './modules/chats-item/chats-item.types';

export class ChatsPage extends Block {
    constructor() {
        super('div')
    }

    public async getChats() {
        const chats = await new ChatsController().getChats();
        store.set('chats', chats)

        chats?.forEach((item: chatsItemType) => {
            const chatsItem = new ChatsItem(item);
            this.renderElement('.chats__list', chatsItem);
        });
    }

    public async createChat(title: string) {
        const chats = await new ChatsController().createChat({ title });
        store.set('chats', chats)
    }

    public render() {
        return pug.render(chatsTemplate);
    }

    public componentDidMount(): void {
        this.getChats();
        this.element.classList.add('chats');

        const form: HTMLFormElement | null = this.element.querySelector('.chats__form-create form')
        form?.addEventListener('submit', evt => {
            evt.preventDefault();

            this.createChat(form.title?.value)
        })

        const activeChat = new ChatsActive();
        this.renderElement('.chats__body', activeChat);
    }

    public componentDidUpdate(): boolean {
        return true;
    }
}
