import { profileType } from '../../../profile/profile.types';

export type chatsItemType = {
    id: number,
    title: string,
    date: string,
    isYours: boolean,
    last_message: {
        content: string,
        id: number,
        time: string,
        user: profileType
    } | null,
    unread_count?: number
};
