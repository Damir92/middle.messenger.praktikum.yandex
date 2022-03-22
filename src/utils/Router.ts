import Block from './Block';
import { render } from './render';

function isEqual<T>(lhs: T, rhs: T): boolean {
    return lhs === rhs;
}

export class Route {
    private pathname: string;
    private blockClass: new () => Block;
    private props: any;
    private block: Block | null;

    constructor(pathname: string, view: new () => Block, props?: any) {
        this.pathname = pathname;
        this.blockClass = view;
        this.props = props;

        this.block = null;
    }

    public navigate(pathname: string) {
        if (this.match(pathname)) {
            this.pathname = pathname;
            this.render();
        }
    }

    public leave(): void {
        if (this.block) {
            this.block.hide();
        }
    }

    public match(pathname: string): boolean {
        return isEqual(pathname, this.pathname)
    }

    public render() {
        if (!this.block) {
            this.block = new this.blockClass();
            render(this.props.rootQuery, this.block);
            return;
        }

        this.block.show();
    }
}

export class Router {
    static instance: Router | undefined;
    readonly routes: Route[];
    private readonly history: History;
    private currentRoute: Route | null;
    private rootQuery: string;

    constructor(rootQuery: string) {
        if (Router.instance) {
            return Router.instance
        }

        this.routes = [];
        this.history = window.history;
        this.currentRoute = null;
        this.rootQuery = rootQuery;

        Router.instance = this;
    }

    public use<T extends Block>(pathname: string, block: new () => T) {
        const route = new Route(pathname, block, { rootQuery: this.rootQuery });
        this.routes.push(route);

        return this;
    }

    public start() {
        window.onpopstate = ((evt: any) => {
            console.log(evt)
            this.onRoute(evt.currentTarget.location.pathname);
        });

        this.onRoute(window.location.pathname);
    }

    private onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (!route) {
            return;
        }

        if (this.currentRoute && this.currentRoute !== route) {
            this.currentRoute.leave();
        }

        this.currentRoute = route;
        route.render();
    }

    go(pathname: string): void {
        this.history.pushState({}, '', pathname);
        this.onRoute(pathname);
    }

    back(): void {
        this.history.back();
    }

    forward(): void {
        this.history.forward();
    }

    getRoute(pathname: string): Route | undefined {
        return this.routes.find(route => route.match(pathname));
    }
}
