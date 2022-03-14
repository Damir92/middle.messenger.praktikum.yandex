import * as pug from 'pug';

import { WebSocketComponent } from '../../../../api/web-socket';
import store, { Indexed } from '../../../../services/store';
import { connect } from '../../../../utils/connect';

import Block from '../../../../utils/Block';
import { Button } from '../../../../components/button/button';
import { FormInput } from '../../../../components/form-input/form-input';
import { Form } from '../../../../modules/form/form';
import { ChatsController } from '../../../../services/chat';

import { getDate, getTime } from '../../../../utils/date';
import { inputValidation } from '../../../../utils/validation';

import { chatsItemType } from './chats-main.types';

import { chatsBottomTemplate, messageTemplate } from './chats-main.template';
import { chatsMainTemplate } from './chats-main.template';

export class ChatsMain extends Block {
    private messagesCount: number;
    private socket: WebSocketComponent | null;
    private token: string | null;
    private userId: number | null;
    private prevDate: string;
    private oldMessages: chatsItemType[];
    private newMessages: chatsItemType[];
    private rerender: boolean;
    private messageListenerFn: () => void;
    private scrollListenerFn: () => void;

    constructor() {
        super('div');

        this.messagesCount;
        this.socket = null;

        this.token = null;
        this.userId = null;
        this.prevDate = '';
        this.oldMessages = [];
        this.newMessages = [];
        this.rerender = false;

        this.messageListenerFn = this.messageListener.bind(this);
        this.scrollListenerFn = this.scrollListener.bind(this)
    }

    private async getCount() {
        this.messagesCount = await new ChatsController().getNewMessagesCount(store.getState().activeChat);
    }

    private inputValidateHandler(component: FormInput): void {
        const el = component.element;
        const input = el.querySelector('input') as HTMLInputElement;
        if (!inputValidation({ name: input.name, value: input.value })) {
            el.classList.add('is-error')
        } else {
            el.classList.remove('is-error')
        }
    }

    private createMessageForm(): void {
        let inputMessage: FormInput;
        const messageForm = new Form({
            method: 'POST',
            template: chatsBottomTemplate(),
            submitCallback: (evt) => {
                if (evt?.message) {
                    this.socket?.sendMessage(evt.message, 'message');
                    inputMessage.setProps({ value: ' ' });
                }
            }
        });
        this.renderElement('.chats__bottom', messageForm);

        const attachButton = new Button({
            classNames: ['chats__attach'],
            btnType: 'button',
            text: ''
        });
        this.renderElement('.chats__bottom-wrap', attachButton);

        inputMessage = new FormInput({
            inputType: 'text',
            name: 'message',
            label: 'Сообщение',
            value: '',
            disabled: false,
            autocomplete: false,
            error: 'Сообщение не должно быть пустым',
            withLabelAnimation: true,
            validateCallback: () => {
                this.inputValidateHandler(inputMessage);
            }
        });
        this.renderElement('.chats__bottom-wrap', inputMessage);

        const sendButton = new Button({
            classNames: ['chats__send'],
            btnType: 'submit',
            text: ''
        });
        this.renderElement('.chats__bottom-wrap', sendButton);
    }

    private renderNewMessage(message: any, isNew = false) {
        const time = message.time;
        const humanizeTime = getTime(time);
        const humanizeDate = getDate(time);
        let messageDate = '';

        if (humanizeDate !== this.prevDate) {
            this.prevDate = humanizeDate;
            messageDate = humanizeDate;
        }

        const html = pug.render(messageTemplate(message.content, humanizeTime, messageDate, this.userId === message.user_id));

        this.element.querySelector('.chats__messages')?.insertAdjacentHTML('beforeend', html);

        if (isNew) {
            const container: HTMLElement | null = this.getElement().querySelector('.chats__messages')
            container?.scrollTo({
                behavior: 'smooth',
                top: container.scrollHeight
            });
        }
    }

    private messageListener(evt: MessageEvent) {
        const messages = JSON.parse(evt.data);

        if (Array.isArray(messages) && messages.length) {
            const container: HTMLElement | null = this.getElement().querySelector('.chats__messages');
            const scrollHeight: number = container?.scrollHeight || 0;

            if (this.rerender) {
                const children: NodeList = this.getElement().querySelectorAll('.chats__messages > div');
                children?.forEach(item => container?.removeChild(item));
            }

            this.oldMessages = [...this.oldMessages, ...messages];

            for (let i = this.oldMessages.length - 1; i >= 0; i--) {
                this.renderNewMessage(this.oldMessages[i]);
            }

            this.newMessages.forEach(message => {
                this.renderNewMessage(message);
            });

            if (this.rerender) {
                this.rerender = false;
                container?.scrollTo(0, scrollHeight);
            } else {
                container?.scrollTo(0, container.scrollHeight);
            }
        } else {
            if (messages.type === 'message') {
                this.newMessages.push(messages);
                this.renderNewMessage(messages, true);
            }
        }
    }

    private scrollListener() {
        if (!this.getElement().querySelector('.chats__messages')?.scrollTop) {
            this.rerender = true;
            this.socket?.sendMessage(`${this.oldMessages[this.oldMessages.length - 1].id}`, 'get old');
        }
    }

    private async initSocket() {
        if (!this.socket && store.getState().chatToken) {
            this.token = store.getState().chatToken;
            this.userId = store.getState().user.id;

            this.socket = new WebSocketComponent({
                userId: store.getState().user.id,
                chatId: store.getState().activeChat,
                token: store.getState().chatToken
            });

            this.socket.init();
            this.socket?.getSocket().addEventListener('message', this.messageListenerFn);
            this.socket.getSocket().addEventListener('open', () => {
                this.socket?.sendMessage('0', 'get old');
            });
        } else if (this.socket && store.getState().chatToken && store.getState().chatToken !== this.token) {
            this.socket.closeConnection();

            this.token = store.getState().chatToken;
            this.userId = store.getState().user.id;
            this.oldMessages = [];
            this.newMessages = [];

            this.socket = new WebSocketComponent({
                userId: store.getState().user.id,
                chatId: store.getState().activeChat,
                token: store.getState().chatToken
            });

            this.socket.init();
        } else if (this.socket && !store.getState().chatToken) {
            this.socket.closeConnection();
            this.socket = null;
            this.token = null;
            this.userId = null;
            this.oldMessages = [];
            this.newMessages = [];
        }
    }

    public render(): string {
        return pug.render(chatsMainTemplate());
    }

    public componentDidMount() {
        this.getElement().classList.add('chats__main');

        this.createMessageForm();

        this.getCount();
        this.initSocket();
    }

    public componentDidUpdate(): boolean {
        this.createMessageForm();
        this.initSocket();

        this.getElement().querySelector('.chats__messages')?.addEventListener('scroll', this.scrollListenerFn)

        return true;
    }
}

function mapStateToProps(state: Indexed) {
    return {
        messages: state.messages,
        chatToken: state.chatToken,
    };
}

export default connect(ChatsMain, mapStateToProps);
