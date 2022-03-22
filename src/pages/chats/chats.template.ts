export const chatsTemplate = `
.chats__info
    .chats__options
        a.chats__profile-link(href="/settings") Профиль
        .chats__form-search
            form(method="POST" action="/")
                .form-input
                    label
                        span Поиск
                        input(type="text" name="search" autocomplete="off")
        .chats__form-create
            form(method="POST" action="/")
                .form-input
                    label
                        span Создать чат
                        input(type="text" name="title" autocomplete="off")
    .chats__list
.chats__body`;
