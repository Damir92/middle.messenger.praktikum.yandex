import './chats-item.scss';

import * as pug from 'pug';

import Block from '../../../../utils/Block';

import { chatsItemTemplate } from './chats-item.template';

import { chatsItemType } from './chats-item.types';

class ChatsItem extends Block {
    constructor(chatsItemProps: chatsItemType) {
        super('button', {
            name: chatsItemProps.name,
            date: chatsItemProps.date,
            isYours: chatsItemProps.isYours,
            message: chatsItemProps.message,
            unreadable: chatsItemProps.unreadable
        })
    }

    public render() {
        return pug.render(chatsItemTemplate({
            name: this.props.name,
            date: this.props.date,
            isYours: this.props.isYours,
            message: this.props.message,
            unreadable: this.props.unreadable
        }));
    }

    public componentDidMount(): void {
        this.element.classList.add('chats__item');
        this.element.setAttribute('type', 'button');
    }
}

export { ChatsItem }
