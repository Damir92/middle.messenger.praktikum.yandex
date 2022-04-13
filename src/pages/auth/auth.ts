import './auth.scss'

import Block from '../../utils/Block';
import { Form } from '../../modules/form/form'
import { FormInput } from '../../components/form-input/form-input';
import { Button } from '../../components/button/button';

import { inputValidation } from '../../utils/validation';

import { AuthController } from '../../services/auth';

import { authType } from './auth.types';

const formLinkTemplate = require('./auth-form-link-template.pug');
const authPageTemplate = require('./auth-page-template.pug');
const authFormTemplate = require('./auth-form-template.pug');
export class AuthPage extends Block {
    private form: Form

    constructor() {
        super({});

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

    public sendForm(form: authType): void {
        console.log('form', form)
        const { login, password } = form;
        console.log(AuthController)
        new AuthController().signIn({ login, password })
    }

    private createForm(): void {
        this.form = new Form({
            method: 'POST',
            template: authFormTemplate,
            submitCallback: this.sendForm
        });

        this.renderElement('.auth-page__form-wrap', this.form);

        const inputLogin = new FormInput({
            inputType: 'text',
            name: 'login',
            label: 'Логин',
            value: '',
            disabled: false,
            error: 'Логин может быть от 3 до 20 символов, включать цифры и символ -',
            withLabelAnimation: true,
            validateCallback: () => {
                this.inputValidateHandler(inputLogin);
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

        const buttonSubmit = new Button({
            classNames: ['button'],
            clickCallback: () => {},
            btnType: 'submit',
            text: 'Войти',
        });

        this.renderElement('.form', inputLogin);
        this.renderElement('.form', inputPassword);
        this.renderElement('.form', buttonSubmit);

        this.element.querySelector('.form')?.insertAdjacentHTML('beforeend', formLinkTemplate());
    }

    public render() {
        return authPageTemplate();
    }

    public componentDidMount(): void {
        this.element.classList.add('auth-page');

        this.createForm();

        // setTimeout(() => {
        //     new AuthController().signOut()
        // }, 3000)
    }

    public componentDidUpdate(): boolean {
        return true;
    }
}
