export const template = `
main.index-page.root
    ul.index-page__list
        li
            a(href='/pages/auth/auth.html') Авторизация
        li
            a(href='../registration/registration.pug') Регистрация
        li
            a(href='../profile/profile.pug') Профиль
        li
            a(href='../chats/chats.pug') Список чатов
        li
            a(href='../404/404.pug') 404
        li
            a(href='../500/500.pug') 500
`;
