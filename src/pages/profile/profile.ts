import './profile.scss';

import * as pug from 'pug';

import Block from '../../utils/Block';

import { Button } from '../../components/button/button';
import { ProfileForm } from './modules/profile-form/profile-form';

import { profilePage } from './profile.template';

import { profileClassNamesEnum } from './profile.types';

class Profile extends Block {
    private isBackBtnActive: boolean

    constructor() {
        super('div');

        this.isBackBtnActive = false;

        this.editBtnClickHandler = this.editBtnClickHandler.bind(this);
        this.editPasswordClickHandler = this.editPasswordClickHandler.bind(this);
        this.backBtnClickHandler = this.backBtnClickHandler.bind(this);
    }

    public render() {
        return pug.render(profilePage);
    }

    private activateForm(className: string): void {
        const inputs: HTMLInputElement[] = [].slice.call(this.element.querySelectorAll('.profile-form input'));
        this.element.classList.add(className);
        inputs.forEach(item => item.removeAttribute('disabled'));
        inputs[0]?.focus();
    }

    public editBtnClickHandler(): void {
        this.activateForm(profileClassNamesEnum.EDIT);
        this.isBackBtnActive = true
    }

    private editPasswordClickHandler(): void {
        this.activateForm(profileClassNamesEnum.EDIT_PASSWORD)
        this.isBackBtnActive = true
    }

    private backBtnClickHandler(): void {
        if (this.isBackBtnActive) {
            const inputs: HTMLInputElement[] = [].slice.call(this.element.querySelectorAll('form input'));
            this.element.classList.remove(profileClassNamesEnum.EDIT, profileClassNamesEnum.EDIT_PASSWORD);
            inputs.forEach(item => item.setAttribute('disabled', 'true'));
            this.isBackBtnActive = false;
        } else {
            window.history.back();
        }
    }

    private createButtons(): void {
        const buttonBack = new Button({
            classNames: ['profile__btn-back'],
            clickCallback: () => {
                this.backBtnClickHandler()
            },
            btnType: 'button',
            text: '',
        });

        const buttonChangeData = new Button({
            classNames: ['profile__btn'],
            clickCallback: () => {
                this.editBtnClickHandler()
            },
            btnType: 'button',
            text: 'Изменить данные',
        });

        const buttonChangePassword = new Button({
            classNames: ['profile__btn'],
            clickCallback: () => {
                this.editPasswordClickHandler()
            },
            btnType: 'button',
            text: 'Изменить пароль',
        });

        const buttonChangeCheckout = new Button({
            classNames: ['profile__btn', 'profile__btn--red'],
            clickCallback: () => {},
            btnType: 'button',
            text: 'Выйти',
        });

        this.renderElement('.profile__btn-container', buttonBack);
        this.renderElement('.profile__btns', buttonChangeData);
        this.renderElement('.profile__btns', buttonChangePassword);
        this.renderElement('.profile__btns', buttonChangeCheckout);
    }

    public componentDidMount() {
        this.element.classList.add('profile');

        const profileDataForm = new ProfileForm({
            classNames: ['profile-form', 'profile-form--data'],
            method: 'POST',
            submitCallback: () => {
                this.backBtnClickHandler()
            }
        });
        this.renderElement('.profile__form-container', profileDataForm);

        const profilePasswordForm = new ProfileForm({
            classNames: ['profile-form', 'profile-form--password'],
            method: 'POST',
            submitCallback: () => {
                this.backBtnClickHandler()
            }
        });
        this.renderElement('.profile__form-container', profilePasswordForm);

        this.createButtons();
    }

    public componentDidUpdate() {
        return true;
    }
}

const render = (query: string, block: Block) => {
    const root = document.querySelector(query);

    if (root) {
        root.appendChild(block.getElement());
    }

    return root;
};

const page = new Profile();

render('.root', page);
