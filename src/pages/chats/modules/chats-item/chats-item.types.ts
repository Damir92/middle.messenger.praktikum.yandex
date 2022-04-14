import { ProfileType } from '../../../profile/profile.types';

export type ChatsItemType = {
    id: number,
    title: string,
    date: string,
    isYours: boolean,
    last_message: {
        content: string,
        id: number,
        time: string,
        user: ProfileType
    } | null,
    unread_count?: number
};
