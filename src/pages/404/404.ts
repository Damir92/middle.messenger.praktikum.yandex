import * as pug from 'pug';

import Block from '../../utils/Block';

import { template } from './404.template';

import '../../modules/error-page/error-page';

class Error404Page extends Block {
    constructor() {
        super('div');
    }

    public render() {
        return pug.render(template);
    }

    public componentDidMount(): void {
        this.element.classList.add('error-page');
    }
}

const render = (query: string, block: Block) => {
    const root = document.querySelector(query);

    if (root) {
        root.appendChild(block.getElement());
    }

    return root;
};

const page = new Error404Page();

render('.root', page);
