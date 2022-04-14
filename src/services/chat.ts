import { ChatAPI } from '../api/chat';

export class ChatsController {
    public async getChats() {
        let result: any = null;

        await new ChatAPI().getChats()
            .then((data: any) => {
                result = JSON.parse(data.response);
            })

        console.log(result);

        return result;
    }

    public async createChat(payload: { title: string }) {
        let result: any = null;

        await new ChatAPI().createChat(payload)
            .then((data: any) => {
                console.log(data)
                result = JSON.parse(data.response);
            })

        return result;
    }

    public async addUserToChat(payload: { users: number[], chatId: number }) {
        let result: any = null;

        await new ChatAPI().addUserToChat(payload)
            .then((data: any) => {
                result = data.response;
            })
            .catch(err => {
                console.log(err);
            })

        return result;
    }

    public async deleteUserFromChat(payload: { users: number[], chatId: number }) {
        let result: any = null;

        await new ChatAPI().deleteUserFromChat(payload)
            .then((data: any) => {
                result = data.response;
            })
            .catch(err => {
                console.log(err);
            })

        return result;
    }

    public async getChatToken(payload: number) {
        let result: any = null;

        await new ChatAPI().getChatToken(payload)
            .then((data: any) => {
                result = JSON.parse(data.response);
            })
            .catch(err => {
                console.log(err);
            })

        return result;
    }

    public async getNewMessagesCount(payload: number) {
        let result: any = null;

        await new ChatAPI().getNewMessagesCount(payload)
            .then((data: any) => {
                result = JSON.parse(data.response);
            })
            .catch(err => {
                console.log(err);
            })

        return result;
    }
}
