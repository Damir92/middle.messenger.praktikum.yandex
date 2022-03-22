import HTTP from '../utils/HTTPTransport';

const chatAPIInstance = new HTTP('https://ya-praktikum.tech/api/v2/chats');

export class ChatAPI {
    public getChats() {
        return chatAPIInstance.get('');
    }

    public createChat(payload: { title: string }) {
        console.log('payload', payload)
        return chatAPIInstance.post('', { data: payload, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    }

    public addUserToChat(payload: { users: number[], chatId: number }) {
        return chatAPIInstance.put('/users', { data: payload, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    }

    public deleteUserFromChat(payload: { users: number[], chatId: number }) {
        return chatAPIInstance.delete('/users', { data: payload, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
    }

    public getChatToken(payload: number) {
        return chatAPIInstance.post(`/token/${payload}`);
    }

    public getNewMessagesCount(payload: number) {
        return chatAPIInstance.get(`/new/${payload}`);
    }
}
