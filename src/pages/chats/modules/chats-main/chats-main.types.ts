export enum MessageTypeEnum {
    MESSAGE = 'message'
}

export type ChatsItemType = {
    content: string,
    id: number,
    time: string,
    type: MessageTypeEnum
    user_id: number
};
