import './button.scss';

import Block from '../../utils/Block';

import { buttonType } from './button.types';

const buttonTemplate = require('./button-template.pug');

class Button extends Block {
    private clickHandler: () => void;

    constructor(btnProps: buttonType) {
        super({ props: {
            classNames: btnProps.classNames,
            btnType: btnProps.btnType,
            text: btnProps.text,
            callback: btnProps.clickCallback
        } });
    }

    public render() {
        return buttonTemplate({
            classNames: this.props.classNames.join(' '),
            btnType: this.props.btnType,
            text: this.props.text
        });
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
