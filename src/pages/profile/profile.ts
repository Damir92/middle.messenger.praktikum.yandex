import './profile.scss';

import * as pug from 'pug';

import Block from '../../utils/Block';
import store, { Indexed } from '../../services/store';
import { connect } from '../../utils/connect';

import { AuthController } from '../../services/auth';

import { Button } from '../../components/button/button';
import { ProfileForm } from './modules/profile-form/profile-form';

import { profilePage } from './profile.template';

import { changePasswordType, profileClassNamesEnum, profileType } from './profile.types';
import { UserController } from '../../services/user';
import { Avatar } from './modules/avatar/avatar';

class ProfilePage extends Block {
    private isBackBtnActive: boolean

    constructor() {
        super('div');

        this.isBackBtnActive = false;

        this.editBtnClickHandler = this.editBtnClickHandler.bind(this);
        this.editPasswordClickHandler = this.editPasswordClickHandler.bind(this);
        this.backBtnClickHandler = this.backBtnClickHandler.bind(this);
        this.checkoutBtnClickHandler = this.checkoutBtnClickHandler.bind(this);
        this.changeProfileHandler = this.changeProfileHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
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

    public checkoutBtnClickHandler(): void {
        new AuthController().signOut()
    }

    public async changeProfileHandler(data: profileType) {
        const user = await new UserController().changeProfile(data);
        store.set('user', user)
    }

    public async changePasswordHandler(data: changePasswordType) {
        await new UserController().changePassword(data);
    }

    private renderName() {
        const h1: HTMLHeadingElement | null = this.element.querySelector('h1');
        if (h1) {
            h1.innerText = store.getState().user.display_name;
        }
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
            clickCallback: () => {
                this.checkoutBtnClickHandler();
            },
            btnType: 'button',
            text: 'Выйти',
        });

        this.renderElement('.profile__btn-container', buttonBack);
        this.renderElement('.profile__btns', buttonChangeData);
        this.renderElement('.profile__btns', buttonChangePassword);
        this.renderElement('.profile__btns', buttonChangeCheckout);
    }

    public async componentDidMount() {
        this.element.classList.add('profile');

        const avatar = new Avatar();
        this.renderElement('.profile__photo', avatar);

        this.renderName();

        const profileDataForm = new ProfileForm({
            classNames: ['profile-form', 'profile-form--data'],
            method: 'PUT',
            data: store.getState().user,
            submitCallback: (data: profileType) => {
                this.changeProfileHandler(data)
                this.backBtnClickHandler()
            }
        });
        this.renderElement('.profile__form-container', profileDataForm);

        const profilePasswordForm = new ProfileForm({
            classNames: ['profile-form', 'profile-form--password'],
            method: 'PUT',
            data: store.getState().user,
            submitCallback: (data: changePasswordType) => {
                this.changePasswordHandler(data)
                this.backBtnClickHandler()
            }
        });
        this.renderElement('.profile__form-container', profilePasswordForm);

        this.createButtons();
    }

    public componentDidUpdate() {
        const avatar = new Avatar();
        this.renderElement('.profile__photo', avatar);

        this.renderName();

        const profileDataForm = new ProfileForm({
            classNames: ['profile-form', 'profile-form--data'],
            method: 'PUT',
            data: store.getState().user,
            submitCallback: (data: profileType) => {
                this.changeProfileHandler(data)
                this.backBtnClickHandler()
            }
        });
        this.renderElement('.profile__form-container', profileDataForm);

        const profilePasswordForm = new ProfileForm({
            classNames: ['profile-form', 'profile-form--password'],
            method: 'POST',
            data: store.getState().user,
            submitCallback: () => {
                this.backBtnClickHandler()
            }
        });
        this.renderElement('.profile__form-container', profilePasswordForm);

        this.createButtons();
        return true;
    }
}


function mapStateToProps(state: Indexed) {
    return {
        user: state.user,
    };
}

export default connect(ProfilePage, mapStateToProps);
