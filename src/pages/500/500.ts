import * as pug from 'pug';

import Block from '../../utils/Block';

import { template } from './500.template';

import '../../modules/error-page/error-page';

class Error500Page extends Block {
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
        root.appendChild(block.getContent());
    }

    return root;
};

const page = new Error500Page();

render('.root', page);
