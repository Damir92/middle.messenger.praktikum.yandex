import './chats-menu.scss';

import * as pug from 'pug';

import Block from '@/utils/Block';
import { Button } from '@/components/button/button';

export class ChatsMenu extends Block {
    constructor() {
        super({})
    }

    private menuBtnListener() {
        console.log(this.getElement())
        this.getElement().classList.toggle('is-active');
    }

    private createMenuBtn(): void {
        const btn = new Button({
            classNames: [ 'chats__open-menu' ],
            btnType: 'button',
            text: 'Меню',
            clickCallback: () => {
                this.menuBtnListener()
            }
        });

        this.renderElement('.chats__menu-wrap', btn);
    }

    public render() {
        return pug.render('');
    }

    public componentDidMount(): void {
        this.getElement().classList.add('chats__menu');

        this.createMenuBtn();
    }
}
