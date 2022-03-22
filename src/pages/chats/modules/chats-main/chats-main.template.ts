export const chatsMainTemplate = () => `
.chats__messages
.chats__bottom`;

export const chatsBottomTemplate = () => `
.chats__bottom-wrap`;

export const messageTemplate = (text: string, time: string, date = '', isYours = false) => `
${date ? `.chats__messages-date ${date}` : ''}
.chats__message.chats__message--${isYours ? 'yours' : 'theirs'}
    p ${text}
    .chats__message-time ${time}
`;
