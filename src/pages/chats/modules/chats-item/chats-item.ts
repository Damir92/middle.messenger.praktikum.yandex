import './chats-item.scss';

import * as pug from 'pug';

import store, { Indexed } from '../../../../services/store';
import { connect } from '../../../../utils/connect';
import { ChatsController } from '../../../../services/chat';

import Block from '../../../../utils/Block';

import { chatsItemTemplate } from './chats-item.template';
class ChatsItem extends Block {
    constructor(chatsItemProps: any) {
        super('button', {
            id: chatsItemProps.id,
            title: chatsItemProps.title,
            date: chatsItemProps.date,
            isYours: chatsItemProps.isYours,
            last_message: chatsItemProps.last_message,
            unread_count: chatsItemProps.unread_count
        });
    }

    public render() {
        return pug.render(chatsItemTemplate({
            id: this.props.id,
            title: this.props.title,
            date: this.props.last_message?.time,
            isYours: this.props.isYours,
            last_message: this.props.last_message,
            unread_count: this.props.unread_count
        }));
    }

    public componentDidMount(): void {
        this.element.classList.add('chats__item');
        this.element.setAttribute('type', 'button');
        this.element.setAttribute('data-id', this.props.id);

        this.element.addEventListener('click', async () => {
            if (store.getState().activeChat === this.props.id) {
                store.set('activeChat', null);
                store.set('chatToken', null);
            } else {
                store.set('chatToken', null);

                const res = await new ChatsController().getChatToken(this.props.id);

                if (res.token) {
                    store.set('activeChat', this.props.id);
                    store.set('chatToken', res.token);
                }
            }
        })
    }

    public componentDidUpdate(): boolean {
        if (store.getState().activeChat === this.props.id) {
            this.element.classList.add('is-active');
        } else {
            this.element.classList.remove('is-active');
        }

        return true;
    }
}

function mapStateToProps(state: Indexed) {
    return {
        activeChat: state.activeChat,
    };
}

export default connect(ChatsItem, mapStateToProps);
