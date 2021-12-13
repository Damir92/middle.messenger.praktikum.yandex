import { chatsItemType } from './chats-item.types';

export const chatsItemTemplate = ({ name, date, isYours, message, unreadable }: chatsItemType) => `
.chats__item-photo
.chats__item-data
    .chats__item-info
        .chats__item-name ${name}
        .chats__item-date ${date}
    .chats__item-content
        .chats__item-message
            if ${isYours}
                span.chats__item-yours Вы:
            | ${message}
        if ${unreadable}
            .chats__item-count ${unreadable}`;
