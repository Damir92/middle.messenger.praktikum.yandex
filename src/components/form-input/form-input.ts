import './form-input.scss';

import Block from '../../utils/Block';

import { FormInputType } from './form-input.types';

const formInputTemplate = require('./form-input-template.pug');

class FormInput extends Block {
    private validateHandler: () => {};
    private inputElement: HTMLInputElement | null;
    private labelElement: HTMLElement | null;

    constructor(inputProps: FormInputType) {
        super({ props: { inputType: inputProps.inputType,
            name: inputProps.name,
            label: inputProps.label,
            value: inputProps.value,
            disabled: inputProps.disabled,
            autocomplete: inputProps.autocomplete,
            error: inputProps.error,
            withLabelAnimation: inputProps.withLabelAnimation,
            validateCallback: inputProps.validateCallback } });
    }

    private inputHandler(): void {
        this.element.classList.remove('is-error');
    }

    private labelAnimationHandler(): void {
        const activeClass = 'is-active';

        if (!this.inputElement?.value.trimStart()) {
            this.setProps({ value: this.inputElement?.value.trimStart() });
        }

        if (this.inputElement?.value.length) {
            this.labelElement?.classList.add(activeClass);
        } else {
            this.labelElement?.classList.remove(activeClass);
        }
    }

    public render() {
        return formInputTemplate({
            inputType: this.props.inputType,
            name: this.props.name,
            label: this.props.label,
            value: this.props.value,
            disabled: this.props.disabled,
            autocomplete: this.props.autocomplete,
            error: this.props.error
        })
    }

    public componentDidMount(): void {
        this.element.classList.add('form-input');

        this.inputElement = this.element.querySelector('input');
        this.labelElement = this.element.querySelector('label');

        this.validateHandler = this.props.validateCallback?.bind(this);
        this.labelAnimationHandler = this.labelAnimationHandler.bind(this);
        this.inputHandler = this.inputHandler.bind(this);

        this.inputElement?.addEventListener('blur', this.validateHandler);
        this.inputElement?.addEventListener('focus', this.validateHandler);
        this.inputElement?.addEventListener('input', this.inputHandler);

        if (this.props.withLabelAnimation) {
            this.inputElement?.addEventListener('input', this.labelAnimationHandler);
            this.inputElement?.addEventListener('change', this.labelAnimationHandler);
            this.labelAnimationHandler();
        }
    }

    public componentDidUpdate(): boolean {
        this.inputElement?.removeEventListener('blur', this.validateHandler);
        this.inputElement?.removeEventListener('focus', this.validateHandler);
        this.inputElement?.removeEventListener('input', this.labelAnimationHandler);
        this.inputElement?.removeEventListener('input', this.inputHandler);

        this.validateHandler = this.props.validateCallback?.bind(this);

        this.inputElement = this.element.querySelector('input');
        this.labelElement = this.element.querySelector('label');

        this.inputElement?.addEventListener('blur', this.validateHandler);
        this.inputElement?.addEventListener('focus', this.validateHandler);
        this.inputElement?.addEventListener('input', this.inputHandler);

        if (this.props.withLabelAnimation) {
            this.inputElement?.addEventListener('input', this.labelAnimationHandler);
            this.inputElement?.addEventListener('change', this.labelAnimationHandler);
            this.labelAnimationHandler();
        }

        return true;
    }
}

export { FormInput }
