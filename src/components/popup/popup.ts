import './popup.scss';

import Block from '../../utils/Block';

const popupTemplate = require('./popup-template.pug');

export class Popup extends Block {
    constructor() {
        super({})
    }

    public render(): string {
        return popupTemplate();
    }

    public componentDidMount(): void {
        this.element.classList.add('popup');

        this.getElement().querySelector('.popup__overlay')?.addEventListener('click', () => {
            this.destroyElement();
        })
    }
}
