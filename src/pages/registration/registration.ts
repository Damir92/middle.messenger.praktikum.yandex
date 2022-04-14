import './registration.scss';

import Block from '../../utils/Block';

import { connect } from '../../utils/connect';
import { Indexed } from '../../services/store';

import { AuthController } from '../../services/auth';

import { Form } from '../../modules/form/form';
import { FormInput } from '../../components/form-input/form-input';
import { Button } from '../../components/button/button';

import { inputValidation } from '../../utils/validation';

import { RegistrationType } from './registration.types';

const registationFormLinkTemplate = require('./registration-form-link-template.pug');
const registrationTemplate = require('./registration-template.pug');
const registrationFormTemplate = require('./registration-form-template.pug');

class RegistrationPage extends Block {
    private form: Form

    constructor() {
        super();

        this.sendForm = this.sendForm.bind(this);
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

    public checkPasswords(elements: HTMLElement[]): boolean {
        const passwords: Record<string, {value: string, el: HTMLElement}> = {};

        elements.forEach((item: HTMLElement) => {
            const input = item.querySelector('input');

            if (input && ['password', 'requirePassword'].includes(input.name)) {
                passwords[input.name] = {
                    value: input.value,
                    el: item
                };
            }
        })

        if (passwords.password?.value === passwords.requirePassword?.value) {
            passwords.requirePassword?.el?.classList.remove('is-error') ;
            return true;
        } else {
            passwords.requirePassword?.el?.classList.add('is-error') ;
            return false;
        }
    }

    public sendForm(form: RegistrationType): void {
        const { first_name, second_name, login, email, password, phone } = form;
        new AuthController().signUp({ first_name, second_name, login, email, password, phone })
    }

    private createForm(): void {
        this.form = new Form({
            method: 'POST',
            template: registrationFormTemplate,
            submitCallback: this.sendForm,
            additionalValidation: (elements): boolean => {
                return this.checkPasswords(elements);
            }
        });

        this.renderElement('.registration-page__form-wrap', this.form);

        const inputEmail = new FormInput({
            inputType: 'email',
            name: 'email',
            label: 'Почта',
            value: 'pochta@yandex.ru',
            disabled: false,
            error: 'Почта должна соответствовать формату xxx@xxx.xx',
            withLabelAnimation: true,
            validateCallback: () => {
                this.inputValidateHandler(inputEmail);
            }
        });

        const inputLogin = new FormInput({
            inputType: 'text',
            name: 'login',
            label: 'Логин',
            value: 'ivanivanov',
            disabled: false,
            error: 'Логин может содержать от 3 до 20 символов без пробелов и спецсимволов',
            withLabelAnimation: true,
            validateCallback: () => {
                this.inputValidateHandler(inputLogin);
            }
        });

        const inputFirstName = new FormInput({
            inputType: 'text',
            name: 'first_name',
            label: 'Имя',
            value: 'Иван',
            disabled: false,
            error: 'Может состоять только из букв, - и _. Начинается только с заглавной буквы',
            withLabelAnimation: true,
            validateCallback: () => {
                this.inputValidateHandler(inputFirstName);
            }
        });

        const inputSecondName = new FormInput({
            inputType: 'text',
            name: 'second_name',
            label: 'Фамилия',
            value: 'Иванов',
            disabled: false,
            error: 'Может состоять только из букв, - и _. Начинается только с заглавной буквы',
            withLabelAnimation: true,
            validateCallback: () => {
                this.inputValidateHandler(inputSecondName);
            }
        });

        const inputPhone = new FormInput({
            inputType: 'phone',
            name: 'phone',
            label: 'Телефон',
            value: '+79099673030',
            disabled: false,
            error: 'Может содержать + и от 10 до 15 цифр',
            withLabelAnimation: true,
            validateCallback: () => {
                this.inputValidateHandler(inputPhone);
            }
        });

        const inputPassword = new FormInput({
            inputType: 'password',
            name: 'password',
            label: 'Пароль',
            value: '',
            disabled: false,
            error: 'Должен содержать от 8 до 40 символов, цифру и заглавную букву',
            withLabelAnimation: true,
            validateCallback: () => {
                this.inputValidateHandler(inputPassword);
            }
        });

        const inputRequirePassword = new FormInput({
            inputType: 'password',
            name: 'requirePassword',
            label: 'Повторите новый пароль',
            disabled: false,
            error: 'Пароли должны совпадать',
            withLabelAnimation: true,
        });

        const buttonSubmit = new Button({
            classNames: ['button'],
            clickCallback: () => {},
            btnType: 'submit',
            text: 'Зарегистрироваться',
        });

        this.renderElement('.form', inputEmail);
        this.renderElement('.form', inputLogin);
        this.renderElement('.form', inputFirstName);
        this.renderElement('.form', inputSecondName);
        this.renderElement('.form', inputPhone);
        this.renderElement('.form', inputPassword);
        this.renderElement('.form', inputRequirePassword);
        this.renderElement('.form', buttonSubmit);

        this.element.querySelector('.form')?.insertAdjacentHTML('beforeend', registationFormLinkTemplate());
    }

    public render() {
        return registrationTemplate();
    }

    public componentDidMount(): void {
        this.element.classList.add('registration-page');

        this.createForm();
    }

    public componentDidUpdate(): boolean {
        return true;
    }
}

function mapStateToProps(state: Indexed) {
    return state;
}

export default connect(RegistrationPage, mapStateToProps);
