import './profile-form.scss';

import Block from '../../../../utils/Block';

import { Form } from '../../../../modules/form/form';
import { FormInput } from '../../../../components/form-input/form-input';
import { Button } from '../../../../components/button/button';

import { ProfileFormType } from './profile-form.types';

import { inputValidation } from '../../../../utils/validation';

class ProfileForm extends Block {
    private formData: Form;
    private formPassword: Form;
    private isPasswordForm: boolean;

    constructor(formProps: ProfileFormType) {
        super({ props: {
            classNames: formProps.classNames,
            method: formProps.method,
            data: formProps.data,
            callback: formProps.submitCallback,
        } })

        this.isPasswordForm = false;
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

    private createDataElements(): void {
        const inputEmail = new FormInput({
            inputType: 'email',
            name: 'email',
            label: 'Почта',
            value: this.props.data?.email || '',
            disabled: true,
            error: 'Почта должна соответствовать формату xxx@xxx.xx',
            validateCallback: () => {
                this.inputValidateHandler(inputEmail);
            }
        });

        const inputLogin = new FormInput({
            inputType: 'text',
            name: 'login',
            label: 'Логин',
            value: this.props.data?.login || '',
            disabled: true,
            error: 'Логин может содержать от 3 до 20 символов без пробелов и спецсимволов',
            validateCallback: () => {
                this.inputValidateHandler(inputLogin);
            }
        });

        const inputFirstName = new FormInput({
            inputType: 'text',
            name: 'first_name',
            label: 'Имя',
            value: this.props.data?.first_name || '',
            disabled: true,
            error: 'Может состоять только из букв, - и _. Начинается только с заглавной буквы',
            validateCallback: () => {
                this.inputValidateHandler(inputFirstName);
            }
        });

        const inputSecondName = new FormInput({
            inputType: 'text',
            name: 'second_name',
            label: 'Фамилия',
            value: this.props.data?.second_name || '',
            disabled: true,
            error: 'Может состоять только из букв, - и _. Начинается только с заглавной буквы',
            validateCallback: () => {
                this.inputValidateHandler(inputSecondName);
            }
        });

        const inputDisplayName = new FormInput({
            inputType: 'text',
            name: 'display_name',
            label: 'Имя в чате',
            value: this.props.data?.display_name || '',
            disabled: true
        });

        const inputPhone = new FormInput({
            inputType: 'phone',
            name: 'phone',
            label: 'Телефон',
            value: this.props.data?.phone || '',
            disabled: true,
            error: 'Может содержать + и от 10 до 15 цифр',
            validateCallback: () => {
                this.inputValidateHandler(inputPhone);
            }
        });

        const buttonSubmit = new Button({
            classNames: ['button'],
            clickCallback: () => {},
            btnType: 'submit',
            text: 'Сохранить'
        });

        this.renderElement('form', inputEmail);
        this.renderElement('form', inputLogin);
        this.renderElement('form', inputFirstName);
        this.renderElement('form', inputSecondName);
        this.renderElement('form', inputDisplayName);
        this.renderElement('form', inputPhone);
        this.renderElement('form', buttonSubmit);
    }

    private createPasswordElements(): void {
        const inputOldPassword = new FormInput({
            inputType: 'password',
            name: 'oldPassword',
            label: 'Старый пароль',
            disabled: true
        });

        const inputNewPassword = new FormInput({
            inputType: 'password',
            name: 'newPassword',
            label: 'Новый пароль',
            disabled: true,
            error: 'Должен содержать от 8 до 40 символов, цифру и заглавную букву',
            validateCallback: () => {
                this.inputValidateHandler(inputNewPassword);
            }
        });

        const inputRequirePassword = new FormInput({
            inputType: 'password',
            name: 'requirePassword',
            label: 'Повторите новый пароль',
            disabled: true,
            error: 'Пароли должны совпадать'
        });

        const buttonSubmit = new Button({
            classNames: ['button'],
            clickCallback: () => {},
            btnType: 'submit',
            text: 'Сохранить',
        });

        this.renderElement('form', inputOldPassword);
        this.renderElement('form', inputNewPassword);
        this.renderElement('form', inputRequirePassword);
        this.renderElement('form', buttonSubmit);
    }

    checkPasswords(elements: HTMLElement[]): boolean {
        const passwords: Record<string, {value: string, el: HTMLElement}> = {};

        elements.forEach((item: HTMLElement) => {
            const input = item.querySelector('input');

            if (input && ['newPassword', 'requirePassword'].includes(input.name)) {
                passwords[input.name] = {
                    value: input.value,
                    el: item
                };
            }
        })

        if (passwords.newPassword?.value === passwords.requirePassword?.value) {
            passwords.requirePassword?.el?.classList.remove('is-error') ;
            return true;
        } else {
            passwords.requirePassword?.el?.classList.add('is-error') ;
            return false;
        }
    }

    componentDidMount(): void {
        this.element.classList.add(...this.props.classNames);

        if (this.props.classNames.some((item: string) => {
            return item.includes('password')
        })) {
            this.isPasswordForm = true
        }

        if (this.isPasswordForm) {
            this.formPassword = new Form({
                method: this.props.method,
                submitCallback: this.props.callback,
                additionalValidation: (elements): boolean => {
                    return this.checkPasswords(elements);
                }
            });
            this.renderElement('', this.formPassword);
            this.createPasswordElements();
        } else {
            this.formData = new Form({
                method: this.props.method,
                submitCallback: this.props.callback
            });
            this.renderElement('', this.formData);
            this.createDataElements();
        }
    }

    componentDidUpdate(): boolean {
        this.element.classList.add(...this.props.classNames);

        if (this.isPasswordForm) {
            this.formPassword.setProps({ method: this.props.method, submitCallback: () => {
                console.log(this.element);
                this.props.callback();
            }})
        } else {
            this.formData.setProps({ method: this.props.method, submitCallback: this.props.callback });
        }

        setTimeout(() => {
            if (this.isPasswordForm) {
                this.renderElement('', this.formPassword as Form);
                this.createPasswordElements;
            } else {
                this.renderElement('', this.formData as Form);
                this.createDataElements();
            }
        }, 100);

        return true;
    }
}

export { ProfileForm };
