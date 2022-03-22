type webSocketType = {
    userId: number,
    chatId: number,
    token: string
};

const endpoint = 'wss://ya-praktikum.tech/ws/chats';

export class WebSocketComponent {
    private readonly userId: number
    private readonly chatId: number
    private readonly token: string
    private socket: WebSocket
    private pingInterval: ReturnType<typeof setInterval>

    constructor({ userId, chatId, token }: webSocketType) {
        this.userId = userId
        this.chatId = chatId
        this.token = token

        this.socket
        this.pingInterval

        this.sendPing = this.sendPing.bind(this)
    }

    public getSocket() {
        return this.socket;
    }

    public sendMessage(content: any, type: string): void {
        if (this.socket) {
            this.socket.send(JSON.stringify({
                content,
                type,
            }));
        }
    }

    public getOldMessages(offset = 0) {
        if (this.socket) {
            this.socket.send(JSON.stringify({
                content: `${offset}`,
                type: 'get old',
            }));
        }
    }

    public closeConnection() {
        if (this.socket) {
            this.socket.close();

            clearInterval(this.pingInterval);
        }
    }

    public sendPing() {
        if (this.socket) {
            this.socket.send(JSON.stringify({
                type: 'ping',
            }));
        }
    }

    public init() {
        this.socket = new WebSocket(`${endpoint}/${this.userId}/${this.chatId}/${this.token}`);

        this.socket.addEventListener('open', () => {
            console.log('Соединение установлено');

            this.pingInterval = setInterval(this.sendPing, 10000);
        });

        this.socket.addEventListener('close', (evt: CloseEvent) => {
            if (evt.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }

            console.log(`Код: ${evt.code} | Причина: ${evt.reason}`);
        });

        this.socket.addEventListener('error', (evt: ErrorEvent) => {
            console.log('Ошибка', evt.message);
        });
    }
}
