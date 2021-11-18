import './button.scss';

import * as pug from 'pug';

import Block from '../../utils/Block';

import { buttonTemplate } from './button.template';
import { buttonType } from './button.types';

class Button extends Block {
    private clickHandler: () => {};

    constructor(btnProps: buttonType) {
        super('div', {
            classNames: btnProps.classNames,
            btnType: btnProps.btnType,
            text: btnProps.text,
            callback: btnProps.clickCallback
        });
    }

    public render() {
        const content = buttonTemplate({
            classNames: this.props.classNames,
            btnType: this.props.btnType,
            text: this.props.text
        })
        return pug.render(content)
    }

    public componentDidMount() {
        this.clickHandler = this.props.callback?.bind(this);
        this.element.querySelector('button')?.addEventListener('click', this.clickHandler)
    }

    public componentDidUpdate() {
        this.element.querySelector('button')?.removeEventListener('click', this.clickHandler);

        this.clickHandler = this.props.callback?.bind(this);

        this.element.querySelector('button')?.addEventListener('click', this.clickHandler)

        return true;
    }
}

export { Button }
