import Block from '../../utils/Block';

import '../../modules/error-page/error-page';

const page404Template = require('./page-404-template.pug');

export class Error404Page extends Block {
    constructor() {
        super({});
    }

    public render() {
        return page404Template();
    }

    public componentDidMount(): void {
        this.element.classList.add('error-page');
    }
}
