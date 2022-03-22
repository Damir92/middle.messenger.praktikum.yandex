class EventBus {
    private readonly listeners: Record<string, Function[]>

    constructor() {
        this.listeners = {};
    }

    public on(event: string, callback: () => void): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    public off(event: string, callback: () => {}): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(
            listener => listener !== callback
        );
    }

    public emit(event: string, ...args: Function[]): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
            // return;
        }

        this.listeners[event].forEach(function(listener) {
            listener(...args);
        });
    }
}

export default EventBus;
