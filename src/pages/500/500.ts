import * as pug from 'pug';

import Block from '../../utils/Block';

import { template } from './500.template';

import '../../modules/error-page/error-page';

export class Error500Page extends Block {
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
