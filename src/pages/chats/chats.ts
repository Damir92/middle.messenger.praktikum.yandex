import './chats.scss';

import Block from '../../utils/Block';
import store from '../../services/store';

import ChatsItem from './modules/chats-item/chats-item';

import { ChatsController } from '../../services/chat';
import ChatsActive from './modules/chats-active/chats-active';
import { ChatsItemType } from './modules/chats-item/chats-item.types';

const chatsTemplate = require('./chats-template.pug');

export class ChatsPage extends Block {
    constructor() {
        super({ tagName: 'div' })
    }

    public async getChats() {
        const chats = await new ChatsController().getChats();
        store.set('chats', chats)

        chats?.forEach((item: ChatsItemType) => {
            const chatsItem = new ChatsItem({ props: item });
            this.renderElement('.chats__list', chatsItem);
        });
    }

    public async createChat(title: string) {
        const chats = await new ChatsController().createChat({ title });
        store.set('chats', chats)
    }

    public render() {
        return chatsTemplate();
    }

    public componentDidMount(): void {
        this.getChats();
        this.element.classList.add('chats');

        const form: HTMLFormElement | null = this.element.querySelector('.chats__form-create form')
        form?.addEventListener('submit', evt => {
            evt.preventDefault();

            this.createChat((form.title as any)?.value)
        })

        const activeChat = new ChatsActive({});
        this.renderElement('.chats__body', activeChat);
    }

    public componentDidUpdate(): boolean {
        return true;
    }
}
