import { chatDate } from '../../../../utils/date';

import { chatsItemType } from './chats-item.types';

export const chatsItemTemplate = ({ title, date, isYours, last_message, unread_count }: chatsItemType) => `
.chats__item-photo
.chats__item-data
    .chats__item-info
        .chats__item-name ${title}
        .chats__item-date ${date ? chatDate(date) : ''}
    .chats__item-content
        if ${!!last_message}
            .chats__item-message
                if ${isYours}
                    span.chats__item-yours Вы:
                | ${last_message?.content}
            if ${unread_count}
                .chats__item-count ${unread_count}`;
