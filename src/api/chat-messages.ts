import HTTP from '../utils/HTTPTransport';

const chatMessagesAPIInstance = new HTTP('api/v1/messages');

export class ChatMessagesAPI {
    request({ id }: Record<string, string>) {
        return chatMessagesAPIInstance.get(`/${id}`);
    }
}
