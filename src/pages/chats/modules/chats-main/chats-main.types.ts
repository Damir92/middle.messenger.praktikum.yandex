export enum messageTypeEnum {
    MESSAGE = 'message'
}

export type chatsItemType = {
    content: string,
    id: number,
    time: string,
    type: messageTypeEnum
    user_id: number
};
