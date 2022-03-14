import './popup.scss';

import * as pug from 'pug';

import Block from '../../utils/Block';
import { popupTemplate } from './popup.template';

export class Popup extends Block {
    constructor() {
        super('div')
    }

    public render(): string {
        return pug.render(popupTemplate());
    }

    public componentDidMount(): void {
        this.element.classList.add('popup');

        this.getElement().querySelector('.popup__overlay')?.addEventListener('click', () => {
            this.destroyElement();
        })
    }
}
