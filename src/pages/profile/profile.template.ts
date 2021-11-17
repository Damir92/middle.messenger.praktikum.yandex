export const profilePage = `
.profile__btn-container
.profile__form-wrap
    .profile__photo
        form(action='POST')
            label.profile__photo-label
                | Поменять аватар
                input(type='file' name='avatar')
    h1.profile__name Иван

    .profile__form-container

    .profile__btns`;
