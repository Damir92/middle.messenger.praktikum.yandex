import Block from '../../utils/Block';

import '../../modules/error-page/error-page';

const page500Template = require('./page-500-template.pug');

export class Error500Page extends Block {
    constructor() {
        super();
    }

    public render() {
        return page500Template();
    }

    public componentDidMount(): void {
        this.element.classList.add('error-page');
    }
}
