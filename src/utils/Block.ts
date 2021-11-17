import EventBus from './EventBus';

type metaType = {
    tagName: string
    props: {}
}

class Block {
    private readonly meta: metaType
    private node: HTMLElement
    protected readonly props: any
    protected readonly eventBus: () => EventBus

    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    constructor(tagName: string = "div", props = {}) {
        const eventBus = new EventBus();
        this.meta = {
            tagName,
            props
        };
        this.node

        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _createResources() {
        const { tagName } = this.meta;
        this.node = this._createDocumentElement(tagName);
    }

    public init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        this.componentDidMount();
    }

    // Может переопределять пользователь, необязательно трогать
    public componentDidMount() {}

    private _componentDidUpdate() {
        const response = this.componentDidUpdate();
        if (!response) {
            return;
        }
        this._render();
    }

    // Может переопределять пользователь, необязательно трогать
    public componentDidUpdate() {
        return true;
    }

    public setProps(nextProps: any) {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    }

    get element() {
        return this.node;
    }

    private _render() {
        const block = this.render();
        this.node.innerHTML = block;
    }

    // Может переопределять пользователь, необязательно трогать
    public render() {
        return '';
    }

    public renderElement (query: string, block: Block) {
        let root = null;
        if (query) {
            root = this.getContent().querySelector(query);
        } else {
            root = this.element;
        }

        if (root) {
            root.appendChild(block.getContent());
        }
    }

    public getContent() {
        return this.element;
    }

    private _makePropsProxy(props: any) {
        const self = this;

        return new Proxy(props, {
            get(target, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target, prop, value) {
                target[prop] = value;

                self.eventBus().emit(Block.EVENTS.FLOW_CDU, {...target});
                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            }
        })
    }

    private _createDocumentElement(tagName: string) {
        return document.createElement(tagName);
    }

    public show() {
        this.getContent().style.display = 'block';
    }

    public hide() {
        this.getContent().style.display = 'none';
    }
}

export default Block;
