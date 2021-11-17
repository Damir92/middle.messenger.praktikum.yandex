import './chats.scss';

import * as pug from 'pug';

import Block from '../../utils/Block';
import { Form } from '../../modules/form/form';
import { Button } from '../../components/button/button';
import { ChatsItem } from './modules/chats-item/chats-item';
import { FormInput } from '../../components/form-input/form-input';

import { inputValidation } from '../../utils/validation';

import { chatsBottom, chatsTemplate } from './chats.template';

import { chatsMock } from './chats.mock';

class Chats extends Block {
    constructor() {
        super('div')
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
        const messageForm = new Form({
            method: 'POST',
            template: chatsBottom,
            submitCallback: () => {}
        });
        this.renderElement('.chats__bottom', messageForm);

        const attachButton = new Button({
            classNames: ['chats__attach'],
            btnType: 'button',
            text: ''
        });
        this.renderElement('.chats__bottom-wrap', attachButton);

        const inputMessage = new FormInput({
            inputType: 'text',
            name: 'message',
            label: 'Сообщение',
            value: '',
            disabled: false,
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

    public render() {
        return pug.render(chatsTemplate);
    }

    public componentDidMount(): void {
        this.element.classList.add('chats');

        chatsMock.forEach(item => {
            const chatsItem = new ChatsItem(item);
            this.renderElement('.chats__list', chatsItem);
        });

        this.createMessageForm();
    }
}

const render = (query: string, block: Block) => {
    const root = document.querySelector(query);

    if (root) {
        root.appendChild(block.getContent());
    }

    return root;
};

const page = new Chats();

render('.root', page);
