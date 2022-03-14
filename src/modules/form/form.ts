import * as pug from 'pug';

import './form.scss';

import Block from '../../utils/Block';

import { inputValidation } from '../../utils/validation';

import { formType } from './form.types';

class Form extends Block {
    constructor(formProps: formType) {
        super('form', {
            method: formProps.method,
            template: formProps.template,
            callback: formProps.submitCallback,
            additionalValidation: formProps.additionalValidation
        });
    }

    public render() {
        if (this.props.template) {
            return pug.render(this.props.template);
        }

        return '';
    }

    public formSubmitHandler(evt: Event): void {
        evt.preventDefault();
        evt.stopPropagation();

        const formElement = evt.target as HTMLFormElement;

        const wraps: HTMLElement[] = [].slice.call(formElement.querySelectorAll('div'));
        const form: Record<string, string | number> = {};
        let isValid = true;

        wraps.forEach(item => {
            const input: HTMLInputElement | null = item.querySelector('input');
            if (input) {
                if (inputValidation({ name: input.name, value: input.value })) {
                    form[input.name] = input.value;
                    item.classList.remove('is-error');
                } else {
                    isValid = false;
                    item.classList.add('is-error');
                }
            }
        })

        if (isValid) {
            if (this.props.additionalValidation) {
                if (this.props.additionalValidation(wraps)) {
                    this.props.callback(form);
                }
            } else {
                this.props.callback(form);
            }
        }
    }

    public componentDidMount(): void {
        this.formSubmitHandler = this.formSubmitHandler.bind(this)

        this.element.setAttribute('method', this.props.method);
        this.element.setAttribute('action', '/')
        this.element.addEventListener('submit', this.formSubmitHandler)
    }

    public componentDidUpdate(): boolean {
        this.element.removeEventListener('submit', this.formSubmitHandler);

        this.formSubmitHandler = this.props.callback.bind(this);

        this.element.addEventListener('submit', this.formSubmitHandler)

        return true;
    }
}

export { Form };
